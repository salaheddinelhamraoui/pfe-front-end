import FusePageSimple from "@fuse/core/FusePageSimple";
import withReducer from "app/store/withReducer";
import useThemeMediaQuery from "@fuse/hooks/useThemeMediaQuery";

import { useRef, useState } from "react";
import { styled } from "@mui/material/styles";

import EditeModal from "../modal/EditeModal";

import reducer from "../store";
import ProductsHeader from "./ProductsHeader";
import ProductsTable from "./ProductsTable";

const Root = styled(FusePageSimple)(({ theme }) => ({
  "& .FusePageSimple-header": {
    backgroundColor: theme.palette.background.white,
  },
}));

function Products() {
  const pageLayout = useRef(null);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false);
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));

  const handleSideBar = (state) => {
    setRightSidebarOpen(state);
  };

  return (
    <Root
      header={<ProductsHeader handleSideBar={handleSideBar} />}
      content={<ProductsTable handleSideBar={handleSideBar} />}
      ref={pageLayout}
      rightSidebarContent={<EditeModal handleSideBar={handleSideBar} />}
      rightSidebarOpen={rightSidebarOpen}
      rightSidebarOnClose={() => setRightSidebarOpen(false)}
      rightSidebarWidth={640}
      scroll={isMobile ? "normal" : "content"}
    />
  );
}

export default withReducer("eCommerceApp", reducer)(Products);
