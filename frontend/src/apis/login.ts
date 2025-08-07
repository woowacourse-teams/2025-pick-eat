export const login = {
  postProfileInit: async (nickname: string): Promise<void> => {
    const response = await fetch(
      `${process.env.API_BASE_URL}${process.env.LOGIN_PATH}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nickname,
        }),
        credentials: 'include',
      }
    );

    if (response.status === 200) {
      const data = await response.json();
      return data;
    } else {
      const error = new Error('로그인 실패');
      (error as Error & { status?: number }).status = response.status;
      throw error;
    }
  },
  postKakao: async (
    code: string
  ): Promise<{ accessToken: string; status: number }> => {
    console.log('Kakao code:', code);
    const isDevelopment = process.env.BASE_URL === 'http://localhost:3000/';
    const response = await fetch(
      `${process.env.API_BASE_URL}${process.env.LOGIN_PATH}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code,
          provider: 'kakao',
          redirectUrlType: isDevelopment ? 'development' : 'production',
        }),
        credentials: 'include',
      }
    );
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
    accessToken,
    nickname,
  }: {
    accessToken: string;
    nickname: string;
  }) => {
    const response = await fetch(`${process.env.API_BASE_URL}auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ nickname }),
    });
    if (!response.ok) throw new Error('요청 실패');
  },
};
