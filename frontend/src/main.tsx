import React from 'react';
import ReactDOM from 'react-dom/client';
import ReactGA from 'react-ga4';

import Router from './routes/router';

if (!window.location.href.includes('localhost')) {
  ReactGA.initialize(process.env.GOOGLE_ANALYTICS_ID as string);
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>
);
