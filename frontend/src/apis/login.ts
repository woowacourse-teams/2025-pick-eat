import { ROUTE_PATH } from '@routes/routePath';

export const login = {
  postKakao: async (
    code: string
  ): Promise<{ accessToken: string; status: number }> => {
    const baseUrl = window.location.origin;
    const redirectPath = ROUTE_PATH.OAUTH_CALLBACK.replace(/^\//, '');
    // TODO : 리다이렉트 URL 환경변수에서 뽑아쓰도록 다시 되돌려놓기
    // const redirectUrl = process.env.BASE_URL;

    const path = 'auth/code';
    const response = await fetch(`${process.env.API_BASE_URL}${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        code,
        provider: 'kakao',
        redirectUrl: `${baseUrl}${redirectPath}`,
      }),
      credentials: 'include',
    });
    if (response.status === 200 || response.status === 401) {
      const text = await response.text();
      if (text === '' || !text)
        return { accessToken: '', status: response.status };
      const data = JSON.parse(text);
      return { accessToken: data.token, status: response.status };
    } else {
      const error = new Error('로그인 실패');
      (error as Error & { status?: number }).status = response.status;
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
    const response = await fetch(`${process.env.API_BASE_URL}${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ nickname }),
    });
    if (!response.ok) throw new Error('요청 실패');
    return response.json();
  },
  postLogin: async ({ token }: { token: string }) => {
    const path = 'auth/login';
    const response = await fetch(`${process.env.API_BASE_URL}${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) throw new Error('로그인 실패');
    return response.json();
  },
};
