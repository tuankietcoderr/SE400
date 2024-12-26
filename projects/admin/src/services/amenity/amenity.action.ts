'use server';

import {FETCH} from '@/utils/fetch-util';
import {cookies} from 'next/headers';

export const getAllAmenitiesAction = async () => {
  const cookieData = await cookies();
  return await FETCH.get<any>('/amenity', {
    cookies: cookieData,
  });
};

export const getAmenityByIdAction = async (id: string) => {
  const cookieData = await cookies();
  return await FETCH.get<any>(`/amenity/${id}`, {
    cookies: cookieData,
  });
};

export const createAmenityAction = async (data: any) => {
  const cookieData = await cookies();
  return await FETCH.post<any, any>('/amenity', data, {
    cookies: cookieData,
  });
};

export const updateAmenityAction = async (id: string, data: any) => {
  const cookieData = await cookies();
  return await FETCH.put<any, any>(`/amenity/${id}`, data, {
    cookies: cookieData,
  });
};

export const deleteAmenityAction = async (id: string) => {
  const cookieData = await cookies();
  return await FETCH.delete<any>(`/amenity/${id}`, {
    cookies: cookieData,
  });
};
