import Layout from '@components/layouts/Layout';

import { AuthProvider, useAuth } from '@domains/login/context/AuthProvider';

import { useGA } from '@hooks/useGA';

import { ROUTE_PATH } from '@routes/routePath';

import { THEME } from '@styles/global';
import reset from '@styles/reset';

import { Global, ThemeProvider } from '@emotion/react';
import CreatePickeatWithLocation from '@pages/CreatePickeatWithLocation';
import CreateRoom from '@pages/CreateRoom';
import Login from '@pages/Login';
import Main from '@pages/Main';
import MyRoom from '@pages/myRoom/MyRoom';
import OauthCallback from '@pages/OauthCallback';
import MatchResult from '@pages/pickeat/matchResult/MatchResult';
import PickeatDetail from '@pages/pickeat/pickeatDetail/PickeatDetail';
import PreferRestaurant from '@pages/pickeat/preferRestaurant/PreferRestaurant';
import RestaurantExcludePage from '@pages/pickeat/restaurantExclude/RestaurantExcludePage';
import ProfileInit from '@pages/ProfileInit';
import RoomDetail from '@pages/RoomDetail';
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
  useLocation,
} from 'react-router';

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

function ProtectedLayout() {
  const { loggedIn, loading, hasToken, logoutUser } = useAuth();
  const location = useLocation();

  if (loading) return null;

  if (!loggedIn || !hasToken()) {
    alert('로그인이 필요합니다.');
    logoutUser();
    return (
      <Navigate to={ROUTE_PATH.LOGIN} state={{ from: location }} replace />
    );
  }

  return <Outlet />;
}

function GuestOnlyRoute() {
  const { loggedIn, loading } = useAuth();
  const location = useLocation();

  if (loading) return null;

  if (loggedIn) {
    return <Navigate to={ROUTE_PATH.MAIN} state={{ from: location }} replace />;
  }

  return <Outlet />;
}

const routes = createBrowserRouter([
  {
    Component: Wrapper,
    children: [
      { path: ROUTE_PATH.MAIN, Component: Main },
      {
        Component: ProtectedLayout,
        children: [
          { path: ROUTE_PATH.MY_PAGE, Component: MyRoom },
          { path: ROUTE_PATH.CREATE_ROOM, Component: CreateRoom },
          { path: ROUTE_PATH.ROOM_DETAIL, Component: RoomDetail },
        ],
      },
      {
        Component: GuestOnlyRoute,
        children: [
          { path: ROUTE_PATH.LOGIN, Component: Login },
          { path: ROUTE_PATH.PROFILE_INIT, Component: ProfileInit },
        ],
      },
      { path: ROUTE_PATH.OAUTH_CALLBACK, Component: OauthCallback },
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
    ],
  },
]);

function Router() {
  return <RouterProvider router={routes} />;
}

export default Router;
