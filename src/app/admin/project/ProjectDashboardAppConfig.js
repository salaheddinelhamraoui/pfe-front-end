import { lazy } from "react";

const ProjectDashboardApp = lazy(() => import("./ProjectDashboardApp"));

const ProjectDashboardAppConfig = {
  settings: {
    layout: {
      style: "layout2",
      config: {},
    },
  },
  routes: [
    {
      path: "/project",
      element: <ProjectDashboardApp />,
    },
  ],
};

export default ProjectDashboardAppConfig;
