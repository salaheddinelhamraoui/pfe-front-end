import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import Button from "@mui/material/Button";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import { useSelector } from "react-redux";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { selectFiles, selectFolders, selectPath } from "./store/itemsSlice";

function FileManagerHeader(props) {
  const folders = useSelector(selectFolders);
  const files = useSelector(selectFiles);
  const path = useSelector(selectPath);

  return (
    <div className="p-24 sm:p-32 w-full flex flex-col sm:flex-row space-y-8 sm:space-y-0 items-center justify-between">
      <div className="flex flex-col items-center sm:items-start space-y-8 sm:space-y-0">
        <motion.span
          className="flex items-end"
          initial={{ x: -20 }}
          animate={{ x: 0, transition: { delay: 0.2 } }}
          delay={300}
        >
          <Typography
            component={Link}
            to="/"
            className="text-20 md:text-32 font-extrabold tracking-tight leading-none"
            role="button"
          >
            File Manager
          </Typography>
        </motion.span>
      </div>

      <div className="flex items-center -mx-8">
        <Button
          className="mx-8 whitespace-nowrap"
          variant="contained"
          color="secondary"
          startIcon={
            <FuseSvgIcon size={20}>heroicons-outline:plus</FuseSvgIcon>
          }
        >
          Upload file
        </Button>
      </div>
    </div>
  );
}

export default FileManagerHeader;
