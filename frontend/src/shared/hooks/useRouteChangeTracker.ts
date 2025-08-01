
import { useEffect } from 'react';
import ReactGA from 'react-ga4';
import { useLocation } from 'react-router';

const useRouteChangeTracker = () => {
  const location = useLocation();

  useEffect(() => {
    // if (!window.location.href.includes('localhost')) {
      ReactGA.send({ hintType: 'pageview', page: location.pathname });
    // }
  }, [location]);
};

export default useRouteChangeTracker;