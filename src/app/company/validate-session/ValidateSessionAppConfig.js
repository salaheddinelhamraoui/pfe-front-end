import { lazy } from "react";
import { authRoles } from "../../auth";
import ValidateSession from "./ValidateSession";

const Home = lazy(() => import("./ValidateSession"));

const ValidateSessionAppConfig = {
  settings: {
    layout: { style: "layout2" },
  },
  auth: authRoles.company,
  routes: [
    {
      path: "validate-session-company",
      element: <ValidateSession />,
    },
  ],
};

export default ValidateSessionAppConfig;
