import Layout from '@components/layouts/Layout';

import { useGA } from '@hooks/useGA';

import { ROUTE_PATH } from '@routes/routePath';

import { THEME } from '@styles/global';
import reset from '@styles/reset';

import { ThemeProvider, Global } from '@emotion/react';
import ChooseWishlist from '@pages/ChooseWishlist';
import CreatePickeat from '@pages/CreatePickeat';
import Login from '@pages/Login';
import MatchResult from '@pages/MatchResult';
import MyPage from '@pages/MyPage';
import OauthCallback from '@pages/OauthCallback';
import PickeatDetail from '@pages/PickeatDetail';
import PreferRestaurant from '@pages/PreferRestaurant';
import QuickSignup from '@pages/ProfileInit';
import RestaurantExcludePage from '@pages/restaurantExclude/RestaurantExcludePage';
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
      {
        path: ROUTE_PATH.CHOOSE_WISHLIST,
        Component: ChooseWishlist,
      },
      { path: ROUTE_PATH.LOGIN, Component: Login },
      { path: ROUTE_PATH.QUICK_SIGNUP, Component: QuickSignup },
      { path: ROUTE_PATH.OAUTH_CALLBACK, Component: OauthCallback },
      {
        path: ROUTE_PATH.MY_PAGE,
        Component: MyPage,
      },
    ],
  },
]);

function Router() {
  return <RouterProvider router={routes} />;
}

export default Router;
