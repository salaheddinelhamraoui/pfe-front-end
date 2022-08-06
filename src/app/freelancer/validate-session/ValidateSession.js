import FusePageSimple from "@fuse/core/FusePageSimple";
import useThemeMediaQuery from "@fuse/hooks/useThemeMediaQuery";

import { useRef } from "react";
import { styled } from "@mui/material/styles";
import ValidateCard from "./ValidateCard";

const Root = styled(FusePageSimple)(({ theme }) => ({
  "& .FusePageSimple-header": {
    backgroundColor: theme.palette.background.white,
  },
}));

function Home() {
  const pageLayout = useRef(null);
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));

  return (
    <Root
      header={<h2></h2>}
      content={<ValidateCard />}
      ref={pageLayout}
      scroll={isMobile ? "normal" : "content"}
    />
  );
}

export default Home;
