import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import clsx from "clsx";
import FreelancerCategory from "./FreelancerCategory";
import Avatar from "@mui/material/Avatar";

function FreelancerInfo({ course, className }) {
  if (!course) {
    return null;
  }

  return (
    <div className={clsx("w-full", className)}>
      <div className="flex items-center justify-between mb-16">
        <FreelancerCategory slug={course.category} />

        {course.progress.completed > 0 && (
          <FuseSvgIcon className="text-green-600" size={20}>
            heroicons-solid:badge-check
          </FuseSvgIcon>
        )}
      </div>
      <div className="flex items-center justify-center mb-24">
        <Avatar
          sx={{
            backgroundColor: "background.paper",
            color: "text.secondary",
          }}
          className="avatar text-32 font-bold w-96 h-96"
          src="assets/images/avatars/brian-hughes.jpg"
          alt="avatar"
        ></Avatar>
      </div>

      <Typography className="text-16 font-medium">{course.title}</Typography>

      {/* <Typography className="text-13 mt-2 line-clamp-2" color="text.secondary">
        {course.description}
      </Typography> */}

      <Divider className="w-48 my-24 border-1" light />

      <Typography
        className="flex items-center space-x-6 text-13"
        color="text.secondary"
      >
        <FuseSvgIcon color="disabled" size={20}>
          heroicons-solid:clock
        </FuseSvgIcon>
        <span className="whitespace-nowrap leading-none">{`${course.duration} Finished Projects`}</span>
      </Typography>
      {/* <Typography
        className="flex items-center space-x-6 text-13 mt-8"
        color="text.secondary"
      >
        <FuseSvgIcon color="disabled" size={20}>
          heroicons-solid:academic-cap
        </FuseSvgIcon>
        <span className="whitespace-nowrap leading-none">
          {course.progress.completed === 1 && "Completed once"}
          {course.progress.completed === 2 && "Completed twice"}
          {course.progress.completed > 2 &&
            `Completed ${course.progress.completed} times`}
          {course.progress.completed <= 0 && "Never completed"}
        </span>
      </Typography> */}
    </div>
  );
}

export default FreelancerInfo;
