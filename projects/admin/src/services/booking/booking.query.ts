import {useQuery} from '@tanstack/react-query';
import {getAllBookingAction} from './booking.action';

export const useGetAllBookingQuery = () => {
  return useQuery({
    queryKey: ['getAllBookings'],
    queryFn: async () => {
      return await getAllBookingAction();
    },
  });
};
