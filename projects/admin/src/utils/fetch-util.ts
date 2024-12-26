import {COOKIES_KEY} from '@/lib/constants/cookies-key';
import {ENV} from '@/lib/constants/env';
import {convertToQuery} from '@/lib/converter';
import {ReadonlyRequestCookies} from 'next/dist/server/web/spec-extension/adapters/request-cookies';

type Options = {
  params?: Record<string, any>;
  body?: any;
  cookies?: ReadonlyRequestCookies;
  version?: string;
} & RequestInit;

const _FETCH = async <T extends any>(
  url: string,
  options?: Options,
): Promise<T> => {
  const isFormData = options?.body instanceof FormData;
  const opts = {
    ...options,
    body: isFormData ? options?.body : JSON.stringify(options?.body),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...options?.headers,
    },
  } as Options;

  //@ts-ignore
  isFormData && delete opts.headers['Content-Type'];

  try {
    const apiUrl = url.startsWith('http') ? url : `${ENV.BASE_API_URL}${url}`;

    const queries = opts.params
      ? '?' +
        Object.keys(opts.params as {})
          .map(key =>
            opts.params?.[key] ? convertToQuery(key, opts.params?.[key]) : [],
          )
          .join('&')
      : '';

    const res = await fetch(`${apiUrl}${queries}`, opts);
    const data = await res.json();

    return data as T;
  } catch (error: any) {
    return error;
  }
};

const FETCH_WITH_TOKEN = async <T extends any>(
  url: string,
  options?: Options,
) => {
  const cookieData = options?.cookies;
  const accessToken = cookieData?.get(COOKIES_KEY.AUTH_TOKEN.ACCESS_TOKEN);

  const headers = {
    Authorization: 'Bearer ' + accessToken?.value,
    ...options?.headers,
  } as HeadersInit;

  return await _FETCH<T>(url, {
    ...options,
    headers,
  });
};

export const FETCH = {
  native: FETCH_WITH_TOKEN,
  get: <T extends any>(url: string, options?: Options) =>
    FETCH_WITH_TOKEN<T>(url, {
      ...options,
      method: 'GET',
      cookies: options?.cookies,
    }),
  post: <T extends any, Y = {}>(url: string, data?: T, options?: Options) =>
    FETCH_WITH_TOKEN<Y>(url, {
      ...options,
      body: data as any,
      method: 'POST',
      cookies: options?.cookies,
    }),
  put: <T extends any, Y = {}>(url: string, data: T, options?: Options) =>
    FETCH_WITH_TOKEN<Y>(url, {
      ...options,
      body: data as any,
      method: 'PUT',
      cookies: options?.cookies,
    }),
  delete: <T extends any>(url: string, options?: Options) =>
    FETCH_WITH_TOKEN<T>(url, {
      ...options,
      method: 'DELETE',
      cookies: options?.cookies,
    }),
};
