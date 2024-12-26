import {EPaymentStatus} from '@/lib/enums/EPayment';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {deletePaymentAction, updatePaymentStatusAction} from './payment.action';

export const useUpdatePaymentStatusMutation = (id: string) => {
  return useMutation({
    mutationFn: async (status: EPaymentStatus) => {
      console.log('status', status);
      const res = await updatePaymentStatusAction(id, status);
      return res;
    },
  });
};

export const useDeletePaymentMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await deletePaymentAction(id);
      if (res.success) {
        queryClient.invalidateQueries({
          queryKey: ['getAllPayments'],
        });
      }
      return res;
    },
  });
};
