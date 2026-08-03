import { prisma } from '../../config/database/prisma';

export class UserRepository {
  async findById(id: string) {
    return prisma.user.findUnique({ where: { id } });
  }

  async findByIdWithStats(id: string) {
    return prisma.user.findUnique({
      where: { id },
      include: {
        streaks: true,
        _count: {
          select: {
            userProgress: true,
            certificates: true,
            projectSubmissions: true,
            achievements: true,
          },
        },
      },
    });
  }

  async findByIdWithRelations(id: string) {
    return prisma.user.findUnique({
      where: { id },
      include: {
        userProgress: {
          include: { lesson: { select: { id: true, title: true } } },
        },
        certificates: {
          include: { technology: { select: { name: true } } },
        },
        payments: true,
        projectSubmissions: {
          include: { project: { select: { title: true } } },
        },
      },
    });
  }

  async update(id: string, data: any) {
    return prisma.user.update({ where: { id }, data });
  }

  async countCompletedLessons(userId: string) {
    return prisma.userProgress.count({
      where: { userId, status: 'completed' },
    });
  }

  async countInProgressLessons(userId: string) {
    return prisma.userProgress.count({
      where: { userId, status: 'in_progress' },
    });
  }
}
