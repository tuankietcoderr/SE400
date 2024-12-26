import {useQuery} from '@tanstack/react-query';
import {getAllAmenitiesAction, getAmenityByIdAction} from './amenity.action';

export const useGetAllAmenitiesQuery = () => {
  return useQuery({
    queryKey: ['amenity', 'getAll'],
    queryFn: async () => {
      return await getAllAmenitiesAction();
    },
  });
};

export const useGetAmenityByIdQuery = (id: string) => {
  return useQuery({
    queryKey: ['amenity', 'getById', id],
    queryFn: async () => {
      return await getAmenityByIdAction(id);
    },
  });
};
