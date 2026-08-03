import { prisma } from '../../config/database/prisma';

export class ReviewRepository {
  async findReviewsByCourse(courseId: string) {
    return prisma.courseReview.findMany({
      where: { courseId },
      include: { user: { select: { firstName: true, lastName: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findUserReview(userId: string, courseId: string) {
    return prisma.courseReview.findUnique({
      where: { userId_courseId: { userId, courseId } },
    });
  }

  async upsertReview(userId: string, courseId: string, rating: number, comment: string) {
    return prisma.courseReview.upsert({
      where: { userId_courseId: { userId, courseId } },
      update: { rating, comment },
      create: { userId, courseId, rating, comment },
    });
  }

  async getAverageRating(courseId: string) {
    const result = await prisma.courseReview.aggregate({
      where: { courseId },
      _avg: { rating: true },
      _count: true,
    });
    return { average: result._avg.rating ?? 0, count: result._count };
  }
}
