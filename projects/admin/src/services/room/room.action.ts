'use server';

import {FETCH} from '@/utils/fetch-util';
import {revalidateTag} from 'next/cache';
import {cookies} from 'next/headers';

export const getRoomDetailAction = async (id: string) => {
  return await FETCH.get<any>(`/room/${id}`, {
    next: {
      tags: [`room-${id}`],
    },
  });
};

export const getHotelRoomsAction = async (hotelId: string) => {
  return await FETCH.get<any>(`/room/hotel/${hotelId}`, {
    next: {
      tags: [`hotel-${hotelId}-rooms`],
    },
  });
};

export const createRoomAction = async (data: any) => {
  const cookieData = await cookies();
  const res = await FETCH.post<any, any>('/room', data, {
    cookies: cookieData,
  });
  if (res.success) {
    revalidateTag(`hotel-${data.hotel_id}-rooms`);
  }
  return res;
};

export const updateRoomAction = async (id: string, data: any) => {
  const cookieData = await cookies();
  const res = await FETCH.put<any, any>(`/room/${id}`, data, {
    cookies: cookieData,
  });
  if (res.success) {
    revalidateTag(`hotel-${data.hotel_id}-rooms`);
  }
  return res;
};

export const deleteRoomAction = async (id: string) => {
  const cookieData = await cookies();
  const res = await FETCH.delete<any>(`/room/${id}`, {
    cookies: cookieData,
  });
  if (res.success) {
    revalidateTag('hotel');
  }
  return res;
};
