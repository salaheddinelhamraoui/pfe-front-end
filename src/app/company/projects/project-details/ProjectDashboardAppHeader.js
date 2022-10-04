/* eslint-disable prettier/prettier */
import { useState, forwardRef } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";

import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { useParams } from "react-router-dom";
import axios from "axios";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function ProjectDashboardAppHeader(props) {
  const [open, setOpen] = useState(false);

  const routeParams = useParams();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [selectedProject, setSelectedProject] = useState({
    id: 1,
    menuEl: null,
  });

  const handleProjectDelete = () => {
    console.log(routeParams.id);
    axios
      .delete(
        `${process.env.REACT_APP_API_URL}/deleteProject/${routeParams.id}`
      )
      .then(() => {
        window.location.href = "/projects";
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="flex flex-col w-full px-24 sm:px-32">
      <div className="flex flex-col sm:flex-row flex-auto sm:items-center min-w-0 my-32 sm:my-48">
        <div className="flex flex-auto items-center min-w-0">
          <div className="flex flex-col min-w-0 mx-16">
            <Typography className="text-2xl md:text-5xl font-semibold tracking-tight leading-7 md:leading-snug truncate">
              {props.projectData.project_name}
            </Typography>

            <div className="flex items-center">
              <FuseSvgIcon size={20} color="action">
                heroicons-solid:bell
              </FuseSvgIcon>
              <Typography
                className="mx-6 leading-6 truncate"
                color="text.secondary"
              >
                3 hours of sessions left
              </Typography>
            </div>
          </div>
        </div>

        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>
            Are you sure you want to delete this project?
          </DialogTitle>

          <DialogActions>
            <Button
              onClick={() => {
                handleProjectDelete();
                handleClose();
              }}
            >
              Yes
            </Button>
            <Button onClick={handleClose}>No</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}

export default ProjectDashboardAppHeader;
