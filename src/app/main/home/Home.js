import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "app/store/userSlice";
import { Navigate } from "react-router-dom";
import FuseLoading from "@fuse/core/FuseLoading";

const Home = () => {
  const user = useSelector(selectUser);

  if (user && user.role === "admin") {
    return <Navigate to="/project" />;
  }

  if (user && user.role === "freelancer") {
    return <Navigate to="/home-freelancer" />;
  }

  if (user && user.role === "company") {
    return <Navigate to="/home-company" />;
  }

  return <FuseLoading />;
};

export default Home;
