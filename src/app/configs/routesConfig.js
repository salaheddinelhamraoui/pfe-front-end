import FuseUtils from "@fuse/utils";
import FuseLoading from "@fuse/core/FuseLoading";
import { Navigate } from "react-router-dom";
import settingsConfig from "app/configs/settingsConfig";
import SignInConfig from "../main/sign-in/SignInConfig";
import SignUpConfig from "../main/sign-up/SignUpConfig";
import SignOutConfig from "../main/sign-out/SignOutConfig";
import Error404Page from "../main/404/Error404Page";
import ExampleConfig from "../main/example/ExampleConfig";
import ProjectDashboardAppConfig from "../admin/project/ProjectDashboardAppConfig";
import FreelancerAppConfig from "../admin/freelancers/FreelacerAppConfig";
import CompaniesAppConfig from "../admin/companies/CompaniesAppConfig";
import ProjectsAppConfig from "../admin/projects/ProjectsAppConfig";
import ProfileAppConfig from "../admin/profile/ProfileAppConfig";
import CalendarAppConfig from "../freelancer/Calendar/CalendarAppConfig";
import HomeAppConfig from "../freelancer/home/HomeAppConfig";
import { authRoles } from "../auth";
import Home from "../main/home/Home";

const routeConfigs = [
  ExampleConfig,
  ProjectDashboardAppConfig,
  SignOutConfig,
  SignInConfig,
  SignUpConfig,
  FreelancerAppConfig,
  CompaniesAppConfig,
  ProjectsAppConfig,
  ProfileAppConfig,
  CalendarAppConfig,
  HomeAppConfig,
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
