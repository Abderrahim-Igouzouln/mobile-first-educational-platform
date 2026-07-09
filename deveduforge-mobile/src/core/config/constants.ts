export const PAGINATION = {
  defaultPage: 1,
  defaultLimit: 20,
  maxLimit: 100,
} as const;

export const STORAGE_KEYS = {
  ONBOARDING: 'deveduforge.onboarding',
  AUTH_TOKENS: 'deveduforge.auth_tokens',
  USER: 'deveduforge.user',
  LANGUAGE: 'deveduforge.language',
  THEME: 'deveduforge.theme',
  CACHE_PREFIX: 'deveduforge.cache.',
  OFFLINE_QUEUE: 'deveduforge.offline_queue',
} as const;

export const QUERY_KEYS = {
  AUTH: { ME: ['auth', 'me'] },
  DOMAINS: { ALL: ['domains'] },
  TECHNOLOGIES: { BY_DOMAIN: (slug: string) => ['technologies', slug] },
  COURSES: {
    BY_TECH: (slug: string) => ['courses', slug],
    DETAIL: (id: string) => ['courses', 'detail', id],
    BOOKMARKS: ['courses', 'bookmarks'],
    CONTINUE_LEARNING: ['courses', 'continue-learning'],
  },
  EXERCISES: {
    BY_LESSON: (id: string) => ['exercises', id],
    HISTORY: (id: string) => ['exercises', 'history', id],
  },
  CERTIFICATIONS: {
    ALL: ['certifications'],
    DETAIL: (id: string) => ['certifications', id],
  },
  USERS: {
    PROFILE: ['users', 'profile'],
  },
  PAYMENTS: {
    PLANS: ['payments', 'plans'],
    SUBSCRIPTION: ['payments', 'subscription'],
  },
  DISCUSSION: {
    ALL: ['discussions'],
    DETAIL: (id: number) => ['discussions', id],
  },
} as const;

export const ANIMATION_DURATION = {
  fast: 150,
  normal: 300,
  slow: 500,
} as const;

export const DATE_FORMAT = {
  display: 'DD/MM/YYYY',
  displayLong: 'dddd D MMMM YYYY',
  iso: 'YYYY-MM-DD',
  isoWithTime: "YYYY-MM-DD'T'HH:mm:ss.SSS'Z'",
  time: 'HH:mm',
} as const;
