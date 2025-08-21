
import { useEffect } from 'react';
import ReactGA from 'react-ga4';
import { useLocation } from 'react-router';

const useRouteChangeTracker = () => {
  const location = useLocation();
  
  useEffect(() => {
    if (window.location.href.includes('localhost')) return;
    ReactGA.send({ hintType: 'pageview', page: location.pathname });
  }, [location]);
};

const useGAEventTrigger = ({category, action, label, value}: {category: string, action: string, label?: string, value?: number})=> {
    ReactGA.event({
      action,
      category,
      label,
      value
    });
}

export const useGA = () => {
  return {
    useRouteChangeTracker,
    useGAEventTrigger
  }
}
