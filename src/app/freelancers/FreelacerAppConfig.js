import { lazy } from "react";
import { Navigate } from "react-router-dom";
import FreelancerApp from "./FreelancerApp";

const Course = lazy(() => import("./freelancer/Freelancer"));
const Courses = lazy(() => import("./freelancers/Freelancers"));

const FreelancerAppConfig = {
  settings: {
    layout: {
      style: "layout2",
    },
  },
  routes: [
    {
      path: "freelancers",
      element: <FreelancerApp />,
      children: [
        // {
        //   path: "",
        //   element: <Navigate to="/apps/academy/courses" />,
        // },
        // {
        //   path: "courses/:courseId/*",
        //   element: <Course />,
        // },
        {
          path: "",
          element: <Courses />,
        },
      ],
    },
  ],
};

export default FreelancerAppConfig;
