import {useQuery} from '@tanstack/react-query';
import {getHotelRoomsAction} from './room.action';

export const useGetHotelRoomsQuery = (hotelId: string) => {
  return useQuery({
    queryKey: ['hotel-rooms', hotelId],
    queryFn: async () => {
      return await getHotelRoomsAction(hotelId);
    },
  });
};
