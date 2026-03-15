import { accessToken } from '@domains/login/utils/authStorage';
import { joinCode } from '@domains/pickeat/utils/joinStorage';

import { ROUTE_PATH } from '@routes/routePath';

import { rateLimiter } from './rateLimit/rateLimiter';

export type ApiHeaders = Record<string, string>;
export type ApiBody = Record<string, unknown> | undefined;
export type Method = 'GET' | 'POST' | 'PATCH' | 'DELETE';

export type ApiRequestOptions = { skipRateLimit?: boolean };

const RATE_LIMIT_ENABLED_BY_METHOD: Record<Method, boolean> = {
  GET: true,
  POST: true,
  PATCH: false,
  DELETE: true,
};

/** rate limit 적용 제외 path. endPoint가 여기 포함되면 check/record 생략 */
const SKIP_LIST: ((endPoint: string) => boolean)[] = [];

function shouldApplyRateLimit(
  method: Method,
  endPoint: string,
  options?: ApiRequestOptions
): boolean {
  if (options?.skipRateLimit) return false;
  if (!RATE_LIMIT_ENABLED_BY_METHOD[method]) return false;
  if (SKIP_LIST.some(fn => fn(endPoint))) return false;
  return true;
}

function buildRateLimitKey(method: Method, endPoint: string): string {
  return `${method}\n${endPoint}`;
}

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
  if (shouldApplyRateLimit(method, endPoint, options)) {
    const key = buildRateLimitKey(method, endPoint);
    if (!rateLimiter.check(key)) {
      window.location.replace(ROUTE_PATH.TOO_MANY_REQUESTS);
      return new Promise(() => {}) as Promise<TResponse | null>;
    }
    rateLimiter.record(key);
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
    const body = text === '' ? undefined : JSON.parse(text);
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
