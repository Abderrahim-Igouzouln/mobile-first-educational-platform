import { ReviewRepository } from './review.repository';

const repo = new ReviewRepository();

export class ReviewService {
  async getReviews(courseId: string) {
    const reviews = await repo.findReviewsByCourse(courseId);
    const { average, count } = await repo.getAverageRating(courseId);
    return {
      reviews: reviews.map((r: { id: string; user: { firstName: string; lastName: string }; rating: number; comment: string; createdAt: Date }) => ({
        id: r.id,
        author: `${r.user.firstName} ${r.user.lastName}`,
        rating: r.rating,
        comment: r.comment,
        date: r.createdAt.toISOString(),
      })),
      average,
      count,
    };
  }

  async submitReview(userId: string, courseId: string, rating: number, comment: string) {
    const review = await repo.upsertReview(userId, courseId, rating, comment);
    return review;
  }
}
