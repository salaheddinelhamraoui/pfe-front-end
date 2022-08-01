import FuseUtils from "@fuse/utils";
import FuseLoading from "@fuse/core/FuseLoading";
import { Navigate } from "react-router-dom";
import settingsConfig from "app/configs/settingsConfig";
import SignInConfig from "../main/sign-in/SignInConfig";
import SignUpConfig from "../main/sign-up/SignUpConfig";
import SignOutConfig from "../main/sign-out/SignOutConfig";
import Error404Page from "../main/404/Error404Page";
import ExampleConfig from "../main/example/ExampleConfig";
import ProjectDashboardAppConfig from "../main/project/ProjectDashboardAppConfig";
import FreelancerAppConfig from "../freelancers/FreelacerAppConfig";
import CompaniesAppConfig from "../companies/CompaniesAppConfig";
import ProjectsAppConfig from "../projects/ProjectsAppConfig";
import ProfileAppConfig from "../profile/ProfileAppConfig";

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
];

const routes = [
  ...FuseUtils.generateRoutesFromConfigs(
    routeConfigs,
    settingsConfig.defaultAuth
  ),
  {
    path: "/",
    element: <Navigate to="/project" />,
    auth: settingsConfig.defaultAuth,
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
