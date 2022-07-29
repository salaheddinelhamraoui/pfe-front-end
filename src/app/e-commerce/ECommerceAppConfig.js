import { lazy } from "react";
import { Navigate } from "react-router-dom";
import EditeModal from "./modal/EditeModal";

const Product = lazy(() => import("./product/Product"));
const Products = lazy(() => import("./products/Products"));
const Order = lazy(() => import("./order/Order"));
const Orders = lazy(() => import("./orders/Orders"));

const ECommerceAppConfig = {
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

export default ECommerceAppConfig;
