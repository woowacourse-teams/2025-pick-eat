import { ROUTE_PATH } from '@routes/routePath';

import { joinAsPath } from '@utils/createUrl';

import { apiClient, ApiError, BASE_URL_VERSION } from './apiClient';

const BASE_PATH = 'auth';

export const login = {
  postKakao: async (
    code: string
  ): Promise<{ accessToken: string; status: number }> => {
    const baseUrl = process.env.BASE_URL;
    const redirectPath = ROUTE_PATH.OAUTH_CALLBACK.replace(/^\//, '');
    const path = joinAsPath(BASE_URL_VERSION[1], BASE_PATH, 'code');

    try {
      const data = await apiClient.post<{ token: string }>(path, {
        code,
        provider: 'kakao',
        redirectUrl: `${baseUrl}${redirectPath}`,
      });
      if (data && data.token) return { accessToken: data.token, status: 200 };
      return { accessToken: '', status: 401 };
    } catch (error) {
      if (error instanceof ApiError && error.status === 401 && error.body) {
        const token =
          typeof error.body.token === 'string' ? error.body.token : '';
        return { accessToken: token, status: 401 };
      }
      throw error;
    }
  },

  postSignUp: async ({
    token,
    nickname,
  }: {
    token: string;
    nickname: string;
  }) => {
    const path = joinAsPath(BASE_URL_VERSION[1], BASE_PATH, 'signup');

    const data = await apiClient.post<{ token: string; nickname: string }>(
      path,
      { nickname },
      { Authorization: `Bearer ${token}` }
    );

    return data ?? { token: '', nickname: '' };
  },

  postLogin: async ({ token }: { token: string }) => {
    const path = joinAsPath(BASE_URL_VERSION[1], BASE_PATH, 'login');
    const data = await apiClient.post<{ token: string }>(path, undefined, {
      Authorization: `Bearer ${token}`,
    });
    return data ?? { token: '' };
  },
};
