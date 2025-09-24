import { useAuth } from '@domains/login/context/AuthProvider';

import { login } from '@apis/login';

import { ROUTE_PATH } from '@routes/routePath';

import { useShowToast } from '@provider/ToastProvider';

import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';

const OauthCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const { loginUser, logoutUser } = useAuth();
  const query = new URLSearchParams(location.search);
  const code = query.get('code');
  const showToast = useShowToast();

  useEffect(() => {
    if (!code) {
      navigate(ROUTE_PATH.LOGIN, { replace: true });
      return;
    }

    const fetchAccessToken = async () => {
      try {
        const { accessToken, status } = await login.postKakao(code);
        switch (status) {
          case 401:
            navigate(ROUTE_PATH.PROFILE_INIT, {
              replace: true,
              state: { accessToken },
            });
            break;
          case 200: {
            const { token: userToken } = await login.postLogin({
              token: accessToken,
            });
            loginUser(userToken);
            navigate(ROUTE_PATH.MY_PAGE);
            break;
          }
          default:
            break;
        }
      } catch {
        showToast({
          mode: 'ERROR',
          message: '인증에 실패했습니다. 다시 로그인해 주세요.',
        });
        logoutUser();
        navigate(ROUTE_PATH.LOGIN, { replace: true });
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
