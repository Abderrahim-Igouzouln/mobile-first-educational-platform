import { useCallback } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toggleBookmark as toggleBookmarkApi } from '../../../core/api/endpoints/course.endpoints';
import { queryKeys } from '../../../lib/react-query/queryKeys';

export const useBookmarkToggle = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (lessonId: string) => toggleBookmarkApi(lessonId),
    onMutate: async (lessonId: string) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.courses.all });

      const previousQueries = queryClient.getQueriesData({
        queryKey: queryKeys.courses.all,
      });

      queryClient.setQueriesData(
        { queryKey: queryKeys.courses.all, exact: false },
        (old: unknown) => {
          if (!old || typeof old !== 'object') return old;
          const data = old as { lessons?: Array<{ id: string; isBookmarked: boolean }> };
          if (!data.lessons) return old;
          return {
            ...data,
            lessons: data.lessons.map((l) =>
              l.id === lessonId ? { ...l, isBookmarked: !l.isBookmarked } : l,
            ),
          };
        },
      );

      return { previousQueries };
    },
    onError: (_err, _lessonId, context) => {
      if (context?.previousQueries) {
        context.previousQueries.forEach(([key, data]) => {
          queryClient.setQueryData(key, data);
        });
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.courses.all });
    },
  });

  const toggle = useCallback(
    (lessonId: string) => {
      mutation.mutate(lessonId);
    },
    [mutation],
  );

  return { toggle, isPending: mutation.isPending };
};
