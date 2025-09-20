import { ROUTE_PATH } from '@routes/routePath';

import { apiClient, ApiError } from './apiClient';

export const login = {
  postKakao: async (
    code: string
  ): Promise<{ accessToken: string; status: number }> => {
    const baseUrl = process.env.BASE_URL;
    const redirectPath = ROUTE_PATH.OAUTH_CALLBACK.replace(/^\//, '');
    const path = 'auth/code';

    try {
      const data = await apiClient.post<{ token: string }>(path, {
        code,
        provider: 'kakao',
        redirectUrl: `${baseUrl}${redirectPath}`,
      });
      if (data && data.token) return { accessToken: data.token, status: 200 };
      return { accessToken: '', status: 401 };
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) {
        return { accessToken: '', status: 401 };
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
    const path = 'auth/signup';
    const data = await apiClient.post<{ token: string; nickname: string }>(
      path,
      { nickname },
      { Authorization: `Bearer ${token}` }
    );

    return data ?? { token: '', nickname: '' };
  },

  postLogin: async ({ token }: { token: string }) => {
    const path = 'auth/login';
    const data = await apiClient.post<{ token: string }>(path, undefined, {
      Authorization: `Bearer ${token}`,
    });
    return data ?? { token: '' };
  },
};
