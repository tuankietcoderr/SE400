import {useMutation, useQueryClient} from '@tanstack/react-query';
import {
  createHotelAction,
  deleteHotelAction,
  updateHotelAction,
} from './hotel.action';

export const useCreateHotelMutation = () => {
  return useMutation({
    mutationFn: async (data: any) => {
      return await createHotelAction(data);
    },
  });
};

export const useUpdateHotelMutation = (id: string) => {
  return useMutation({
    mutationFn: async (data: any) => {
      return await updateHotelAction(id, data);
    },
  });
};

export const useDeleteHotelMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await deleteHotelAction(id);

      if (res.success) {
        queryClient.invalidateQueries({
          queryKey: ['hotel', 'getAll'],
        });
      }
      return res;
    },
  });
};
