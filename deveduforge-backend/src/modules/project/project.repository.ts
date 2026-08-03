import { prisma } from '../../config/database/prisma';

export class ProjectRepository {
  async findProjectsByCourse(courseId: string) {
    return prisma.project.findMany({ where: { courseId } });
  }

  async findProjectById(id: string) {
    return prisma.project.findUnique({ where: { id }, include: { course: { select: { title: true } } } });
  }

  async findSubmissionsByUser(userId: string) {
    return prisma.projectSubmission.findMany({
      where: { userId },
      include: { project: { select: { title: true } }, reviews: { include: { reviewer: { select: { firstName: true, lastName: true } } } }, comments: { include: { author: { select: { firstName: true, lastName: true } } } } },
      orderBy: { submittedAt: 'desc' },
    });
  }

  async findSubmissionById(id: string) {
    return prisma.projectSubmission.findUnique({
      where: { id },
      include: { project: { select: { id: true, title: true, courseId: true } }, reviews: { include: { reviewer: { select: { firstName: true, lastName: true } } } }, comments: { include: { author: { select: { firstName: true, lastName: true } } } } },
    });
  }

  async createSubmission(data: any) {
    return prisma.projectSubmission.create({ data });
  }

  async addReview(data: any) {
    return prisma.projectReview.create({ data });
  }

  async updateSubmissionStatus(id: string, status: string) {
    return prisma.projectSubmission.update({ where: { id }, data: { status: status as any } });
  }

  async addComment(data: any) {
    return prisma.projectComment.create({ data });
  }
}
