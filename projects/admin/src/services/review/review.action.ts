'use server';

import {FETCH} from '@/utils/fetch-util';
import {revalidateTag} from 'next/cache';
import {cookies} from 'next/headers';

export const getAllReviewsAction = async () => {
  const cookieData = await cookies();
  return await FETCH.get<any>('/review', {
    cookies: cookieData,
    next: {
      tags: ['getAllReviewsAction'],
    },
  });
};

export const getReviewDetailAction = async (id: string) => {
  const cookieData = await cookies();
  return await FETCH.get<any>(`/review/${id}`, {
    cookies: cookieData,
    next: {
      tags: [`getReviewDetailAction-${id}`],
    },
  });
};

export const deleteReviewAction = async (id: string) => {
  const cookieData = await cookies();
  const res = await FETCH.delete<any>(`/review/${id}`, {
    cookies: cookieData,
  });
  if (res.success) {
    revalidateTag('getAllReviewsAction');
  }
  return res;
};
