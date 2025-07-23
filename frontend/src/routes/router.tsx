import Layout from '@components/layouts/Layout';

import CreateRoom from '@pages/CreateRoom';

import { THEME } from '@styles/global';
import reset from '@styles/reset';

import { ThemeProvider, Global } from '@emotion/react';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router';

import { ROUTE_PATH } from './routePath';

function Wrapper() {
  return (
    <>
      <Global styles={reset} />
      <ThemeProvider theme={THEME}>
        <Layout>
          <Outlet />
        </Layout>
      </ThemeProvider>
    </>
  );
}

const routes = createBrowserRouter([
  {
    Component: Wrapper,
    children: [{ path: ROUTE_PATH.HOME, Component: CreateRoom }],
  },
]);

function Router() {
  return <RouterProvider router={routes} />;
}

export default Router;
