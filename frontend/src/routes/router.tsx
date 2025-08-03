import Layout from '@components/layouts/Layout';

import CreatePickeat from '@pages/CreatePickeat';
import Login from '@pages/Login';
import MatchResult from '@pages/MatchResult';
import PickeatDetail from '@pages/PickeatDetail';
import PreferRestaurant from '@pages/PreferRestaurant';
import QuickSignup from '@pages/QuickSignup';
import RestaurantExcludePage from '@pages/restaurantExclude/RestaurantExcludePage';

import { useGA } from '@hooks/useGA';

import { ROUTE_PATH } from '@routes/routePath';

import { THEME } from '@styles/global';
import reset from '@styles/reset';

import { ThemeProvider, Global } from '@emotion/react';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router';

function Wrapper() {
  useGA().useRouteChangeTracker();
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
    children: [
      { path: ROUTE_PATH.HOME, Component: CreatePickeat },
      { path: ROUTE_PATH.PICKEAT_DETAIL, Component: PickeatDetail },
      { path: ROUTE_PATH.PREFER_RESTAURANT, Component: PreferRestaurant },
      { path: ROUTE_PATH.MATCH_RESULT, Component: MatchResult },
      {
        path: ROUTE_PATH.RESTAURANTS_EXCLUDE,
        Component: RestaurantExcludePage,
      },
      { path: ROUTE_PATH.LOGIN, Component: Login },
      { path: ROUTE_PATH.QUICK_SIGNUP, Component: QuickSignup },
    ],
  },
]);

function Router() {
  return <RouterProvider router={routes} />;
}

export default Router;
