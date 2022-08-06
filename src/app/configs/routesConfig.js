import FuseUtils from "@fuse/utils";
import FuseLoading from "@fuse/core/FuseLoading";
import { Navigate } from "react-router-dom";
import settingsConfig from "app/configs/settingsConfig";
import SignInConfig from "../main/sign-in/SignInConfig";
import SignUpConfig from "../main/sign-up/SignUpConfig";
import SignOutConfig from "../main/sign-out/SignOutConfig";
import Error404Page from "../main/404/Error404Page";
import adminRoutes from "../admin/index";
import freelancerRoutes from "../freelancer/index";
import companyRoutes from "../company";
import { authRoles } from "../auth";
import Home from "../main/home/Home";

const routeConfigs = [
  ...adminRoutes,
  ...freelancerRoutes,
  ...companyRoutes,
  SignOutConfig,
  SignInConfig,
  SignUpConfig,
];

const routes = [
  ...FuseUtils.generateRoutesFromConfigs(routeConfigs, authRoles.admin),
  {
    path: "/",
    element: <Home />,
    auth: authRoles.all,
    settings: {
      layout: {
        style: "layout2",
        config: {},
      },
    },
  },
  {
    path: "loading",
    element: <FuseLoading />,
    settings: {
      layout: {
        style: "layout2",
        config: {},
      },
    },
  },
  {
    path: "404",
    element: <Error404Page />,
    auth: authRoles.all,
    settings: {
      layout: {
        style: "layout2",
        config: {},
      },
    },
  },
  {
    path: "*",
    element: <Navigate to="404" />,
  },
];

export default routes;
