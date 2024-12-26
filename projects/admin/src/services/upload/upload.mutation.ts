import {useMutation} from '@tanstack/react-query';
import {deleteAssetAction, uploadSingleAssetAction} from './upload.action';

export const useUploadSingleMutation = () => {
  return useMutation({
    mutationFn: async (file: File) => {
      return await uploadSingleAssetAction(file);
    },
  });
};

export const useDeleteAssetMutation = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      return await deleteAssetAction(id);
    },
  });
};
