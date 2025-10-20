import { accessToken } from '@domains/login/utils/authStorage';
import { joinCode } from '@domains/pickeat/utils/joinStorage';

export type ApiHeaders = Record<string, string>;
export type ApiBody = Record<string, unknown> | undefined;
export type Method = 'GET' | 'POST' | 'PATCH' | 'DELETE';

export class ApiError extends Error {
  status: number;
  body?: ApiBody;

  constructor(message: string, status: number, body?: ApiBody) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.body = body;
  }
}

export const BASE_URL_VERSION = {
  1: 'v1',
  2: 'v2',
} as const;

const requestApi = async <TResponse = unknown>(
  method: Method,
  endPoint: string,
  body?: ApiBody,
  headers?: ApiHeaders
): Promise<TResponse | null> => {
  const code = joinCode.get();
  const token = accessToken.get();
  const response = await fetch(`${process.env.API_BASE_URL}${endPoint}`, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Pickeat-Participant-Token': `Bearer ${code}`,
      ...headers,
    },

    body: body ? JSON.stringify(body) : undefined,
  });

  const text = await response.text();
  if (!response.ok) {
    const body = text === '' ? undefined : JSON.parse(text);
    throw new ApiError('요청 실패', response.status, body);
  }
  if (response.status === 204) return null;
  if (text === '') return null;
  return JSON.parse(text) as TResponse;
};

export const apiClient = {
  get: <T>(endPoint: string, headers?: ApiHeaders) =>
    requestApi<T>('GET', endPoint, undefined, headers),
  post: <T = unknown>(endPoint: string, body?: ApiBody, headers?: ApiHeaders) =>
    requestApi<T>('POST', endPoint, body, headers),
  patch: <T = unknown>(
    endPoint: string,
    body?: ApiBody,
    headers?: ApiHeaders
  ) => requestApi<T>('PATCH', endPoint, body, headers),
  delete: <T = unknown>(endPoint: string, headers?: ApiHeaders) =>
    requestApi<T>('DELETE', endPoint, undefined, headers),
};

export const BASE_URL_VERSION = {
  1: 'v1',
  2: 'v2',
} as const;
