'use server';

import {FETCH} from '@/utils/fetch-util';
import {cookies} from 'next/headers';

export const getAllAssetsAction = async () => {
  const cookieData = await cookies();
  return await FETCH.get<any>('/asset', {
    cookies: cookieData,
  });
};

export const uploadSingleAssetAction = async (file: File) => {
  const cookieData = await cookies();
  const formData = new FormData();
  formData.append('file', file);
  return await FETCH.post<FormData, any>('/upload/single', formData, {
    cookies: cookieData,
  });
};

export const deleteAssetAction = async (id: string) => {
  const cookieData = await cookies();
  return await FETCH.delete<any>(`/upload`, {
    cookies: cookieData,
    params: {
      public_id: id,
    },
  });
};
