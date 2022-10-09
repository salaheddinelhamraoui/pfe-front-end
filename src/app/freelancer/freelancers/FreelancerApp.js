import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import withReducer from "app/store/withReducer";
import { getCategories } from "./store/categoriesSlice";
import reducer from "./store";

function FreelancerApp() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return <Outlet />;
}

export default withReducer("freelancerApp", reducer)(FreelancerApp);
