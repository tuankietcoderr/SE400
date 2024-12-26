'use server';

import {FETCH} from '@/utils/fetch-util';
import {revalidateTag} from 'next/cache';
import {cookies} from 'next/headers';

export const getAllBookingAction = async () => {
  const cookieData = await cookies();
  return await FETCH.get<any>('/booking', {
    cookies: cookieData,
    next: {
      tags: ['getAllBooking'],
    },
  });
};

export const getBookingDetailAction = async (id: string) => {
  const cookieData = await cookies();
  return await FETCH.get<any>(`/booking/${id}`, {
    cookies: cookieData,
    next: {
      tags: [`getBookingDetail-${id}`],
    },
  });
};

export const updateBookingAction = async (id: string, data: any) => {
  const cookieData = await cookies();
  const res = await FETCH.put<any, any>(`/booking/${id}`, data, {
    cookies: cookieData,
  });
  if (res.success) {
    revalidateTag(`getBookingDetail-${id}`);
  }
  return res;
};

export const deleteBookingAction = async (id: string) => {
  const cookieData = await cookies();
  const res = await FETCH.delete<any>(`/booking/${id}`, {
    cookies: cookieData,
  });
  if (res.success) {
    revalidateTag('getAllBooking');
  }
  return res;
};
