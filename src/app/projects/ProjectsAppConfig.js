import { lazy } from "react";
import { Navigate } from "react-router-dom";
import EditeModal from "./modal/EditeModal";

const Products = lazy(() => import("./products/Products"));

const ProjectsAppConfig = {
  settings: {
    layout: { style: "layout2" },
  },
  routes: [
    {
      path: "projects",
      element: <Products />,
    },
  ],
};

export default ProjectsAppConfig;
