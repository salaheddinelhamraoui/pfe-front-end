import { lazy } from "react";
import { authRoles } from "../../auth";

const CalendarApp = lazy(() => import("./CalendarApp"));

const CalendarAppConfig = {
  settings: {
    layout: {
      config: {},
      style: "layout2",
    },
  },
  auth: authRoles.freelancer,
  routes: [
    {
      path: "calendar",
      element: <CalendarApp />,
    },
  ],
};

export default CalendarAppConfig;
