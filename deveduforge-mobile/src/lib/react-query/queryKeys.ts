export const queryKeys = {
  courses: {
    all: ['courses'] as const,
    domains: () => [...queryKeys.courses.all, 'domains'] as const,
    technologies: (domainId: string) =>
      [...queryKeys.courses.all, 'technologies', domainId] as const,
    detail: (courseId: string) =>
      [...queryKeys.courses.all, 'detail', courseId] as const,
  },
  user: {
    all: ['user'] as const,
    profile: () => [...queryKeys.user.all, 'profile'] as const,
    subscription: () => [...queryKeys.user.all, 'subscription'] as const,
  },
  exercises: {
    all: ['exercises'] as const,
    list: (courseId?: string) =>
      [
        ...queryKeys.exercises.all,
        'list',
        ...(courseId ? [courseId] : []),
      ] as const,
    detail: (exerciseId: string) =>
      [...queryKeys.exercises.all, 'detail', exerciseId] as const,
  },
  certifications: {
    all: ['certifications'] as const,
    detail: (certId: string) =>
      [...queryKeys.certifications.all, 'detail', certId] as const,
  },
  projects: {
    all: ['projects'] as const,
  },
  notifications: {
    all: ['notifications'] as const,
  },
  community: {
    all: ['community'] as const,
  },
};
