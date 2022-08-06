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
  auth: authRoles.company,
  routes: [
    {
      path: "calendar-company",
      element: <CalendarApp />,
    },
  ],
};

export default CalendarAppConfig;
