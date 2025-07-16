import { createBrowserRouter, RouterProvider } from 'react-router';

import App from '../App';
import { ROUTE_PATH } from './routePath';

const routes = createBrowserRouter([
  {
    path: ROUTE_PATH.HOME,
    Component: App,
  },
]);

function Router() {
  return <RouterProvider router={routes} />;
}

export default Router;
