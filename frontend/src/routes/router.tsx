import Layout from '@components/layouts/Layout';

import { THEME } from '@styles/global';
import reset from '@styles/reset';

import { ThemeProvider, Global } from '@emotion/react';
import RestaurantExclude from '@pages/restaurantExclude/RestaurantExclude';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router';

import App from '../App';

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
    children: [{ path: ROUTE_PATH.HOME, Component: App }],
  },
  {
    Component: Wrapper,
    children: [
      { path: ROUTE_PATH.RESTAURANT_EXCLUDE, Component: RestaurantExclude },
    ],
  },
]);

function Router() {
  return <RouterProvider router={routes} />;
}

export default Router;
