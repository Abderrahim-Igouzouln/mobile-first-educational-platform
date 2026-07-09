import { prisma } from '../../config/database';

export class CourseRepository {
  async findDomains() {
    return prisma.domain.findMany({ where: { isActive: true }, orderBy: { order: 'asc' }, include: { _count: { select: { technologies: true } } } });
  }

  async findDomainBySlug(slug: string) {
    return prisma.domain.findUnique({ where: { slug }, include: { technologies: { where: { isActive: true }, orderBy: { order: 'asc' } } } });
  }

  async findTechnologyBySlug(slug: string) {
    return prisma.technology.findUnique({ where: { slug }, include: { domain: true, courses: { where: { isPublished: true } } } });
  }

  async findTechnologyById(id: string) {
    return prisma.technology.findUnique({ where: { id } });
  }

  async findCoursesByTechnology(technologyId: string) {
    return prisma.course.findMany({
      where: { technologyId },
      include: {
        _count: { select: { lessons: true } },
        lessons: { select: { id: true }, where: { isPublished: true } },
        author: { select: { firstName: true, lastName: true } },
      },
      orderBy: { createdAt: 'asc' },
    });
  }

  async findCourseById(id: string) {
    return prisma.course.findUnique({ where: { id }, include: { lessons: { where: { isPublished: true }, orderBy: { order: 'asc' } }, author: { select: { firstName: true, lastName: true } }, technology: true } });
  }

  async findLessonById(id: string) {
    return prisma.lesson.findUnique({ where: { id }, include: { course: { select: { id: true, title: true, technologyId: true } } } });
  }

  async findUserProgress(userId: string, lessonId: string) {
    return prisma.userProgress.findUnique({ where: { userId_lessonId: { userId, lessonId } } });
  }

  async upsertProgress(userId: string, lessonId: string, data: any) {
    return prisma.userProgress.upsert({ where: { userId_lessonId: { userId, lessonId } }, update: data, create: { userId, lessonId, ...data } });
  }

  async findUserProgressForCourse(userId: string, courseId: string) {
    return prisma.userProgress.findMany({ where: { userId, lesson: { courseId } } });
  }

  async findBookmark(userId: string, lessonId: string) {
    return prisma.bookmark.findUnique({ where: { userId_lessonId: { userId, lessonId } } });
  }

  async createBookmark(userId: string, lessonId: string) {
    return prisma.bookmark.create({ data: { userId, lessonId } });
  }

  async deleteBookmark(id: string) {
    return prisma.bookmark.delete({ where: { id } });
  }

  async findUserBookmarks(userId: string) {
    return prisma.bookmark.findMany({ where: { userId }, include: { lesson: { include: { course: { select: { title: true } } } } }, orderBy: { createdAt: 'desc' } });
  }

  async findContinueLearning(userId: string) {
    return prisma.userProgress.findFirst({ where: { userId, status: 'in_progress' }, include: { lesson: { include: { course: { select: { id: true, title: true } } } } }, orderBy: { updatedAt: 'desc' } });
  }

  async findUserSubscription(userId: string) {
    return prisma.userSubscription.findFirst({ where: { userId, status: { in: ['active', 'past_due'] } } });
  }

  async findCourseByAuthor(courseId: string, authorId: string) {
    return prisma.course.findFirst({ where: { id: courseId, authorId } });
  }

  async createCourse(data: any) {
    return prisma.course.create({ data });
  }

  async updateCourse(id: string, data: any) {
    return prisma.course.update({ where: { id }, data });
  }

  async createLesson(data: any) {
    return prisma.lesson.create({ data });
  }

  async reorderLessons(lessonIds: string[]) {
    await prisma.$transaction(lessonIds.map((id, index) => prisma.lesson.update({ where: { id }, data: { order: index + 1 } })));
  }

  async updateStreak(userId: string) {
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    const yesterday = new Date(today);
    yesterday.setUTCDate(yesterday.getUTCDate() - 1);

    const streak = await prisma.streak.findUnique({ where: { userId } });
    if (!streak) {
      return prisma.streak.create({ data: { userId, currentStreak: 1, longestStreak: 1, lastActivityDate: today } });
    }

    const lastActivity = streak.lastActivityDate ? new Date(streak.lastActivityDate) : null;
    if (lastActivity && lastActivity.toDateString() === today.toDateString()) return streak;

    let newStreak = 1;
    if (lastActivity && lastActivity.toDateString() === yesterday.toDateString()) {
      newStreak = streak.currentStreak + 1;
    }

    return prisma.streak.update({ where: { userId }, data: { currentStreak: newStreak, longestStreak: Math.max(streak.longestStreak, newStreak), lastActivityDate: today } });
  }
}
