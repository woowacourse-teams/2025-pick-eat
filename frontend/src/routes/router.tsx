import App from 'App';
import { createBrowserRouter, RouterProvider } from 'react-router';

import { ROUTE_PATH } from './routePath';

const routes = createBrowserRouter([
  {
    path: ROUTE_PATH.HOME,
    element: <App />,
  },
]);

function Router() {
  return <RouterProvider router={routes} />;
}

export default Router;
