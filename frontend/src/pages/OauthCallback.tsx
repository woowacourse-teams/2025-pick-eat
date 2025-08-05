import { login } from '@apis/login';

import { ROUTE_PATH } from '@routes/routePath';

import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';

// TODO : 추후 URL 직접 접근못하게

const OauthCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const query = new URLSearchParams(location.search);
  const code = query.get('code');

  useEffect(() => {
    if (!code) {
      setLoading(false);
      return;
    }

    const fetchAccessToken = async () => {
      try {
        const data = await login.post(code);
        localStorage.setItem('accessToken', data.accessToken);
        navigate(ROUTE_PATH.HOME, { replace: true });
      } catch (error) {
        if ((error as Error & { status?: number }).status === 401) {
          navigate(ROUTE_PATH.PROFILE_INIT, { replace: true });
        } else {
          alert('인증에 실패했습니다. 다시 로그인해주세요.');
          navigate(ROUTE_PATH.LOGIN, { replace: true });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAccessToken();
  }, [code, navigate]);

  if (loading) return <div>로그인 처리 중입니다...</div>;
  return null;
};

export default OauthCallback;
