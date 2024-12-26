'use server';

import {EPaymentStatus} from '@/lib/enums/EPayment';
import {FETCH} from '@/utils/fetch-util';
import {revalidateTag} from 'next/cache';
import {cookies} from 'next/headers';

export const getAllPaymentsAction = async () => {
  const cookieData = await cookies();
  return await FETCH.get<any>('/payment', {
    cookies: cookieData,
    next: {
      tags: ['getAllPayments'],
    },
  });
};

export const getPaymentDetailAction = async (id: string) => {
  const cookieData = await cookies();
  return await FETCH.get<any>(`/payment/${id}`, {
    cookies: cookieData,
    next: {
      tags: [`getPaymentDetail-${id}`],
    },
  });
};

export const updatePaymentStatusAction = async (
  id: string,
  status: EPaymentStatus,
) => {
  const cookieData = await cookies();
  const res = await FETCH.put<any, any>(
    `/payment/${id}/status`,
    {status},
    {
      cookies: cookieData,
    },
  );
  if (res.success) {
    revalidateTag(`getBookingDetail-${res.data.booking_id}`);
  }
  return res;
};

export const deletePaymentAction = async (id: string) => {
  const cookieData = await cookies();
  const res = await FETCH.delete<any>(`/payment/${id}`, {
    cookies: cookieData,
  });
  if (res.success) {
    revalidateTag('getAllPayments');
  }
  return res;
};
