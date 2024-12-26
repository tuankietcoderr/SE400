import {useMutation, useQueryClient} from '@tanstack/react-query';
import {deleteBookingAction, updateBookingAction} from './booking.action';

export const useUpdateBookingMutation = (id: string) => {
  return useMutation({
    mutationFn: async (data: any) => {
      return await updateBookingAction(id, data);
    },
  });
};

export const useDeleteBookingMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await deleteBookingAction(id);
      if (res.success) {
        queryClient.invalidateQueries({
          queryKey: ['getAllBookings'],
        });
      }
      return res;
    },
  });
};
