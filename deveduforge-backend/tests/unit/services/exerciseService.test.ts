const mockRepo = {
  findExerciseByLesson: jest.fn(),
  findExerciseById: jest.fn(),
  saveUserAnswer: jest.fn(),
  getLatestAttempt: jest.fn(),
  createExerciseResult: jest.fn(),
};

jest.mock('../../../src/modules/exercise/exercise.repository', () => ({
  ExerciseRepository: jest.fn(() => mockRepo),
}));

import { ExerciseService } from '../../../src/modules/exercise/exercise.service';
import { NotFoundError } from '../../../src/utils/errors.util';

describe('ExerciseService', () => {
  let service: ExerciseService;

  const mockExercise = {
    id: 'ex1',
    title: 'Quiz React',
    passingScorePercent: 70,
    questions: [
      {
        id: 'q1',
        type: 'mcq',
        prompt: 'What is JSX?',
        explanation: 'JSX is a syntax extension for JavaScript.',
        order: 1,
        points: 2,
        answerOptions: [
          { id: 'a1', label: 'A syntax extension', isCorrect: true, order: 0 },
          { id: 'a2', label: 'A database', isCorrect: false, order: 1 },
        ],
      },
    ],
  } as any;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new ExerciseService();
  });

  describe('getExercise', () => {
    it('throws NotFoundError when no exercise exists for lesson', async () => {
      mockRepo.findExerciseByLesson.mockResolvedValue(null);
      await expect(service.getExercise('lesson-1')).rejects.toThrow(NotFoundError);
    });

    it('returns exercise without exposing correct answers', async () => {
      mockRepo.findExerciseByLesson.mockResolvedValue(mockExercise);
      const result = await service.getExercise('lesson-1');
      expect(result.title).toBe('Quiz React');
      expect(result.questions[0].options).toHaveLength(2);
      expect((result.questions[0].options[0] as any).isCorrect).toBeUndefined();
    });
  });

  describe('submitAnswer', () => {
    it('returns correct when selected option matches', async () => {
      mockRepo.findExerciseById.mockResolvedValue(mockExercise);
      mockRepo.saveUserAnswer.mockResolvedValue({} as any);

      const result = await service.submitAnswer('u1', 'ex1', 'q1', 'a1');
      expect(result.isCorrect).toBe(true);
      expect(result.pointsEarned).toBe(2);
    });

    it('returns incorrect when wrong option selected', async () => {
      mockRepo.findExerciseById.mockResolvedValue(mockExercise);
      mockRepo.saveUserAnswer.mockResolvedValue({} as any);

      const result = await service.submitAnswer('u1', 'ex1', 'q1', 'a2');
      expect(result.isCorrect).toBe(false);
      expect(result.pointsEarned).toBe(0);
    });
  });

  describe('submitExercise', () => {
    it('scores and returns results', async () => {
      mockRepo.findExerciseById.mockResolvedValue(mockExercise);
      mockRepo.saveUserAnswer.mockResolvedValue({} as any);
      mockRepo.getLatestAttempt.mockResolvedValue(null);
      mockRepo.createExerciseResult.mockResolvedValue({} as any);

      const answers = [{ questionId: 'q1', selectedOptionId: 'a1' }];
      const result = await service.submitExercise('u1', 'ex1', answers);
      expect(result.passed).toBe(true);
      expect(result.scorePercent).toBe(100);
      expect(result.attemptNumber).toBe(1);
    });
  });
});
