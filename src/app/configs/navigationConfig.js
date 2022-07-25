import i18next from "i18next";
import ar from "./navigation-i18n/ar";
import en from "./navigation-i18n/en";
import tr from "./navigation-i18n/tr";

i18next.addResourceBundle("en", "navigation", en);
i18next.addResourceBundle("tr", "navigation", tr);
i18next.addResourceBundle("ar", "navigation", ar);

const navigationConfig = [
  {
    id: "dashboard",
    title: "Dashboard",
    subtitle: "",
    type: "group",
    icon: "heroicons-outline:home",
    translate: "DASHBOARDS",
    children: [
      {
        id: "dashboards.analytics",
        title: "Analytics",
        type: "item",
        icon: "heroicons-outline:clipboard-check",
        url: "/project",
      },
    ],
  },
];

export default navigationConfig;
