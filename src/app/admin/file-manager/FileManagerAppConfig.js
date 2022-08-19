import { lazy } from "react";
import { authRoles } from "../../auth";

const FileManagerApp = lazy(() => import("./FileManagerApp"));

const FileManagerAppConfig = {
  settings: {
    layout: { style: "layout2" },
  },
  auth: authRoles.admin,
  routes: [
    {
      path: "documents-admin",
      element: <FileManagerApp />,
    },
  ],
};

export default FileManagerAppConfig;
