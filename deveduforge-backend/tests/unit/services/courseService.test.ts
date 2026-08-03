const mockPrisma = {
  bookmark: { findMany: jest.fn() },
  userActivity: { create: jest.fn() },
};

jest.mock('../../../src/config/database/prisma', () => ({
  prisma: mockPrisma,
}));

const mockRepo = {
  findDomains: jest.fn(),
  findDomainBySlug: jest.fn(),
  findUserSubscription: jest.fn(),
  findCourseById: jest.fn(),
  findUserProgressForCourse: jest.fn(),
  findBookmark: jest.fn(),
  findTechnologyBySlug: jest.fn(),
  findCoursesByTechnology: jest.fn(),
  findLessonById: jest.fn(),
  findUserProgress: jest.fn(),
  upsertProgress: jest.fn(),
  updateStreak: jest.fn(),
  findUserBookmarks: jest.fn(),
  findContinueLearning: jest.fn(),
  createCourse: jest.fn(),
  findCourseByAuthor: jest.fn(),
  updateCourse: jest.fn(),
  createLesson: jest.fn(),
  reorderLessons: jest.fn(),
  deleteBookmark: jest.fn(),
  createBookmark: jest.fn(),
};

jest.mock('../../../src/modules/course/course.repository', () => ({
  CourseRepository: jest.fn(() => mockRepo),
}));

import { CourseService } from '../../../src/modules/course/course.service';
import { NotFoundError } from '../../../src/utils/response/errors.util';

describe('CourseService', () => {
  let service: CourseService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new CourseService();
  });

  describe('getDomains', () => {
    it('returns mapped domains with technology count', async () => {
      mockRepo.findDomains.mockResolvedValue([
        { id: 'd1', slug: 'frontend', name: 'Frontend', description: 'Desc', icon: 'code', colorTheme: '#f60', order: 1, isActive: true, createdAt: new Date(), updatedAt: new Date(), _count: { technologies: 3 } },
      ]);

      const result = await service.getDomains();
      expect(result).toHaveLength(1);
      expect(result[0]).toMatchObject({ slug: 'frontend', name: 'Frontend', technologyCount: 3 });
    });
  });

  describe('getTechnologies', () => {
    it('throws NotFoundError when domain does not exist', async () => {
      mockRepo.findDomainBySlug.mockResolvedValue(null);
      await expect(service.getTechnologies('unknown')).rejects.toThrow(NotFoundError);
    });

    it('returns domain with technologies for a valid slug', async () => {
      mockRepo.findDomainBySlug.mockResolvedValue({
        id: 'd1', name: 'Frontend', slug: 'frontend', icon: 'code', colorTheme: '#f60',
        technologies: [
          { id: 't1', slug: 'react', name: 'React', icon: 'atom', description: 'Lib UI', order: 1, isPremiumOnly: false },
        ],
      } as any);
      mockRepo.findUserSubscription.mockResolvedValue(null);

      const result = await service.getTechnologies('frontend', 'user-1');
      expect(result.domain.name).toBe('Frontend');
      expect(result.technologies).toHaveLength(1);
      expect(result.technologies[0].isLocked).toBe(false);
    });
  });

  describe('getCourseDetail', () => {
    it('throws NotFoundError when course does not exist', async () => {
      mockRepo.findCourseById.mockResolvedValue(null);
      await expect(service.getCourseDetail('fake-id', 'user-1')).rejects.toThrow(NotFoundError);
    });

    it('returns course detail with lesson progression', async () => {
      mockRepo.findCourseById.mockResolvedValue({
        id: 'c1', title: 'React', description: 'Learn React', level: 'beginner', estimatedDurationMin: 180,
        isPublished: true,
        author: { firstName: 'John', lastName: 'Doe' },
        lessons: [
          { id: 'l1', title: 'Intro', order: 1, durationMin: 30, videoUrl: null, isPublished: true, _count: { exercises: 1 }, contentMarkdown: '# Intro' },
          { id: 'l2', title: 'Advanced', order: 2, durationMin: 45, videoUrl: null, isPublished: true, _count: { exercises: 2 }, contentMarkdown: '# Advanced' },
        ],
      } as any);
      mockRepo.findUserProgressForCourse.mockResolvedValue([
        { id: 'p1', createdAt: new Date(), updatedAt: new Date(), status: 'completed', userId: 'user-1', lessonId: 'l1', completedAt: new Date(), timeSpentSec: 120 },
      ]);
      mockPrisma.bookmark.findMany.mockResolvedValue([]);
      mockRepo.findBookmark.mockResolvedValue(null);

      const result = await service.getCourseDetail('c1', 'user-1');
      expect(result.title).toBe('React');
      expect(result.lessons).toHaveLength(2);
      expect(result.lessons[0].status).toBe('completed');
      expect(result.lessons[0].isLocked).toBe(false);
      expect(result.lessons[1].isLocked).toBe(false);
    });
  });
});
