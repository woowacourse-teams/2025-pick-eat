import Layout from '@components/layouts/Layout';

import CreateRoom from '@pages/CreateRoom';
import MatchResult from '@pages/MatchResult';
import PreferRestaurant from '@pages/PreferRestaurant';
import RestaurantExcludePage from '@pages/restaurantExclude/RestaurantExcludePage';
import RoomDetail from '@pages/RoomDetail';



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
    children: [{ path: ROUTE_PATH.HOME, Component: CreateRoom },
      { path: ROUTE_PATH.ROOM_DETAIL, Component: RoomDetail },
      { path: ROUTE_PATH.PREFER_RESTAURANT, Component: PreferRestaurant },
      { path: ROUTE_PATH.MATCH_RESULT, Component: MatchResult },
      {
        path: ROUTE_PATH.RESTAURANTS_EXCLUDE,
        Component: RestaurantExcludePage,
      },
    ],
  },
]);

function Router() {
  return <RouterProvider router={routes} />;
}

export default Router;
