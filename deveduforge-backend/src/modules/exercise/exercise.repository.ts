import { prisma } from '../../config/database/prisma';

export class ExerciseRepository {
  async findExerciseByLesson(lessonId: string) {
    return prisma.exercise.findFirst({
      where: { lessonId },
      include: {
        questions: {
          include: { answerOptions: { orderBy: { order: 'asc' } } },
          orderBy: { order: 'asc' },
        },
      },
    });
  }

  async findExerciseById(id: string) {
    return prisma.exercise.findUnique({
      where: { id },
      include: {
        questions: {
          include: { answerOptions: { orderBy: { order: 'asc' } } },
          orderBy: { order: 'asc' },
        },
        lesson: { select: { id: true, courseId: true } },
      },
    });
  }

  async saveUserAnswer(userId: string, questionId: string, selectedOptionId: string | null, textAnswer: string | null, isCorrect: boolean) {
    return prisma.userAnswer.create({
      data: { userId, questionId, selectedOptionId, textAnswer, isCorrect },
    });
  }

  async getLatestAttempt(userId: string, exerciseId: string) {
    return prisma.exerciseResult.findFirst({
      where: { userId, exerciseId },
      orderBy: { attemptNumber: 'desc' },
    });
  }

  async createExerciseResult(userId: string, exerciseId: string, scorePercent: number, passed: boolean, attemptNumber: number) {
    return prisma.exerciseResult.create({
      data: { userId, exerciseId, scorePercent, passed, attemptNumber },
    });
  }

  async getUserAnswersForExercise(userId: string, exerciseId: string) {
    const exercise = await prisma.exercise.findUnique({
      where: { id: exerciseId },
      include: { questions: { select: { id: true } } },
    });
    if (!exercise) return [];

    return prisma.userAnswer.findMany({
      where: { userId, questionId: { in: exercise.questions.map((q) => q.id) } },
    });
  }
}
