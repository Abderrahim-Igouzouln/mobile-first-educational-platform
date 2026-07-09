import { AnalyticsRepository } from './analytics.repository';

export class AnalyticsService {
  private repo = new AnalyticsRepository();

  async trackEvent(userId: string | undefined, event: string, properties: unknown) {
    return this.repo.trackEvent(userId, event, properties);
  }

  async getDashboardOverview() {
    const now = new Date();
    const from30d = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    const [overview30d, dailyStats, courseStats, userStats] = await Promise.all([
      this.repo.getOverview(from30d, now),
      this.repo.getDailyStats(30),
      this.repo.getCourseAnalytics(),
      this.repo.getUserEvents(7),
    ]);

    return {
      overview: overview30d,
      dailyStats,
      courseStats,
      userStats,
    };
  }
}
