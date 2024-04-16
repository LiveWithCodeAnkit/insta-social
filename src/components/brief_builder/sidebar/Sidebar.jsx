"use client";
import React, { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import { Box, Button, Drawer } from "@mui/material";
import Image from "next/image";
import NavSection from "@/components/brandDashboard/NavSection";
import { signOut } from "next-auth/react";

const drawerWidth = 260;
const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const RootStyle = styled("div")({
  display: "flex",
  minHeight: "100%",
  height: "100vh",
  overflow: "hidden",
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

const Sidebar = (props) => {
  const { navConfig, NavbarComponent } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <RootStyle>
      <NavbarComponent />
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
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "none", md: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              boxShadow: "4px 0px 40px 0px rgba(0, 0, 0, 0.1)",
              border: "none",
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

            <NavSection navConfig={navConfig} />
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

export default Sidebar;
