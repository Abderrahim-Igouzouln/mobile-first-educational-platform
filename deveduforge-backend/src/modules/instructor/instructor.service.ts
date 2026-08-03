import { prisma } from '../../config/database/prisma';

export class InstructorService {
  async getStats(userId: string) {
    const courses = await prisma.course.findMany({
      where: { authorId: userId },
      select: { id: true },
    });
    const courseIds = courses.map(c => c.id);

    const [totalCourses, totalStudents, pendingReviews, completions] =
      await Promise.all([
        Promise.resolve(courseIds.length),
        courseIds.length === 0
          ? Promise.resolve(0)
          : prisma.userProgress
              .groupBy({ by: ['userId'], where: { lesson: { courseId: { in: courseIds } } } })
              .then(r => r.length),
        courseIds.length === 0
          ? Promise.resolve(0)
          : prisma.projectSubmission.count({
              where: {
                project: { courseId: { in: courseIds } },
                reviews: { none: {} },
              },
            }),
        courseIds.length === 0
          ? Promise.resolve(0)
          : prisma.userProgress.count({
              where: {
                status: 'completed',
                lesson: { courseId: { in: courseIds } },
              },
            }),
      ]);

    const avgRatingResult = courseIds.length === 0
      ? null
      : await prisma.projectReview.aggregate({
          _avg: { score: true },
          where: { submission: { project: { courseId: { in: courseIds } } } },
        });
    const avgRating = avgRatingResult ? Math.round((avgRatingResult._avg.score ?? 0) * 10) / 10 : 0;

    return {
      totalCourses,
      totalStudents,
      avgRating,
      pendingReviews,
      completions,
    };
  }

  async getCourses(userId: string) {
    const courses = await prisma.course.findMany({
      where: { authorId: userId },
      include: {
        _count: { select: { lessons: true } },
      },
      orderBy: { createdAt: 'desc' },
    });

    const courseIds = courses.map(c => c.id);
    const studentCounts = courseIds.length === 0
      ? []
      : await Promise.all(
          courseIds.map(courseId =>
            prisma.userProgress
              .groupBy({
                by: ['userId'],
                where: { lesson: { courseId } },
              })
              .then(r => r.length)
          )
        );

    return courses.map((course, i) => ({
      id: course.id,
      title: course.title,
      description: course.description,
      level: course.level,
      isPublished: course.isPublished,
      lessonCount: course._count.lessons,
      studentCount: studentCounts[i] ?? 0,
      createdAt: course.createdAt,
    }));
  }
}
