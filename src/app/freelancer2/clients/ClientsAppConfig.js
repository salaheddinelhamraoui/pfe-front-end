import { lazy } from "react";
import { Navigate } from "react-router-dom";
import EditeModal from "./modal/EditeModal";
import { authRoles } from "../../auth";

const Products = lazy(() => import("./products/Products"));

const ClientsAppConfig = {
  settings: {
    layout: { style: "layout2" },
  },
  auth: authRoles.freelancer,
  routes: [
    {
      path: "clients",
      element: <Products />,
    },
  ],
};

export default ClientsAppConfig;
