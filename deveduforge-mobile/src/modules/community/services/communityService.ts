import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '../../../lib/react-query/queryKeys';
import type { Discussion, StudyGroup, Mentor, TrendingTopic, Comment } from '../community.types';

const MOCK_TOPICS: TrendingTopic[] = [
  { id: '1', label: 'React Native', count: 89 },
  { id: '2', label: 'TypeScript', count: 64 },
  { id: '3', label: 'Node.js', count: 52 },
  { id: '4', label: 'Python', count: 47 },
  { id: '5', label: 'DevOps', count: 31 },
  { id: '6', label: 'UI/UX', count: 28 },
];

const MOCK_DISCUSSIONS: Discussion[] = [
  { id: '1', author: { id: 'a1', name: 'Sophie Martin' }, title: 'Meilleure approche pour gérer l\'état global dans une app React Native ?', content: 'Je débute avec React Native et je me demande quelle solution adopter pour la gestion d\'état...', tags: ['React Native', 'State Management'], category: 'Programmation', upvotes: 24, downvotes: 2, commentCount: 18, isBookmarked: false, createdAt: new Date(Date.now() - 3600000 * 2).toISOString() },
  { id: '2', author: { id: 'a2', name: 'Lucas Bernard' }, title: 'Comment optimiser les performances d\'une API Node.js ?', content: 'J\'ai une API qui commence à montrer des signes de lenteur...', tags: ['Node.js', 'Performance'], category: 'Backend', upvotes: 18, downvotes: 1, commentCount: 12, isBookmarked: true, createdAt: new Date(Date.now() - 3600000 * 5).toISOString() },
  { id: '3', author: { id: 'a3', name: 'Emma Petit' }, title: 'TypeScript strict mode : bonnes pratiques ?', content: 'Je passe mon projet en strict mode et je rencontre quelques difficultés...', tags: ['TypeScript'], category: 'Programmation', upvotes: 15, downvotes: 0, commentCount: 9, isBookmarked: false, createdAt: new Date(Date.now() - 86400000).toISOString() },
  { id: '4', author: { id: 'a4', name: 'Hugo Dubois' }, title: 'Déploiement continu avec GitHub Actions', content: 'Je cherche à mettre en place un pipeline CI/CD pour mon projet...', tags: ['DevOps', 'GitHub Actions'], category: 'DevOps', upvotes: 12, downvotes: 0, commentCount: 7, isBookmarked: false, createdAt: new Date(Date.now() - 86400000 * 2).toISOString() },
];

const MOCK_GROUPS: StudyGroup[] = [
  { id: 'g1', name: 'React Native France', description: 'Groupe d\'entraide pour les développeurs React Native francophones.', memberCount: 342, activeUsers: 18, category: 'Mobile', isJoined: true },
  { id: 'g2', name: 'Algorithmes & Data Structures', description: 'Préparation aux entretiens techniques et compétitions de code.', memberCount: 215, activeUsers: 12, category: 'Algorithmes', isJoined: false },
  { id: 'g3', name: 'DevOps & Cloud', description: 'Docker, Kubernetes, AWS, GCP et tout l\'écosystème cloud natif.', memberCount: 178, activeUsers: 9, category: 'DevOps', isJoined: false },
  { id: 'g4', name: 'Python Data Science', description: 'Pandas, NumPy, Scikit-learn, TensorFlow et plus encore.', memberCount: 267, activeUsers: 21, category: 'Data Science', isJoined: true },
];

const MOCK_MENTORS: Mentor[] = [
  { id: 'm1', name: 'Thomas Dubois', title: 'Lead Developer React Native @TechCorp', expertise: ['React Native', 'TypeScript', 'Firebase'], rating: 4.8, sessionCount: 124, pricePerSession: 45, bio: 'Développeur React Native depuis 5 ans.' },
  { id: 'm2', name: 'Sarah Lefevre', title: 'Senior Backend Engineer @DataFlow', expertise: ['Node.js', 'Python', 'AWS', 'Docker'], rating: 4.9, sessionCount: 89, pricePerSession: 55, bio: 'Experte en architectures backend scalables.' },
  { id: 'm3', name: 'Antoine Moreau', title: 'DevOps Architect @CloudScale', expertise: ['Kubernetes', 'Terraform', 'CI/CD', 'GCP'], rating: 4.7, sessionCount: 67, pricePerSession: 65, bio: 'Automatisation et infrastructures cloud.' },
  { id: 'm4', name: 'Marie Girard', title: 'Data Scientist @PredictAI', expertise: ['Python', 'TensorFlow', 'MLOps', 'SQL'], rating: 4.9, sessionCount: 152, pricePerSession: 50, bio: 'Spécialiste en machine learning et data science.' },
  { id: 'm5', name: 'Nicolas Petit', title: 'Fullstack Developer (React + Node)', expertise: ['React', 'Next.js', 'Node.js', 'PostgreSQL'], rating: 4.6, sessionCount: 43, pricePerSession: 35, bio: 'Développeur fullstack passionné par le web.' },
  { id: 'm6', name: 'Julie Lambert', title: 'UX Designer @DesignStudio', expertise: ['Figma', 'Design System', 'Accessibilité', 'Prototypage'], rating: 4.8, sessionCount: 76, pricePerSession: 40, bio: 'Designer UX depuis 7 ans, spécialisée en accessibilité.' },
];

const MOCK_COMMENTS: Comment[] = [
  {
    id: 'c1', author: { id: 'a2', name: 'Lucas Bernard' },
    content: 'Personnellement, je recommande Zustand pour sa simplicité. Redux Toolkit est très bien mais peut être overkill pour des projets moyens.',
    likes: 12,
    replies: [{ id: 'c1r1', author: { id: 'a3', name: 'Emma Petit' }, content: 'Je suis d\'accord ! Zustand est vraiment léger et agréable à utiliser. La courbe d\'apprentissage est quasi inexistante.', likes: 5, replies: [], createdAt: new Date(Date.now() - 3600000).toISOString() }],
    createdAt: new Date(Date.now() - 3600000 * 1.5).toISOString(),
  },
  {
    id: 'c2', author: { id: 'a4', name: 'Hugo Dubois' },
    content: 'Redux Toolkit avec RTK Query est imbattable pour la gestion des appels API et du cache. Ça vaut le coup d\'apprendre.', likes: 8, replies: [],
    createdAt: new Date(Date.now() - 3600000 * 0.5).toISOString(),
  },
  {
    id: 'c3', author: { id: 'a5', name: 'Claire Fontaine' },
    content: 'N\'oubliez pas Context API + useReducer pour des cas simples. Pas besoin de lib externe si votre state est peu profond.', likes: 6, replies: [],
    createdAt: new Date(Date.now() - 1800000).toISOString(),
  },
];

export const useTrendingTopics = () =>
  useQuery({
    queryKey: [...queryKeys.community.all, 'trending-topics'],
    queryFn: async () => MOCK_TOPICS,
  });

export const useDiscussions = () =>
  useQuery({
    queryKey: [...queryKeys.community.all, 'discussions'],
    queryFn: async () => MOCK_DISCUSSIONS,
  });

export const useDiscussion = (id: string) =>
  useQuery({
    queryKey: [...queryKeys.community.all, 'discussion', id],
    queryFn: async () => {
      const discussion = MOCK_DISCUSSIONS.find((d) => d.id === id) || null;
      return discussion;
    },
    enabled: !!id,
  });

export const useComments = (discussionId: string) =>
  useQuery({
    queryKey: [...queryKeys.community.all, 'comments', discussionId],
    queryFn: async () => MOCK_COMMENTS,
    enabled: !!discussionId,
  });

export const useStudyGroups = () =>
  useQuery({
    queryKey: [...queryKeys.community.all, 'study-groups'],
    queryFn: async () => MOCK_GROUPS,
  });

export const useMentors = () =>
  useQuery({
    queryKey: [...queryKeys.community.all, 'mentors'],
    queryFn: async () => MOCK_MENTORS,
  });

export const useCreatePost = () =>
  useMutation({
    mutationFn: async (_data: { title: string; content: string; tags: string[]; category: string }) => {
      await new Promise((resolve) => setTimeout(resolve, 500));
    },
  });

export const useToggleJoinGroup = () =>
  useMutation({
    mutationFn: async (_groupId: string) => {
      await new Promise((resolve) => setTimeout(resolve, 300));
    },
  });

export const useRequestMentorship = () =>
  useMutation({
    mutationFn: async (_mentorId: string) => {
      await new Promise((resolve) => setTimeout(resolve, 500));
    },
  });
