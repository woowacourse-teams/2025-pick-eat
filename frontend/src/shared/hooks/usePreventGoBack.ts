import { useShowToast } from '@provider/ToastProvider';

import { useEffect } from 'react';

export function usePreventGoBack(
  message = '이전 페이지로 이동할 수 없습니다.'
) {
  const showToast = useShowToast();
  useEffect(() => {
    const handlePopState = () => {
      showToast({
        mode: 'WARN',
        message,
      });
      window.history.pushState(null, document.title, window.location.href);
    };

    window.history.pushState(null, document.title, window.location.href);
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);
}
