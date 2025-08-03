import { apiClient } from '@apis/apiClient';

import { ROUTE_PATH } from '@routes/routePath';

import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';

// TODO : 로그인 대기 로딩 처리 해두기
// TODO : 서버에서 받은 accessToken 을 로컬스토리지에 저장~

const OauthCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const query = new URLSearchParams(location.search);
  const code = query.get('code');

  useEffect(() => {
    if (!code) {
      setError('인증 코드가 없습니다.');
      setLoading(false);
      return;
    }

    (async () => {
      try {
        const response = await apiClient.post<{ accessToken: string }>(
          '/api/v1/oauth/kakao/code',
          { code }
        );

        if (response?.accessToken) {
          localStorage.setItem('accessToken', response.accessToken);
        }

        if (response) {
          navigate(ROUTE_PATH.HOME, { replace: true });
        } else {
          navigate(ROUTE_PATH.QUICK_SIGNUP, { replace: true });
        }
      } catch (err) {
        if (err instanceof Error && err.message.includes('401')) {
          navigate(ROUTE_PATH.QUICK_SIGNUP, { replace: true });
        } else {
          setError('로그인 중 오류가 발생했습니다.');
          console.error(err);
        }
      } finally {
        setLoading(false);
      }
    })();
  }, [code, navigate]);

  if (loading) return <div>로그인 처리 중입니다...</div>;
  if (error) return <div>오류: {error}</div>;

  return null;
};

export default OauthCallback;