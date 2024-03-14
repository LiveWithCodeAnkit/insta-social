"use client";

import React from "react";
import { useState } from "react";
// material
import { styled } from "@mui/material/styles";
import Navbar from "@/components/brandDashboard/Navbar";
import Sidebar from "@/components/brandDashboard/Sidebar";
//

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const RootStyle = styled("div")({
  display: "flex",
  minHeight: "100%",
  height: "100vh",
  overflow: "hidden",
  background: "url(/images/main_background.png) no-repeat center center / cover",
});

const MainStyle = styled("div")(({ theme }) => ({
  flexGrow: 1,
  overflow: "auto",
  minHeight: "100%",
  paddingTop: APP_BAR_MOBILE,
  paddingBottom: theme.spacing(4),
  [theme.breakpoints.up("lg")]: {
    paddingTop: APP_BAR_DESKTOP,
    paddingLeft: "30px",
    paddingRight: "30px",
  },
}));

// ----------------------------------------------------------------------

const layout = (props) => {
  const [open, setOpen] = useState(false);

  return (
    <RootStyle>
      <Navbar onOpenSidebar={() => setOpen(true)} />
      <Sidebar isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} />
      <MainStyle>{props.children}</MainStyle>
    </RootStyle>
  );
};

export default layout;
