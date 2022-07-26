import FusePageSimple from "@fuse/core/FusePageSimple";
import useThemeMediaQuery from "@fuse/hooks/useThemeMediaQuery";

import { useRef, useState } from "react";
import { styled } from "@mui/material/styles";

import CardsContainer from "./homeComponents/CardsContainer";

const Root = styled(FusePageSimple)(({ theme }) => ({
  "& .FusePageSimple-header": {
    backgroundColor: theme.palette.background.white,
  },
}));

function Home() {
  const pageLayout = useRef(null);
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));

  const handleSideBar = (state) => {
    setRightSidebarOpen(state);
  };

  return (
    <Root
      header={<h2></h2>}
      content={<CardsContainer />}
      ref={pageLayout}
      scroll={isMobile ? "normal" : "content"}
    />
  );
}

export default Home;
