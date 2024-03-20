"use client";
import React from "react";
import { useState } from "react";
// material
import {
  Box,
  Drawer,
  List,
  Button,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
// Components
import Navbar from "@/components/brief_builder/navbar/Navbar";
import Sidebar from "@/components/brief_builder/sidebar/Sidebar";
import NavSection from "@/components/brandDashboard/NavSection";
import { navConfigBriefBuilder } from "@/components/brief_builder/constants";
import Image from "next/image";
import { signOut } from "next-auth/react";
// ----------------------------------------------------------------------
const drawerWidth = 240;
const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const RootStyle = styled("div")({
  display: "flex",
  minHeight: "100%",
  height: "100vh",
  overflow: "hidden",
  background:
    "url(/images/main_background.png) no-repeat center center / cover",
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

const handleLogout = async () => {
  try {
    await signOut({ callbackUrl: "/" });
    localStorage.removeItem("sessionId");
    localStorage.removeItem("accessToken");
    router.push("/");
  } catch (error) {
    console.error("Error during logout:", error);
  }
};
const Layout = (props) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };



  return (
    <RootStyle>
      <Navbar />
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
        dsgdfgf
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "none", md: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
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

            <NavSection navConfig={navConfigBriefBuilder} />
            <Button
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
            </Button>
          </Box>
        </Drawer>
      </Box>

      <MainStyle>{props.children}</MainStyle>
    </RootStyle>
  );
};

export default Layout;
