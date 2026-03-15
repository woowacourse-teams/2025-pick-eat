import { accessToken } from '@domains/login/utils/authStorage';
import { joinCode } from '@domains/pickeat/utils/joinStorage';

import { ROUTE_PATH } from '@routes/routePath';


import { rateLimiter } from './rateLimit/rateLimiter';
import { monitor } from '@utils/sentry';

export type ApiHeaders = Record<string, string>;
export type ApiBody = Record<string, unknown> | undefined;
export type Method = 'GET' | 'POST' | 'PATCH' | 'DELETE';

export type ApiRequestOptions = { skipRateLimit?: boolean };

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

export class ClientRateLimitError extends Error {
  retryAfter?: number;

  constructor(message: string, retryAfter?: number) {
    super(message);
    this.name = 'ClientRateLimitError';
    this.retryAfter = retryAfter;
  }
}

export const BASE_URL_VERSION = {
  1: 'v1',
  2: 'v2',
};

const requestApi = async <TResponse = unknown>(
  method: Method,
  endPoint: string,
  body?: ApiBody,
  headers?: ApiHeaders,
  options?: ApiRequestOptions
): Promise<TResponse | null> => {
  if (!rateLimiter.tryAcquire(method, endPoint, options)) {
    const timestamps = rateLimiter.getSnapshotForReporting(method, endPoint);
    monitor.reportClientRateLimitError(method, endPoint, timestamps);
    window.location.replace(ROUTE_PATH.TOO_MANY_REQUESTS);
    return new Promise(() => { }) as Promise<TResponse | null>;
  }

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
    const body = text === '' ? undefined : (JSON.parse(text) as ApiBody);
    if (response.status === 429) {
      const serverMessage =
        body?.message && typeof body.message === 'string'
          ? body.message
          : undefined;
      monitor.reportServerTooManyRequest(method, endPoint, serverMessage);
    }
    throw new ApiError('요청 실패', response.status, body);
  }
  if (response.status === 204) return null;
  if (text === '') return null;
  return JSON.parse(text) as TResponse;
};

export const apiClient = {
  get: <T>(
    endPoint: string,
    headers?: ApiHeaders,
    options?: ApiRequestOptions
  ) => requestApi<T>('GET', endPoint, undefined, headers, options),
  post: <T = unknown>(
    endPoint: string,
    body?: ApiBody,
    headers?: ApiHeaders,
    options?: ApiRequestOptions
  ) => requestApi<T>('POST', endPoint, body, headers, options),
  patch: <T = unknown>(
    endPoint: string,
    body?: ApiBody,
    headers?: ApiHeaders,
    options?: ApiRequestOptions
  ) => requestApi<T>('PATCH', endPoint, body, headers, options),
  delete: <T = unknown>(
    endPoint: string,
    headers?: ApiHeaders,
    options?: ApiRequestOptions
  ) => requestApi<T>('DELETE', endPoint, undefined, headers, options),
};
