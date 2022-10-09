import { lazy } from 'react';
import { authRoles } from '../../auth';

const Home = lazy(() => import('./Home'));

const HomeAppConfig = {
  settings: {
    layout: { style: 'layout2' },
  },
  auth: authRoles.freelancer,
  routes: [
    {
      path: 'home',
      element: <Home />,
    },
  ],
};

export default HomeAppConfig;
