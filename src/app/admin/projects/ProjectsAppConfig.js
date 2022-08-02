import { lazy } from "react";
import { authRoles } from "../../auth";

const Products = lazy(() => import("./products/Products"));

const ProjectsAppConfig = {
  settings: {
    layout: { style: "layout2" },
  },
  auth: authRoles.admin,
  routes: [
    {
      path: "projects",
      element: <Products />,
    },
  ],
};

export default ProjectsAppConfig;
