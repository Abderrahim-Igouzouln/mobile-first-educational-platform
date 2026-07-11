const mockRepo = {
  findProjectsByCourse: jest.fn(),
  findProjectById: jest.fn(),
  findSubmissionsByUser: jest.fn(),
  findSubmissionById: jest.fn(),
  createSubmission: jest.fn(),
  addReview: jest.fn(),
  updateSubmissionStatus: jest.fn(),
  addComment: jest.fn(),
};

jest.mock('../../../src/modules/project/project.repository', () => ({
  ProjectRepository: jest.fn(() => mockRepo),
}));

import { ProjectService } from '../../../src/modules/project/project.service';
import { NotFoundError } from '../../../src/utils/errors.util';

describe('ProjectService', () => {
  let service: ProjectService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new ProjectService();
  });

  describe('getProjects', () => {
    it('returns projects for a course', async () => {
      mockRepo.findProjectsByCourse.mockResolvedValue([
        { id: 'p1', title: 'Todo App', instructions: '# Todo', evaluationCriteria: JSON.stringify(['Code', 'Tests']), createdAt: new Date(), updatedAt: new Date(), courseId: 'c1' },
      ]);
      const result = await service.getProjects('c1');
      expect(result).toHaveLength(1);
      expect(result[0].title).toBe('Todo App');
    });
  });

  describe('getProjectDetail', () => {
    it('throws NotFoundError for unknown project', async () => {
      mockRepo.findProjectById.mockResolvedValue(null);
      await expect(service.getProjectDetail('fake')).rejects.toThrow(NotFoundError);
    });

    it('returns project detail with course title', async () => {
      mockRepo.findProjectById.mockResolvedValue({
        id: 'p1', title: 'Kanban', instructions: '# Kanban', evaluationCriteria: '["Criteria"]',
        course: { title: 'React' },
      } as any);
      const result = await service.getProjectDetail('p1');
      expect(result.title).toBe('Kanban');
      expect(result.courseTitle).toBe('React');
    });
  });

  describe('submitProject', () => {
    it('throws NotFoundError when project does not exist', async () => {
      mockRepo.findProjectById.mockResolvedValue(null);
      await expect(service.submitProject('u1', 'fake', { repositoryUrl: 'https://github.com/user/repo' })).rejects.toThrow(NotFoundError);
    });

    it('creates a submission', async () => {
      mockRepo.findProjectById.mockResolvedValue({ id: 'p1' } as any);
      mockRepo.createSubmission.mockResolvedValue({
        id: 'sub1', userId: 'u1', projectId: 'p1', repositoryUrl: 'https://github.com/user/repo',
        fileUrl: null, status: 'pending', submittedAt: new Date(), project: { title: 'Kanban' },
        reviews: [], comments: [],
      } as any);

      const result = await service.submitProject('u1', 'p1', { repositoryUrl: 'https://github.com/user/repo' });
      expect(result.id).toBe('sub1');
      expect(mockRepo.createSubmission).toHaveBeenCalledWith({
        userId: 'u1', projectId: 'p1', repositoryUrl: 'https://github.com/user/repo', fileUrl: null,
      });
    });
  });

  describe('reviewSubmission', () => {
    it('approves submission with score >= 70', async () => {
      mockRepo.findSubmissionById.mockResolvedValue({ id: 'sub1', project: { title: 'Project' } } as any);
      mockRepo.addReview.mockResolvedValue({} as any);
      mockRepo.updateSubmissionStatus.mockResolvedValue({} as any);

      const result = await service.reviewSubmission('reviewer-1', 'sub1', 85, 'Good work!');
      expect(result.status).toBe('approved');
    });

    it('rejects submission with score < 70', async () => {
      mockRepo.findSubmissionById.mockResolvedValue({ id: 'sub1', project: { title: 'Project' } } as any);
      const result = await service.reviewSubmission('reviewer-1', 'sub1', 55, 'Needs improvement');
      expect(result.status).toBe('rejected');
    });
  });
});
