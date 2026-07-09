export interface PostResponse {
  id: string;
  title: string;
  content: string;
  authorName: string;
  commentCount: number;
  likeCount: number;
  createdAt: string;
}

export interface CommentResponse {
  id: string;
  content: string;
  authorName: string;
  createdAt: string;
}

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  firstName: string;
  score: number;
}
