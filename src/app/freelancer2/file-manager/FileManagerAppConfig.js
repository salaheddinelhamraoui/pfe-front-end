import { lazy } from "react";
import { authRoles } from "../../auth";

const FileManagerApp = lazy(() => import("./FileManagerApp"));

const FileManagerAppConfig = {
  settings: {
    layout: { style: "layout2" },
  },
  auth: authRoles.freelancer,
  routes: [
    {
      path: "documents",
      element: <FileManagerApp />,
    },
  ],
};

export default FileManagerAppConfig;
