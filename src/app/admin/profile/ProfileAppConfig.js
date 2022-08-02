import { lazy } from "react";
import { Navigate } from "react-router-dom";

const Profile = lazy(() => import("./Profile"));

const ProfileAppConfig = {
  settings: {
    layout: {
      style: "layout2",
    },
  },
  routes: [
    {
      path: "profile",
      element: <Profile />,
    },
  ],
};

export default ProfileAppConfig;
