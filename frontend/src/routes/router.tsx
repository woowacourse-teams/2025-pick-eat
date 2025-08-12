import Layout from '@components/layouts/Layout';

import { AuthProvider } from '@domains/login/context/AuthProvider';

import { useGA } from '@hooks/useGA';

import { ROUTE_PATH } from '@routes/routePath';

import { THEME } from '@styles/global';
import reset from '@styles/reset';

import { ThemeProvider, Global } from '@emotion/react';
import ChooseWishlist from '@pages/ChooseWishlist';
import CreatePickeatWithLocation from '@pages/CreatePickeatWithLocation';
import CreateRoom from '@pages/CreateRoom';
import Login from '@pages/Login';
import Main from '@pages/Main';
import MatchResult from '@pages/MatchResult';
import MyPage from '@pages/MyPage';
import OauthCallback from '@pages/OauthCallback';
import PickeatDetail from '@pages/PickeatDetail';
import PreferRestaurant from '@pages/PreferRestaurant';
import ProfileInit from '@pages/ProfileInit';
import RestaurantExcludePage from '@pages/restaurantExclude/RestaurantExcludePage';
import RoomDetail from '@pages/RoomDetail';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router';

function Wrapper() {
  useGA().useRouteChangeTracker();
  return (
    <>
      <Global styles={reset} />
      <ThemeProvider theme={THEME}>
        <AuthProvider>
          <Layout>
            <Outlet />
          </Layout>
        </AuthProvider>
      </ThemeProvider>
    </>
  );
}

const routes = createBrowserRouter([
  {
    Component: Wrapper,
    children: [
      { path: ROUTE_PATH.MAIN, Component: Main },

      {
        path: ROUTE_PATH.PICKEAT_WITH_LOCATION,
        Component: CreatePickeatWithLocation,
      },
      { path: ROUTE_PATH.PICKEAT_DETAIL, Component: PickeatDetail },
      { path: ROUTE_PATH.PREFER_RESTAURANT, Component: PreferRestaurant },
      { path: ROUTE_PATH.MATCH_RESULT, Component: MatchResult },
      {
        path: ROUTE_PATH.RESTAURANTS_EXCLUDE,
        Component: RestaurantExcludePage,
      },
      {
        path: ROUTE_PATH.PICKEAT_WITH_WISH,
        Component: ChooseWishlist,
      },
      { path: ROUTE_PATH.LOGIN, Component: Login },
      { path: ROUTE_PATH.PROFILE_INIT, Component: ProfileInit },
      { path: ROUTE_PATH.OAUTH_CALLBACK, Component: OauthCallback },
      {
        path: ROUTE_PATH.MY_PAGE,
        Component: MyPage,
      },
      {
        path: ROUTE_PATH.CREATE_ROOM,
        Component: CreateRoom,
      },
      {
        path: ROUTE_PATH.ROOM_DETAIL,
        Component: RoomDetail,
      },
    ],
  },
]);

function Router() {
  return <RouterProvider router={routes} />;
}

export default Router;
