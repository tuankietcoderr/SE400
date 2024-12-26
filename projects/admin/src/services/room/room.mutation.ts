import {useMutation, useQueryClient} from '@tanstack/react-query';
import {
  createRoomAction,
  deleteRoomAction,
  updateRoomAction,
} from './room.action';

export const useCreateRoomMutation = () => {
  return useMutation({
    mutationFn: async (data: any) => {
      return await createRoomAction(data);
    },
  });
};

export const useUpdateRoomMutation = (roomId: string) => {
  return useMutation({
    mutationFn: async (data: any) => {
      return await updateRoomAction(roomId, data);
    },
  });
};

export const useDeleteRoomMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await deleteRoomAction(id);
      if (res.success) {
        queryClient.invalidateQueries({
          queryKey: ['hotel-rooms', res.data.hotel_id],
        });
      }
      return res;
    },
  });
};
