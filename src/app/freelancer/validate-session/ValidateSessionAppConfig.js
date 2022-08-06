import { lazy } from "react";
import { authRoles } from "../../auth";
import ValidateSession from "./ValidateSession";

const Home = lazy(() => import("./ValidateSession"));

const ValidateSessionAppConfig = {
  settings: {
    layout: { style: "layout2" },
  },
  auth: authRoles.freelancer,
  routes: [
    {
      path: "validate-session",
      element: <ValidateSession />,
    },
  ],
};

export default ValidateSessionAppConfig;
