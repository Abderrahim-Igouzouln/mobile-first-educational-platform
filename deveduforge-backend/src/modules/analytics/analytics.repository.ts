import { prisma } from '../../config/database/prisma';

export class AnalyticsRepository {
  async trackEvent(userId: string | undefined, event: string, properties: unknown) {
    return prisma.userEvent.create({
      data: { userId, event, properties: properties as any },
    });
  }

  async getOverview(from: Date, to: Date) {
    const [totalUsers, newUsers, lessonsCompleted, certificatesIssued, revenue] =
      await Promise.all([
        prisma.user.count(),
        prisma.user.count({ where: { createdAt: { gte: from, lte: to } } }),
        prisma.userProgress.count({
          where: { status: 'completed', completedAt: { gte: from, lte: to } },
        }),
        prisma.certificate.count({ where: { issuedAt: { gte: from, lte: to } } }),
        prisma.payment.aggregate({
          _sum: { amountMad: true },
          where: { status: 'succeeded', createdAt: { gte: from, lte: to } },
        }),
      ]);

    return {
      totalUsers,
      newUsers,
      lessonsCompleted,
      certificatesIssued,
      revenue: revenue._sum?.amountMad ?? 0,
    };
  }

  getDailyStats(days: number) {
    return prisma.dailyStats.findMany({
      orderBy: { date: 'desc' },
      take: days,
    });
  }

  getCourseAnalytics() {
    return prisma.courseAnalytics.groupBy({
      by: ['courseId'],
      _sum: { value: true },
      where: { metric: 'enrollments' },
    });
  }

  getUserEvents(days: number) {
    return prisma.userEvent.groupBy({
      by: ['event'],
      _count: true,
      where: {
        createdAt: { gte: new Date(Date.now() - days * 24 * 60 * 60 * 1000) },
      },
    });
  }
}
