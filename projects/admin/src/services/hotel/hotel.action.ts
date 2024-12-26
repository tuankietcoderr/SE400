'use server';

import {FETCH} from '@/utils/fetch-util';
import {revalidateTag} from 'next/cache';
import {cookies} from 'next/headers';

export const getAllHotelsAction = async () => {
  return await FETCH.get<any>('/hotel', {
    next: {
      tags: ['hotel'],
    },
  });
};

export const createHotelAction = async (data: any) => {
  const cookieData = await cookies();
  const res = await FETCH.post<any, any>('/hotel', data, {
    cookies: cookieData,
  });
  if (res.success) {
    revalidateTag('hotel');
  }
  return res;
};

export const getHotelByIdAction = async (id: string) => {
  return await FETCH.get<any>(`/hotel/${id}`, {
    next: {
      tags: [`hotel-${id}`],
    },
  });
};

export const updateHotelAction = async (id: string, data: any) => {
  const cookieData = await cookies();
  const res = await FETCH.put<any, any>(`/hotel/${id}`, data, {
    cookies: cookieData,
  });
  if (res.success) {
    revalidateTag(`hotel-${id}`);
  }
  return res;
};

export const deleteHotelAction = async (id: string) => {
  const cookieData = await cookies();
  const res = await FETCH.delete<any>(`/hotel/${id}`, {
    cookies: cookieData,
  });
  if (res.success) {
    revalidateTag('hotel');
  }
  return res;
};
