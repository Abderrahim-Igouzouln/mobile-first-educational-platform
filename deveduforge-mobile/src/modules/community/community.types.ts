export interface UserBrief {
  id: string;
  name: string;
  avatar?: string;
}

export interface TrendingTopic {
  id: string;
  label: string;
  count: number;
}

export interface Discussion {
  id: string;
  author: UserBrief;
  title: string;
  content: string;
  tags: string[];
  category: string;
  upvotes: number;
  downvotes: number;
  commentCount: number;
  isBookmarked: boolean;
  createdAt: string;
}

export interface Comment {
  id: string;
  author: UserBrief;
  content: string;
  likes: number;
  replies: Comment[];
  parentId?: string;
  createdAt: string;
}

export interface StudyGroup {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  activeUsers: number;
  category: string;
  isJoined: boolean;
  image?: string;
}

export interface Mentor {
  id: string;
  name: string;
  title: string;
  avatar?: string;
  expertise: string[];
  rating: number;
  sessionCount: number;
  pricePerSession: number;
  bio: string;
}

export type SortOption = 'Populaires' | 'Récents';
