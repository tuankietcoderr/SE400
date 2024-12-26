import {useMutation, useQueryClient} from '@tanstack/react-query';
import {deleteReviewAction} from './review.action';

export const useDeleteReviewMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await deleteReviewAction(id);
      if (res.success) {
        queryClient.invalidateQueries({
          queryKey: ['getAllReviews'],
        });
      }
      return res;
    },
  });
};
