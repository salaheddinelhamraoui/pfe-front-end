import { lazy } from 'react';
import { authRoles } from '../../auth';

const Products = lazy(() => import('./products/Products'));
const ProjectDetails = lazy(() => import('./project-details/ProjectDetails'));

const ProjectsAppConfig = {
  settings: {
    layout: { style: 'layout2' },
  },
  auth: authRoles.company,
  routes: [
    {
      path: 'project-company',
      element: <Products />,
    },
    {
      path: 'project-details-company/:id',
      element: <ProjectDetails />,
    },
  ],
};

export default ProjectsAppConfig;
