import {useQuery} from '@tanstack/react-query';
import {getAllPaymentsAction} from './payment.action';

export const useGetAllPaymentQuery = () => {
  return useQuery({
    queryKey: ['getAllPayments'],
    queryFn: async () => {
      return await getAllPaymentsAction();
    },
  });
};
