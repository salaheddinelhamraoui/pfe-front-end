import i18next from "i18next";
import ar from "./navigation-i18n/ar";
import en from "./navigation-i18n/en";
import tr from "./navigation-i18n/tr";
import { authRoles } from "../auth";

i18next.addResourceBundle("en", "navigation", en);
i18next.addResourceBundle("tr", "navigation", tr);
i18next.addResourceBundle("ar", "navigation", ar);

const navigationConfig = [
  // {
  //   id: "dashboard",
  //   title: "Dashboard",
  //   subtitle: "",
  //   type: "group",
  //   icon: "heroicons-outline:home",
  //   translate: "DASHBOARDS",
  //   children: [
  //     {
  //       id: "dashboards.analytics",
  //       title: "Analytics",
  //       type: "item",
  //       icon: "heroicons-outline:clipboard-check",
  //       url: "/project",
  //     },
  //   ],
  // },
  {
    id: "analytics",
    title: "Analytics",
    type: "item",
    icon: "heroicons-outline:clipboard-check",
    auth: authRoles.admin,
    url: "/project",
  },
  {
    id: "freelancers",
    title: "Freelancers",
    type: "item",
    icon: "heroicons-outline:user-circle",
    auth: authRoles.admin,
    url: "/freelancers",
  },
  {
    id: "companies",
    title: "Companies",
    type: "item",
    icon: "heroicons-outline:office-building",
    auth: authRoles.admin,
    url: "/companies",
  },
  {
    id: "projects",
    title: "Projects",
    type: "item",
    icon: "heroicons-outline:terminal",
    auth: authRoles.admin,
    url: "/projects",
  },
];

export default navigationConfig;
