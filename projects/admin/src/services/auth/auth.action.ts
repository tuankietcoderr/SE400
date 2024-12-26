'use server';

import {COOKIES_KEY} from '@/lib/constants/cookies-key';
import {ENV} from '@/lib/constants/env';
import {FETCH} from '@/utils/fetch-util';
import {revalidateTag} from 'next/cache';
import {cookies} from 'next/headers';
import {LoginRequestDto} from './auth.dto';

const setTokenCookies = async ({
  access_token,
  expires_in,
  refresh_token,
}: {
  access_token: string;
  refresh_token: string;
  expires_in: number;
}) => {
  const cookieData = await cookies();
  const cookieOptions = {
    maxAge: expires_in,
    priority: 'high',
    expires: new Date(Date.now() + expires_in),
    httpOnly: false,
    secure: ENV.NODE_ENV === 'production',
    sameSite: ENV.NODE_ENV === 'production' ? 'none' : 'lax', // 'none' for cross-site cookies, 'lax' for same-site cookies
  } as any;

  if (access_token && refresh_token) {
    cookieData.set(
      COOKIES_KEY.AUTH_TOKEN.ACCESS_TOKEN,
      access_token,
      cookieOptions,
    );
    cookieData.set(
      COOKIES_KEY.AUTH_TOKEN.REFRESH_TOKEN,
      refresh_token,
      cookieOptions,
    );
  }
};

export const loginUserAction = async (payload: LoginRequestDto) => {
  const res = await FETCH.post<LoginRequestDto, any>('/auth/login', payload);
  if (res.data) {
    const {accessToken, refreshToken, accessTokenExpiration} = res.data;
    await setTokenCookies({
      access_token: accessToken,
      refresh_token: refreshToken,
      expires_in: accessTokenExpiration,
    });
  }
  return res;
};

export const getCurrentUserAction = async () => {
  const cookieData = await cookies();
  const res = await FETCH.get<any>('/auth/me', {
    cookies: cookieData,
    next: {
      revalidate: 60 * 60, // 1 hours
      tags: ['getUser'],
    },
  });

  if (res.data) {
    return res.data;
  }

  return null;
};

export const logoutUserAction = async () => {
  const cookieData = await cookies();

  revalidateTag('getUser');
  cookieData.delete(COOKIES_KEY.AUTH_TOKEN.ACCESS_TOKEN);
  cookieData.delete(COOKIES_KEY.AUTH_TOKEN.REFRESH_TOKEN);
};
