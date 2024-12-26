import {useMutation} from '@tanstack/react-query';
import {
  createAmenityAction,
  deleteAmenityAction,
  updateAmenityAction,
} from './amenity.action';

export const useCreateAmenityMutation = () => {
  return useMutation({
    mutationFn: async (data: any) => {
      return await createAmenityAction(data);
    },
  });
};

export const useUpdateAmenityMutation = (id: string) => {
  return useMutation({
    mutationFn: async (data: any) => {
      return await updateAmenityAction(id, data);
    },
  });
};

export const useDeleteAmenityMutation = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      return await deleteAmenityAction(id);
    },
  });
};
