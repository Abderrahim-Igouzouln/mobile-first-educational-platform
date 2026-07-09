import { prisma } from '../../config/database';

export class ProgressRepository {
  async findCompletedByUser(userId: string) {
    return prisma.userProgress.findMany({ where: { userId, status: 'completed' }, include: { lesson: { select: { id: true, title: true } } }, orderBy: { completedAt: 'desc' } });
  }

  async findStreak(userId: string) {
    return prisma.streak.findUnique({ where: { userId } });
  }

  async findAchievements(userId: string) {
    return prisma.achievement.findMany({ where: { userId }, orderBy: { unlockedAt: 'desc' } });
  }

  async findRecentActivity(userId: string, limit = 20) {
    return prisma.userActivity.findMany({ where: { userId }, orderBy: { createdAt: 'desc' }, take: limit });
  }

  async findLast30DaysActivity(userId: string) {
    const date = new Date();
    date.setDate(date.getDate() - 30);
    return prisma.userActivity.findMany({ where: { userId, createdAt: { gte: date } } });
  }

  async findActivityTimeSeries(userId: string, days: number) {
    const from = new Date();
    from.setDate(from.getDate() - days);
    const activities = await prisma.userActivity.findMany({
      where: { userId, createdAt: { gte: from } },
      select: { createdAt: true },
      orderBy: { createdAt: 'asc' },
    });
    const buckets: Record<string, number> = {};
    for (let i = 0; i < days; i++) {
      const d = new Date(from);
      d.setDate(d.getDate() + i);
      buckets[d.toISOString().split('T')[0]] = 0;
    }
    for (const a of activities) {
      const day = a.createdAt.toISOString().split('T')[0];
      if (buckets[day] !== undefined) buckets[day]++;
    }
    return Object.entries(buckets).map(([date, count]) => ({ date, count }));
  }

  async findDomainBreakdown(userId: string) {
    const completed = await prisma.userProgress.findMany({
      where: { userId, status: 'completed' },
      include: {
        lesson: {
          include: {
            course: {
              include: {
                technology: {
                  include: { domain: true },
                },
              },
            },
          },
        },
      },
    });
    const breakdown: Record<string, { completed: number; total: number }> = {};
    for (const p of completed) {
      const domain = p.lesson.course.technology.domain.name;
      if (!breakdown[domain]) breakdown[domain] = { completed: 0, total: 0 };
      breakdown[domain].completed++;
    }
    const allLessons = await prisma.lesson.findMany({
      include: {
        course: {
          include: {
            technology: { include: { domain: true } },
          },
        },
      },
    });
    for (const l of allLessons) {
      const domain = l.course.technology.domain.name;
      if (!breakdown[domain]) breakdown[domain] = { completed: 0, total: 0 };
      breakdown[domain].total++;
    }
    return Object.entries(breakdown).map(([name, stats]) => ({
      domain: name,
      ...stats,
      percent: stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0,
    }));
  }

  async findPlatformComparison(userId: string) {
    const [userProgress, platformStats] = await Promise.all([
      prisma.userProgress.findMany({
        where: { userId, status: 'completed' },
        select: { lessonId: true },
      }),
      prisma.userProgress.groupBy({
        by: ['status'],
        _count: true,
        where: { status: 'completed' },
      }),
    ]);
    const totalUsers = await prisma.user.count();
    const totalCompleted = platformStats[0]?._count ?? 0;
    const avgPerUser = totalUsers > 0 ? Math.round((totalCompleted / totalUsers) * 10) / 10 : 0;
    return {
      userCompleted: userProgress.length,
      platformAvg: avgPerUser,
      userPercentile: 0,
    };
  }
}
