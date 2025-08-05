export const login = {
  post: async (code: string): Promise<{ accessToken: string }> => {
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
  // postProfileInit: async (nickname: string): Promise<void> => {
  //   const accessToken = localStorage.getItem('accessToken');
  //   if (!accessToken) {
  //     throw new Error('Access token is not available');
  //   }

  //   const response = await fetch(`${process.env.API_BASE_URL}users/profile`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Authorization: `Bearer ${accessToken}`,
  //     },
  //     body: JSON.stringify({ nickname }),
  //   });

  //   if (!response.ok) {
  //     throw new Error('프로필 초기화 실패');
  //   }
  // },
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
};
