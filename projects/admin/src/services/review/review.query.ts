import {useQuery} from '@tanstack/react-query';
import {getAllReviewsAction} from './review.action';

export const useGetAllReviewsQuery = () => {
  return useQuery({
    queryKey: ['getAllReviews'],
    queryFn: async () => {
      return await getAllReviewsAction();
    },
    refetchInterval: 30000, // 30s
  });
};
