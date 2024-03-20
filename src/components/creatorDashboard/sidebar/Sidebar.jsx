import React from "react";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { styled } from "@mui/material/styles";
import {
  Box,
  Link,
  Button,
  Drawer,
  Typography,
  Avatar,
  Stack,
} from "@mui/material";
import Image from "next/image";
import NavSection from "@/components/brandDashboard/NavSection";

import { usePathname } from "next/navigation";
import { navConfigCreator } from "../constants";
import { signOut } from "next-auth/react";
// ----------------------------------------------------------------------

const DRAWER_WIDTH = 270;

const RootStyle = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("lg")]: {
    flexShrink: 0,
    width: DRAWER_WIDTH,
    // boxShadow: "40px 4px 4px 4px #0000001A"
  },
}));

const Sidebar = ({ isOpenSidebar, onCloseSidebar }) => {
  const pathname = usePathname();

  //   const isDesktop = useResponsive("up", "lg");

  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    signOut();
  };

  const renderContent = (
    // <Scrollbar
    //   sx={{
    //     height: 1,
    //     "& .simplebar-content": {
    //       height: 1,
    //       display: "flex",
    //       flexDirection: "column",
    //     },
    //   }}
    // >
    <Box sx={{ p: "15px" }}>
      <Box sx={{ display: "inline-flex", p: "15px" }}>
        <Image
          src="/images/logo.png"
          alt="Mini Store Logo"
          width={150}
          height={64}
          priority
        />
      </Box>

      <NavSection navConfig={navConfigCreator} />
      {/* <Button
        variant="text"
        sx={{
          color: "black",
          backgroundColor: "transparent",
          "&:hover": {
            backgroundColor: "transparent",
          },
        }}
        onClick={handleLogout}
      >
        Logout
      </Button> */}
    </Box>
    // </Scrollbar>
  );

  return (
    <RootStyle>
      {/* {!isDesktop && (
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{
            sx: { width: DRAWER_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      )} */}

      {/* {isDesktop && ( */}
      <Drawer
        open
        variant="persistent"
        PaperProps={{
          sx: {
            width: DRAWER_WIDTH,
            // bgcolor: "background.paper",
            boxShadow: "4px 0px 40px 0px rgba(0, 0, 0, 0.1)",
            border: "none",
          },
        }}
      >
        {renderContent}
      </Drawer>
      {/* )} */}
    </RootStyle>
  );
};

export default Sidebar;
