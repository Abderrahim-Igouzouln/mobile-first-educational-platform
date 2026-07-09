import { ProgressRepository } from './progress.repository';

const repo = new ProgressRepository();

export class ProgressService {
  async getDashboard(userId: string) {
    const [completed, streak, achievements, recentActivity] = await Promise.all([
      repo.findCompletedByUser(userId),
      repo.findStreak(userId),
      repo.findAchievements(userId),
      repo.findRecentActivity(userId),
    ]);

    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    const activityCalendar: Record<string, number> = {};
    const last30Days = await repo.findLast30DaysActivity(userId);
    for (const activity of last30Days) {
      const day = activity.createdAt.toISOString().split('T')[0];
      activityCalendar[day] = (activityCalendar[day] || 0) + 1;
    }

    return {
      stats: {
        totalCompleted: completed.length,
        currentStreak: streak?.currentStreak || 0,
        longestStreak: streak?.longestStreak || 0,
        achievements: achievements.length,
      },
      lastCompletedLessons: completed.slice(0, 5).map((c) => ({ lessonId: c.lessonId, title: c.lesson.title, completedAt: c.completedAt })),
      achievements: achievements.map((a) => ({ code: a.code, title: a.title, description: a.description, unlockedAt: a.unlockedAt })),
      recentActivity: recentActivity.map((a) => ({ type: a.type, metadata: a.metadata, createdAt: a.createdAt })),
      activityCalendar,
    };
  }

  async getAchievements(userId: string) {
    const achievements = await repo.findAchievements(userId);
    return achievements.map((a) => ({ code: a.code, title: a.title, description: a.description, unlockedAt: a.unlockedAt }));
  }

  async getActivityCalendar(userId: string) {
    const last30Days = await repo.findLast30DaysActivity(userId);
    const calendar: Record<string, number> = {};
    for (const activity of last30Days) {
      const day = activity.createdAt.toISOString().split('T')[0];
      calendar[day] = (calendar[day] || 0) + 1;
    }
    return { calendar };
  }

  async getStreak(userId: string) {
    const streak = await repo.findStreak(userId);
    if (!streak) return { currentStreak: 0, longestStreak: 0, lastActivityDate: null };
    return { currentStreak: streak.currentStreak, longestStreak: streak.longestStreak, lastActivityDate: streak.lastActivityDate };
  }

  async getTimeSeries(userId: string, days: number) {
    return repo.findActivityTimeSeries(userId, days);
  }

  async getDomainBreakdown(userId: string) {
    return repo.findDomainBreakdown(userId);
  }

  async getPlatformComparison(userId: string) {
    return repo.findPlatformComparison(userId);
  }
}
