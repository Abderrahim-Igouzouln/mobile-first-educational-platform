import { prisma } from '../../config/database';

export class CommunityRepository {
  async findPosts(page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    const [posts, total] = await Promise.all([
      prisma.post.findMany({
        skip, take: limit, orderBy: { createdAt: 'desc' },
        include: { author: { select: { id: true, firstName: true, lastName: true, avatarUrl: true } }, _count: { select: { comments: true, likes: true } } },
      }),
      prisma.post.count(),
    ]);
    return { posts, total, page, limit };
  }

  async findPostsCursor(cursor?: string, limit = 20) {
    const posts = await prisma.post.findMany({
      take: limit + 1,
      cursor: cursor ? { id: cursor } : undefined,
      skip: cursor ? 1 : 0,
      orderBy: { createdAt: 'desc' },
      include: {
        author: { select: { id: true, firstName: true, lastName: true, avatarUrl: true } },
        _count: { select: { comments: true, likes: true } },
      },
    });

    const hasNextPage = posts.length > limit;
    const items = hasNextPage ? posts.slice(0, -1) : posts;
    const nextCursor = hasNextPage ? items[items.length - 1].id : null;

    return { items, nextCursor, hasNextPage };
  }

  async findPostById(id: string) {
    return prisma.post.findUnique({
      where: { id },
      include: {
        author: { select: { id: true, firstName: true, lastName: true, avatarUrl: true, role: true } },
        comments: { include: { author: { select: { firstName: true, lastName: true, avatarUrl: true } } }, orderBy: { createdAt: 'asc' } },
        _count: { select: { likes: true, comments: true } },
      },
    });
  }

  async createPost(data: any) {
    return prisma.post.create({ data });
  }

  async updatePost(id: string, data: any) {
    return prisma.post.update({ where: { id }, data });
  }

  async deletePost(id: string) {
    return prisma.post.delete({ where: { id } });
  }

  async findLike(postId: string, userId: string) {
    return prisma.like.findUnique({ where: { postId_userId: { postId, userId } } });
  }

  async toggleLike(postId: string, userId: string) {
    const existing = await this.findLike(postId, userId);
    if (existing) {
      await prisma.like.delete({ where: { id: existing.id } });
      return { liked: false };
    }
    await prisma.like.create({ data: { postId, userId } });
    return { liked: true };
  }

  async addComment(data: any) {
    return prisma.comment.create({ data });
  }

  async findLeaderboard(period: string) {
    return prisma.leaderboard.findMany({ where: { period }, orderBy: { rank: 'asc' }, take: 50 });
  }

  async reportPost(userId: string, postId: string, reason: string) {
    return prisma.auditLog.create({ data: { actorId: userId, action: 'post.reported', targetType: 'Post', targetId: postId, metadata: { reason } } });
  }
}
