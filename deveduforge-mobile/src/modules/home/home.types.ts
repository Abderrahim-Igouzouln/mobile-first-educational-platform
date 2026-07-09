export interface Domain {
  id: string;
  name: string;
  techCount: number;
  isActive: boolean;
  gradient: [string, string];
  icon: string;
}

export interface ContinueLearning {
  id: string;
  technologyName: string;
  lessonTitle: string;
  progress: number;
  icon: string;
}

export interface StatItem {
  id: string;
  label: string;
  value: string;
  suffix?: string;
  isHighlighted?: boolean;
}

export interface ActivityItem {
  id: string;
  type: 'course' | 'exercise' | 'certification';
  title: string;
  description: string;
  timestamp: string;
  color: string;
}
