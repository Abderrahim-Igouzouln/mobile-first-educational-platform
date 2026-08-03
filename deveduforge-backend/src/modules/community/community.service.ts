import { CommunityRepository } from './community.repository';
import { NotFoundError, ForbiddenError } from '../../utils/response/errors.util';

const repo = new CommunityRepository();

export class CommunityService {
  async getPosts(page: number, limit: number) {
    const result = await repo.findPosts(page, limit);
    return {
      posts: result.posts.map((p) => ({
        id: p.id, title: p.title, content: p.content,
        author: { id: p.author.id, firstName: p.author.firstName, lastName: p.author.lastName, avatarUrl: p.author.avatarUrl },
        commentCount: p._count.comments, likeCount: p._count.likes, createdAt: p.createdAt,
      })),
      pagination: { page: result.page, limit: result.limit, total: result.total, totalPages: Math.ceil(result.total / limit) },
    };
  }

  async getPostsCursor(cursor?: string, limit = 20) {
    const result = await repo.findPostsCursor(cursor, limit);
    return {
      posts: result.items.map((p) => ({
        id: p.id, title: p.title, content: p.content,
        author: { id: p.author.id, firstName: p.author.firstName, lastName: p.author.lastName, avatarUrl: p.author.avatarUrl },
        commentCount: p._count.comments, likeCount: p._count.likes, createdAt: p.createdAt,
      })),
      nextCursor: result.nextCursor,
      hasNextPage: result.hasNextPage,
    };
  }

  async getPost(id: string) {
    const post = await repo.findPostById(id);
    if (!post) throw new NotFoundError('Publication introuvable.');
    return {
      id: post.id, title: post.title, content: post.content,
      author: post.author, commentCount: post._count.comments, likeCount: post._count.likes,
      comments: post.comments.map((c) => ({ id: c.id, content: c.content, author: c.author, createdAt: c.createdAt })),
      createdAt: post.createdAt, updatedAt: post.updatedAt,
    };
  }

  async createPost(authorId: string, title: string, content: string) {
    return repo.createPost({ authorId, title, content });
  }

  async updatePost(postId: string, userId: string, userRole: string, data: { title?: string; content?: string }) {
    const post = await repo.findPostById(postId);
    if (!post) throw new NotFoundError('Publication introuvable.');
    if (post.author.id !== userId && !['admin', 'superadmin'].includes(userRole)) {
      throw new ForbiddenError('Vous n\'êtes pas l\'auteur de cette publication.');
    }
    return repo.updatePost(postId, data);
  }

  async deletePost(postId: string, userId: string, userRole: string) {
    const post = await repo.findPostById(postId);
    if (!post) throw new NotFoundError('Publication introuvable.');
    if (post.author.id !== userId && !['admin', 'superadmin'].includes(userRole)) {
      throw new ForbiddenError('Vous n\'êtes pas l\'auteur de cette publication.');
    }
    await repo.deletePost(postId);
  }

  async toggleLike(postId: string, userId: string) {
    const post = await repo.findPostById(postId);
    if (!post) throw new NotFoundError('Publication introuvable.');
    return repo.toggleLike(postId, userId);
  }

  async addComment(postId: string, authorId: string, content: string) {
    const post = await repo.findPostById(postId);
    if (!post) throw new NotFoundError('Publication introuvable.');
    return repo.addComment({ postId, authorId, content });
  }

  async getLeaderboard(period: string) {
    const validPeriod = ['daily', 'weekly', 'monthly', 'all_time'].includes(period) ? period : 'weekly';
    return repo.findLeaderboard(validPeriod);
  }

  async reportPost(userId: string, postId: string, reason: string) {
    const post = await repo.findPostById(postId);
    if (!post) throw new NotFoundError('Publication introuvable.');
    await repo.reportPost(userId, postId, reason);
  }
}
