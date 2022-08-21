/* eslint-disable prettier/prettier */
import Typography from "@mui/material/Typography";
import { useState } from "react";
import Button from "@mui/material/Button";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";

function ProjectDashboardAppHeader(props) {
  const [selectedProject, setSelectedProject] = useState({
    id: 1,
    menuEl: null,
  });

  function handleChangeProject(id) {
    setSelectedProject({
      id,
      menuEl: null,
    });
  }

  function handleOpenProjectMenu(event) {
    setSelectedProject({
      id: selectedProject.id,
      menuEl: event.currentTarget,
    });
  }

  function handleCloseProjectMenu() {
    setSelectedProject({
      id: selectedProject.id,
      menuEl: null,
    });
  }

  return (
    <div className="flex flex-col w-full px-24 sm:px-32">
      <div className="flex flex-col sm:flex-row flex-auto sm:items-center min-w-0 my-32 sm:my-48">
        <div className="flex flex-auto items-center min-w-0">
          <div className="flex flex-col min-w-0 mx-16">
            <Typography className="text-2xl md:text-5xl font-semibold tracking-tight leading-7 md:leading-snug truncate">
              Project Title
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
        <div className="flex items-center mt-24 sm:mt-0 sm:mx-8 space-x-12">
          <Button
            className="whitespace-nowrap"
            variant="contained"
            color="error"
            startIcon={
              <FuseSvgIcon size={20}>heroicons-solid:trash</FuseSvgIcon>
            }
          >
            Delete
          </Button>
          <Button
            className="whitespace-nowrap"
            variant="contained"
            color="secondary"
            startIcon={<FuseSvgIcon size={20}>heroicons-solid:cog</FuseSvgIcon>}
          >
            Update
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ProjectDashboardAppHeader;
