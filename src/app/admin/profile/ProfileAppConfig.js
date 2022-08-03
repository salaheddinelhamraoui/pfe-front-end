import { lazy } from "react";
import { Navigate } from "react-router-dom";
import { authRoles } from "../../auth";

const Profile = lazy(() => import("./Profile"));

const ProfileAppConfig = {
  settings: {
    layout: {
      style: "layout2",
    },
  },
  auth: authRoles.all,
  routes: [
    {
      path: "profile",
      element: <Profile />,
    },
  ],
};

export default ProfileAppConfig;
