import { ProjectRepository } from './project.repository';
import { NotFoundError } from '../../utils/errors.util';

const repo = new ProjectRepository();

export class ProjectService {
  async getProjects(courseId: string) {
    return repo.findProjectsByCourse(courseId);
  }

  async getProjectDetail(projectId: string) {
    const project = await repo.findProjectById(projectId);
    if (!project) throw new NotFoundError('Projet introuvable.');
    return { id: project.id, title: project.title, instructions: project.instructions, evaluationCriteria: project.evaluationCriteria, courseTitle: project.course.title };
  }

  async submitProject(userId: string, projectId: string, data: { repositoryUrl?: string | null; fileUrl?: string | null }) {
    const project = await repo.findProjectById(projectId);
    if (!project) throw new NotFoundError('Projet introuvable.');
    return repo.createSubmission({ userId, projectId, repositoryUrl: data.repositoryUrl ?? null, fileUrl: data.fileUrl ?? null });
  }

  async getSubmissions(userId: string) {
    const submissions = await repo.findSubmissionsByUser(userId);
    return submissions.map((s) => ({
      id: s.id, projectTitle: s.project.title, repositoryUrl: s.repositoryUrl, fileUrl: s.fileUrl,
      status: s.status, submittedAt: s.submittedAt.toISOString(),
      review: s.reviews.length > 0 ? {
        score: s.reviews[0].score, feedback: s.reviews[0].feedback,
        reviewerName: `${s.reviews[0].reviewer.firstName} ${s.reviews[0].reviewer.lastName}`,
        reviewedAt: s.reviews[0].reviewedAt.toISOString(),
      } : null,
      comments: s.comments.map((c) => ({ id: c.id, content: c.content, authorName: `${c.author.firstName} ${c.author.lastName}`, createdAt: c.createdAt.toISOString() })),
    }));
  }

  async reviewSubmission(reviewerId: string, submissionId: string, score: number, feedback: string) {
    const submission = await repo.findSubmissionById(submissionId);
    if (!submission) throw new NotFoundError('Soumission introuvable.');

    await repo.addReview({ submissionId, reviewerId, score, feedback });
    await repo.updateSubmissionStatus(submissionId, score >= 70 ? 'approved' : 'rejected');

    return { submissionId, status: score >= 70 ? 'approved' : 'rejected' };
  }

  async addComment(authorId: string, submissionId: string, content: string) {
    const submission = await repo.findSubmissionById(submissionId);
    if (!submission) throw new NotFoundError('Soumission introuvable.');
    return repo.addComment({ submissionId, authorId, content });
  }
}
