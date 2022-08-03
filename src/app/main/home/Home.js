import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "app/store/userSlice";
import { Navigate } from "react-router-dom";

const Home = () => {
  const user = useSelector(selectUser);

  console.log("freelancer");

  if (user && user.role === "admin") {
    return <Navigate to="/project" />;
  }

  if (user && user.role === "freelancer") {
    console.log("freelancer");
    return <Navigate to="/404" />;
  }

  if (user && user.role === "company") {
    return <Navigate to="/404" />;
  }

  return <Navigate to="/404" />;
};

export default Home;
