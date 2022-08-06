import { lazy } from "react";
import FreelancerApp from "./FreelancerApp";
import { authRoles } from "../../auth";

const Course = lazy(() => import("./freelancer/Freelancer"));
const Freelancers = lazy(() => import("./freelancers/Freelancers"));

const FreelancerAppConfig = {
  settings: {
    layout: {
      style: "layout2",
    },
  },
  auth: authRoles.company,
  routes: [
    {
      path: "freelancers-company",
      element: <FreelancerApp />,
      children: [
        {
          path: "",
          element: <Freelancers />,
        },
      ],
    },
  ],
};

export default FreelancerAppConfig;
