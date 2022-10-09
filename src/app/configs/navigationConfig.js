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
  {
    id: "calendar",
    title: "Calendar",
    type: "item",
    icon: "heroicons-outline:calendar",
    auth: authRoles.admin,
    url: "/calendar-admin",
  },
  {
    id: "home-company",
    title: "Home",
    type: "item",
    icon: "heroicons-outline:home",
    auth: authRoles.company,
    url: "/home-company",
  },
  {
    id: "calendar-company",
    title: "Calendar",
    type: "item",
    icon: "heroicons-outline:calendar",
    auth: authRoles.company,
    url: "/calendar-company",
  },
  {
    id: "company-projects",
    title: "Projects",
    type: "item",
    icon: "heroicons-outline:terminal",
    auth: authRoles.company,
    url: "/project-company",
  },
  {
    id: "home-freelancer",
    title: "Home",
    type: "item",
    icon: "heroicons-outline:home",
    auth: authRoles.freelancer,
    url: "/home-freelancer",
  },
  {
    id: "calendar-freelancer",
    title: "Calendar",
    type: "item",
    icon: "heroicons-outline:calendar",
    auth: authRoles.freelancer,
    url: "/calendar-freelancer",
  },
  {
    id: "freelancer-projects",
    title: "Projects",
    type: "item",
    icon: "heroicons-outline:terminal",
    auth: authRoles.freelancer,
    url: "/project-freelancer",
  },
];

export default navigationConfig;
