import {useQuery} from '@tanstack/react-query';
import {getAllHotelsAction, getHotelByIdAction} from './hotel.action';

export const useGetAllHotelsQuery = () => {
  return useQuery({
    queryKey: ['hotel', 'getAll'],
    queryFn: async () => {
      return await getAllHotelsAction();
    },
  });
};

export const useGetHotelByIdQuery = (id: string) => {
  return useQuery({
    queryKey: ['hotel', 'getById', id],
    queryFn: async () => {
      return await getHotelByIdAction(id);
    },
  });
};
