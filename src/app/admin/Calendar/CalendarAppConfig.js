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
  auth: authRoles.admin,
  routes: [
    {
      path: "calendar-admin",
      element: <CalendarApp />,
    },
  ],
};

export default CalendarAppConfig;
