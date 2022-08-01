import { lazy } from "react";
import { Navigate } from "react-router-dom";
import EditeModal from "./modal/EditeModal";

const Products = lazy(() => import("./products/Products"));

const CompaniesAppConfig = {
  settings: {
    layout: { style: "layout2" },
  },
  routes: [
    {
      path: "companies",
      element: <Products />,
    },
  ],
};

export default CompaniesAppConfig;
