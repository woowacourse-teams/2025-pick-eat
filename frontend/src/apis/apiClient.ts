export type ApiHeaders = Record<string, string>;
export type ApiBody = Record<string, unknown> | undefined;
export type Method = 'GET' | 'POST' | 'PATCH' | 'DELETE';

const requestApi = async <TResponse = unknown>(
  method: Method,
  endPoint: string,
  body?: ApiBody,
  headers?: ApiHeaders
): Promise<TResponse | null> => {
  const response = await fetch(`${process.env.BASE_URL}${endPoint}`, {
    method,
    headers: {
      // Authorization: `Basic ${process.env.API_KEY}`,
      'Content-Type': 'application/json',
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!response.ok) throw new Error('요청 실패');
  if (response.status === 204) return null;
  const text = await response.text();
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
