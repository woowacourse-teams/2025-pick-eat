import LoadingSpinner from '@components/assets/LoadingSpinner';
import Layout from '@components/layouts/Layout';

import { AuthProvider, useAuth } from '@domains/login/context/AuthProvider';

import { pickeatQuery } from '@apis/pickeat';
import { queryClient } from '@apis/queryClient';

import { useGA } from '@hooks/useGA';

import { ROUTE_PATH } from '@routes/routePath';

import { useShowToast } from '@provider/ToastProvider';

import { THEME } from '@styles/global';
import reset from '@styles/reset';

import { Global, ThemeProvider } from '@emotion/react';
import CreatePickeatWithLocation from '@pages/CreatePickeatWithLocation';
import Login from '@pages/Login';
import Main from '@pages/Main';
import OauthCallback from '@pages/OauthCallback';
import MatchResult from '@pages/pickeat/matchResult/MatchResult';
import PickeatDetail from '@pages/pickeat/pickeatDetail/PickeatDetail';
import PreferRestaurant from '@pages/pickeat/preferRestaurant/PreferRestaurant';
import RestaurantExcludePage from '@pages/pickeat/restaurantExclude/RestaurantExcludePage';
import ProfileInit from '@pages/ProfileInit';
import { QueryClientProvider } from '@tanstack/react-query';
import { lazy, Suspense } from 'react';
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
  useLocation,
  useSearchParams,
} from 'react-router';

const MyPage = lazy(() => import('@pages/myRoom/MyPage'));
const RoomDetail = lazy(() => import('@pages/roomDetail'));

function Wrapper() {
  useGA().useRouteChangeTracker();
  return (
    <>
      <Global styles={reset} />
      <ThemeProvider theme={THEME}>
        <Suspense fallback={<LoadingSpinner />}>
          <QueryClientProvider client={queryClient}>
            <AuthProvider>
              <Layout>
                <Outlet />
              </Layout>
            </AuthProvider>
          </QueryClientProvider>
        </Suspense>
      </ThemeProvider>
    </>
  );
}

function ProtectedLogin() {
  const { loggedIn, loading, hasToken, logoutUser } = useAuth();
  const location = useLocation();
  const showToast = useShowToast();

  if (loading) return null;

  if (!loggedIn || !hasToken()) {
    showToast({ mode: 'WARN', message: '로그인이 필요합니다.' });
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

function ProtectedPickeat() {
  const [searchParams] = useSearchParams();
  const pickeatCode = searchParams.get('code') ?? '';
  const { isLoading } = pickeatQuery.usePostRejoin(pickeatCode);
  if (isLoading) return null;
  return <Outlet />;
}

const routes = createBrowserRouter([
  {
    Component: Wrapper,
    children: [
      { path: ROUTE_PATH.MAIN, Component: Main },
      {
        Component: ProtectedLogin,
        children: [
          { path: ROUTE_PATH.MY_PAGE, Component: MyPage },
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
      {
        Component: ProtectedPickeat,
        children: [
          { path: ROUTE_PATH.PICKEAT_DETAIL, Component: PickeatDetail },
          {
            path: ROUTE_PATH.RESTAURANTS_EXCLUDE,
            Component: RestaurantExcludePage,
          },
          { path: ROUTE_PATH.PREFER_RESTAURANT, Component: PreferRestaurant },
        ],
      },
      { path: ROUTE_PATH.MATCH_RESULT, Component: MatchResult },
    ],
  },
]);

function Router() {
  return <RouterProvider router={routes} />;
}

export default Router;
