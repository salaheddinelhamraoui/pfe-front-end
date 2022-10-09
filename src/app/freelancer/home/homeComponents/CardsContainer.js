import { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import { Link, useNavigate } from "react-router-dom";
import Moment from "react-moment";
import { useSelector } from "react-redux";
import { selectUser } from "app/store/userSlice";
import axios from "axios";
import SignCard from "./SignCard";

const CardsContainer = () => {
  const user = useSelector(selectUser);
  const [data, setData] = useState();
  const [projects, setProjects] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/findSessionByUserIdTodayFreelancer/${user._id}`
      )
      .then((res) => {
        setData(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(
        `${process.env.REACT_APP_API_URL}/findProjectByFreelancerId/${user._id}`
      )
      .then((res) => {
        setProjects(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="w-full">
      <div className="w-full grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-16 mb-16 pt-16 sm:pt-24 lg:ltr:pr-0 lg:rtl:pl-0">
        <Paper className="flex flex-col flex-auto shadow rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-8 pt-12">
            <Typography
              className="px-16 text-lg font-medium tracking-tight leading-6 truncate"
              color="text.secondary"
            >
              My Profile
            </Typography>
          </div>
          <div className="text-center mt-8 flex flex-col items-center">
            {user.data.photoURL ? (
              <Avatar
                className="md:mx-4 w-84 h-84 mb-12"
                alt="user photo"
                src={user.data.photoURL}
              />
            ) : (
              <Avatar className="md:mx-4">{user.data.displayName[0]}</Avatar>
            )}
            <Typography className="text-2xl sm:text-2xl font-bold tracking-tight leading-none text-blue-500 mt-4">
              {user.data.displayName}
            </Typography>
            <Typography className="text-lg font-medium  dark:text-blue-500 mt-4">
              {user.role}
            </Typography>
            <Button
              to="/profile"
              component={Link}
              className="px-12 min-w-128 mb-24 mt-8"
              color="secondary"
              variant="contained"
              endIcon={
                <FuseSvgIcon className="" size={20}>
                  heroicons-solid:arrow-sm-right
                </FuseSvgIcon>
              }
            >
              Update
            </Button>
          </div>
        </Paper>
        <Paper className="flex flex-col flex-auto shadow rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-8 pt-12">
            <Typography
              className="px-16 mb-12 text-lg font-medium tracking-tight leading-6 truncate"
              color="text.secondary"
            >
              Today Sessions
            </Typography>
          </div>
          {data &&
            data.map((session) => (
              <SignCard key={session._id} session={session} />
            ))}
          {data && data.length === 0 && (
            <p className="text-center">No Sessions Found !!</p>
          )}
        </Paper>
      </div>
      <div className="w-full">
        <Paper className="flex flex-col flex-auto shadow rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-8 pt-12">
            <Typography
              className="px-16 mb-12 text-lg font-medium tracking-tight leading-6 truncate"
              color="text.secondary"
            >
              Latest Projects
            </Typography>
          </div>
          <div className="grid grid-cols-4   rounded-lg  px-12 py-8 mx-12 mb-8">
            <div className="flex items-center justify-center">
              <Typography className="text-base font-medium  dark:text-blue-500 mt-4 mr-auto">
                Name
              </Typography>
            </div>
            <div className="flex items-center justify-center ml-12">
              <Typography className="text-base font-medium  dark:text-blue-500 mt-4 mr-auto">
                Company
              </Typography>
            </div>
            <div className="flex items-center justify-center ml-12">
              <Typography className="text-base font-medium  dark:text-blue-500 mt-4 mr-auto">
                Start Date
              </Typography>
            </div>
            <div className="ml-auto" />
          </div>
          {projects &&
            projects.length > 0 &&
            projects.map((project) => (
              <div className="grid grid-cols-4  border rounded-lg  px-12 py-8 mx-12 mb-8">
                <div
                  className="flex items-center justify-center"
                  key={project._id}
                >
                  <Typography className="text-base font-medium  dark:text-blue-500 mt-4 mr-auto">
                    {project.project_name}
                  </Typography>
                </div>
                <div className="flex items-center justify-center ml-12">
                  <Typography className="text-base font-medium  dark:text-blue-500 mt-4 mr-auto">
                    {project.freelancer_id.data.displayName}
                  </Typography>
                </div>
                <div className="flex items-center justify-center ml-12">
                  <Typography className="text-base font-medium  dark:text-blue-500 mt-4 mr-auto">
                    <Moment format="YYYY/MM/DD">{project.start_date}</Moment>
                  </Typography>
                </div>
                <div className="ml-auto">
                  <Button
                    to={`/project-details-freelancer/${project._id}`}
                    component={Link}
                    className="px-12 min-w-128"
                    color="secondary"
                    variant="contained"
                    endIcon={
                      <FuseSvgIcon className="" size={20}>
                        heroicons-solid:arrow-sm-right
                      </FuseSvgIcon>
                    }
                  >
                    More Informations
                  </Button>
                </div>
              </div>
            ))}
        </Paper>
      </div>
    </div>
  );
};

export default CardsContainer;
