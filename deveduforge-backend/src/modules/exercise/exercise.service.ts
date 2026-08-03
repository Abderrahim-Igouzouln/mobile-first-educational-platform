import { ExerciseRepository } from './exercise.repository';
import { NotFoundError } from '../../utils/response/errors.util';
import { CertificationService } from '../certification/certification.service';

const repo = new ExerciseRepository();
const certificationService = new CertificationService();

export class ExerciseService {
  async getExercise(lessonId: string) {
    const exercise = await repo.findExerciseByLesson(lessonId);
    if (!exercise) throw new NotFoundError('Aucun exercice trouvé pour cette leçon.');

    return {
      id: exercise.id,
      title: exercise.title,
      passingScorePercent: exercise.passingScorePercent,
      questions: exercise.questions.map((q) => ({
        id: q.id,
        type: q.type,
        prompt: q.prompt,
        order: q.order,
        points: q.points,
        options: q.answerOptions.map((o) => ({ id: o.id, label: o.label, order: o.order })),
      })),
    };
  }

  async submitAnswer(userId: string, exerciseId: string, questionId: string, selectedOptionId?: string, textAnswer?: string) {
    const exercise = await repo.findExerciseById(exerciseId);
    if (!exercise) throw new NotFoundError('Exercice introuvable.');

    const question = exercise.questions.find((q) => q.id === questionId);
    if (!question) throw new NotFoundError('Question introuvable.');

    let isCorrect = false;

    if (selectedOptionId) {
      const correctOption = question.answerOptions.find((o) => o.isCorrect);
      isCorrect = correctOption?.id === selectedOptionId;
    } else if (textAnswer) {
      const correctOption = question.answerOptions.find((o) => o.isCorrect);
      isCorrect = correctOption?.label.toLowerCase().trim() === textAnswer.toLowerCase().trim();
    }

    await repo.saveUserAnswer(userId, questionId, selectedOptionId || null, textAnswer || null, isCorrect);

    return { questionId, isCorrect, pointsEarned: isCorrect ? question.points : 0 };
  }

  async submitExercise(userId: string, exerciseId: string, answers: Array<{ questionId: string; selectedOptionId?: string; textAnswer?: string }>) {
    const exercise = await repo.findExerciseById(exerciseId);
    if (!exercise) throw new NotFoundError('Exercice introuvable.');

    let totalPoints = 0;
    let earnedPoints = 0;
    const results: Array<{ questionId: string; isCorrect: boolean; pointsEarned: number }> = [];

    for (const answer of answers) {
      const question = exercise.questions.find((q) => q.id === answer.questionId);
      if (!question) continue;

      totalPoints += question.points;
      let isCorrect = false;

      if (answer.selectedOptionId) {
        const correctOption = question.answerOptions.find((o) => o.isCorrect);
        isCorrect = correctOption?.id === answer.selectedOptionId;
      } else if (answer.textAnswer) {
        const correctOption = question.answerOptions.find((o) => o.isCorrect);
        isCorrect = correctOption?.label.toLowerCase().trim() === answer.textAnswer.toLowerCase().trim();
      }

      const pointsEarned = isCorrect ? question.points : 0;
      earnedPoints += pointsEarned;
      results.push({ questionId: question.id, isCorrect, pointsEarned });

      await repo.saveUserAnswer(userId, question.id, answer.selectedOptionId || null, answer.textAnswer || null, isCorrect);
    }

    const scorePercent = totalPoints > 0 ? Math.round((earnedPoints / totalPoints) * 100) : 0;
    const passed = scorePercent >= exercise.passingScorePercent;

    const lastAttempt = await repo.getLatestAttempt(userId, exerciseId);
    const attemptNumber = (lastAttempt?.attemptNumber || 0) + 1;

    await repo.createExerciseResult(userId, exerciseId, scorePercent, passed, attemptNumber);

    await certificationService.checkAndUnlockCertificate(userId, exercise.lesson.courseId).catch(() => {});

    return { exerciseId, passed, scorePercent, attemptNumber, questionsResults: results };
  }
}
