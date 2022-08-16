import { lazy } from 'react';
import FreelancerApp from './FreelancerApp';

const Course = lazy(() => import('./freelancer/Freelancer'));
const Freelancers = lazy(() => import('./freelancers/Freelancers'));

const FreelancerAppConfig = {
  settings: {
    layout: {
      style: 'layout2',
    },
  },
  routes: [
    {
      path: 'freelancers',
      element: <FreelancerApp />,
      children: [
        {
          path: '',
          element: <Freelancers />,
        },
      ],
    },
  ],
};

export default FreelancerAppConfig;
