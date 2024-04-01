"use client";

import React from "react";

// material
import { alpha, styled } from "@mui/material/styles";
import { Box, Stack, AppBar, Toolbar, IconButton, Button } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";

// components

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;
const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 92;

const RootStyle = styled(AppBar)(({ theme }) => ({
  boxShadow: "none",
  color: "black",
  backdropFilter: "blur(6px)",
  WebkitBackdropFilter: "blur(6px)", // Fix on Mobile
  backgroundColor: "transparent",
  [theme.breakpoints.up("lg")]: {
    width: `calc(100% - ${DRAWER_WIDTH}px)`,
    // width: DRAWER_WIDTH
  },
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  minHeight: APPBAR_MOBILE,
  [theme.breakpoints.up("lg")]: {
    minHeight: APPBAR_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

const Navbar = ({ onOpenSidebar }) => {
  return (
    <RootStyle>
      <ToolbarStyle>
        <IconButton
          onClick={onOpenSidebar}
          sx={{ mr: 1, color: "text.primary", display: { lg: "none" } }}
        >
          {/* <Iconify icon="eva:menu-2-fill" /> */}hjh
        </IconButton>

        <Box sx={{ flexGrow: 1 }} />

        <Stack
          direction="row"
          alignItems="center"
          spacing={{ xs: 0.5, sm: 1.5, md: 2.5 }}
        >
          <Button
            variant="contained"
            type="button"
            sx={{
              "&:hover": { background: "#FFCC33" },
              background: "#FFCC33",
              color: "#212121",
              height: "50px",
              width: "157px",
              borderRadius: "50px",
              fontWeight: 600,
              textTransform: "none",
              boxShadow: "0px 4px 20px 0px #FFD24B80"
            }}
          >
            New Campaign
          </Button>
          <Button
            variant="outlined"
            type="button"
            sx={{
              // "&:hover": { background: "#FFCC33" },
              border: "1px solid #212121",
              color: "#212121",
              height: "50px",
              width: "118px",
              borderRadius: "50px",
              fontWeight: 600,
              textTransform: "none",
            }}
          >
            Messages
          </Button>
          <Box
            sx={{
              cursor: "pointer",
              height: "50px",
              width: "50px",
              borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "background.paper"
            }}
          >
            <IconButton>
              <NotificationsIcon
                sx={{ color: "#212121", }}
              />
            </IconButton>
          </Box>
        </Stack>
      </ToolbarStyle>
    </RootStyle>
  );
};

export default Navbar;
