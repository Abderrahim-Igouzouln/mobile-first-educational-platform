import { prisma } from '../../config/database/prisma';
import { CourseRepository } from './course.repository';
import { NotFoundError, ForbiddenError } from '../../utils/response/errors.util';
import { Role } from '../../constants/roles';
import { CertificationService } from '../certification/certification.service';

const repo = new CourseRepository();
const certificationService = new CertificationService();

export class CourseService {
  async getDomains() {
    const domains = await repo.findDomains();
    return domains.map((d) => ({ id: d.id, slug: d.slug, name: d.name, description: d.description, icon: d.icon, colorTheme: d.colorTheme, order: d.order, technologyCount: d._count.technologies }));
  }

  async getTechnologies(slug: string, userId?: string) {
    const domain = await repo.findDomainBySlug(slug);
    if (!domain) throw new NotFoundError('Domaine introuvable.');

    let isSubscribed = false;
    if (userId) {
      const sub = await repo.findUserSubscription(userId);
      isSubscribed = !!sub;
    }

    return {
      domain: { id: domain.id, name: domain.name, slug: domain.slug, icon: domain.icon, colorTheme: domain.colorTheme },
      technologies: domain.technologies.map((t) => ({
        id: t.id, slug: t.slug, name: t.name, icon: t.icon, description: t.description, order: t.order, isPremiumOnly: t.isPremiumOnly, isLocked: t.isPremiumOnly && !isSubscribed,
      })),
    };
  }

  async getTechnologyDetail(slug: string) {
    const tech = await repo.findTechnologyBySlug(slug);
    if (!tech) throw new NotFoundError('Technologie introuvable.');
    return { id: tech.id, slug: tech.slug, name: tech.name, icon: tech.icon, description: tech.description, order: tech.order, isPremiumOnly: tech.isPremiumOnly, domain: tech.domain, courses: tech.courses.map((c) => ({ id: c.id, title: c.title, description: c.description, level: c.level, estimatedDurationMin: c.estimatedDurationMin })) };
  }

  async getCourses(slug: string, userId: string) {
    const tech = await repo.findTechnologyBySlug(slug);
    if (!tech) throw new NotFoundError('Technologie introuvable.');

    const courses = await repo.findCoursesByTechnology(tech.id);
    const courseIds = courses.map((c) => c.id);

    const allProgress = await prisma.userProgress.findMany({
      where: { userId, lesson: { courseId: { in: courseIds } } },
    });

    return courses.map((c) => {
      const courseLessonIds = c.lessons.map((l) => l.id);
      const completed = allProgress.filter((p) => courseLessonIds.includes(p.lessonId) && p.status === 'completed').length;
      const total = c._count.lessons;
      return { id: c.id, title: c.title, description: c.description, level: c.level, estimatedDurationMin: c.estimatedDurationMin, isPublished: c.isPublished, authorName: `${c.author.firstName} ${c.author.lastName}`, lessonCount: total, progressPercent: total > 0 ? Math.round((completed / total) * 100) : 0 };
    });
  }

  async getCourseDetail(courseId: string, userId: string) {
    const course = await repo.findCourseById(courseId);
    if (!course) throw new NotFoundError('Cours introuvable.');

    const progress = await repo.findUserProgressForCourse(userId, courseId);
    const progressMap = new Map(progress.map((p) => [p.lessonId, p.status]));

    const bookmarks = await prisma.bookmark.findMany({
      where: { userId, lessonId: { in: course.lessons.map((l) => l.id) } },
    });
    const bookmarkSet = new Set(bookmarks.map((b) => b.lessonId));

    let previousCompleted = true;
    const lessons = course.lessons.map((l) => {
      const status = progressMap.get(l.id) || 'not_started';
      const isLocked = !previousCompleted;
      if (status === 'completed') previousCompleted = true;
      else if (isLocked) previousCompleted = false;
      else previousCompleted = false;

      return {
        id: l.id,
        title: l.title,
        order: l.order,
        durationMin: l.durationMin,
        videoUrl: l.videoUrl,
        isPublished: l.isPublished,
        status,
        isLocked,
        contentMarkdown: isLocked ? undefined : l.contentMarkdown,
        exercisesCount: l._count.exercises,
        isBookmarked: bookmarkSet.has(l.id),
      };
    });

    return { id: course.id, title: course.title, description: course.description, level: course.level, estimatedDurationMin: course.estimatedDurationMin, isPublished: course.isPublished, authorName: `${course.author.firstName} ${course.author.lastName}`, lessons };
  }

  async getLesson(lessonId: string, userId: string) {
    const lesson = await repo.findLessonById(lessonId);
    if (!lesson) throw new NotFoundError('Leçon introuvable.');

    const progress = await repo.findUserProgress(userId, lessonId);

    return { id: lesson.id, title: lesson.title, contentMarkdown: lesson.contentMarkdown, order: lesson.order, durationMin: lesson.durationMin, videoUrl: lesson.videoUrl, isPublished: lesson.isPublished, status: progress?.status || 'not_started' };
  }

  async completeLesson(lessonId: string, userId: string, timeSpentSec = 0) {
    const lesson = await repo.findLessonById(lessonId);
    if (!lesson) throw new NotFoundError('Leçon introuvable.');

    await repo.upsertProgress(userId, lessonId, { status: 'completed', completedAt: new Date(), timeSpentSec });
    await repo.updateStreak(userId);

    await prisma.userActivity.create({ data: { userId, type: 'lesson.completed', metadata: { lessonId, courseId: lesson.courseId } } }).catch(() => {});

    await certificationService.checkAndUnlockCertificate(userId, lesson.courseId).catch(() => {});

    return { lessonId, status: 'completed' };
  }

  async toggleBookmark(lessonId: string, userId: string) {
    const lesson = await repo.findLessonById(lessonId);
    if (!lesson) throw new NotFoundError('Leçon introuvable.');

    const existing = await repo.findBookmark(userId, lessonId);
    if (existing) {
      await repo.deleteBookmark(existing.id);
      return { bookmarked: false };
    }
    await repo.createBookmark(userId, lessonId);
    return { bookmarked: true };
  }

  async getBookmarks(userId: string) {
    const bookmarks = await repo.findUserBookmarks(userId);
    return bookmarks.map((b) => ({ id: b.id, lessonId: b.lessonId, lessonTitle: b.lesson.title, courseTitle: b.lesson.course.title, createdAt: b.createdAt.toISOString() }));
  }

  async getContinueLearning(userId: string) {
    const progress = await repo.findContinueLearning(userId);
    if (!progress) return null;
    return { lessonId: progress.lessonId, lessonTitle: progress.lesson.title, courseId: progress.lesson.course.id, courseTitle: progress.lesson.course.title, status: progress.status, updatedAt: progress.updatedAt };
  }

  async createCourse(data: any, authorId: string) {
    return repo.createCourse({ ...data, authorId });
  }

  async updateCourse(courseId: string, data: any, userId: string, userRole: string) {
    if (userRole !== Role.ADMIN && userRole !== Role.SUPERADMIN) {
      const course = await repo.findCourseByAuthor(courseId, userId);
      if (!course) throw new ForbiddenError('Vous n\'êtes pas l\'auteur de ce cours.');
    }
    return repo.updateCourse(courseId, data);
  }

  async publishCourse(courseId: string, userId: string, userRole: string) {
    if (userRole !== Role.ADMIN && userRole !== Role.SUPERADMIN) {
      const course = await repo.findCourseByAuthor(courseId, userId);
      if (!course) throw new ForbiddenError('Vous n\'êtes pas l\'auteur de ce cours.');
    }
    return repo.updateCourse(courseId, { isPublished: true });
  }

  async addLesson(courseId: string, data: any, userId: string, userRole: string) {
    if (userRole !== Role.ADMIN && userRole !== Role.SUPERADMIN) {
      const course = await repo.findCourseByAuthor(courseId, userId);
      if (!course) throw new ForbiddenError('Vous n\'êtes pas l\'auteur de ce cours.');
    }
    return repo.createLesson({ ...data, courseId });
  }

  async reorderLessons(_courseId: string, lessonIds: string[]) {
    await repo.reorderLessons(lessonIds);
  }
}
