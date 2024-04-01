"use client";
import React, { useState } from "react";
import { alpha, styled } from "@mui/material/styles";
import { Box, Stack, AppBar, Toolbar, IconButton, Button } from "@mui/material";

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
    width: `calc(100% - ${DRAWER_WIDTH + 1}px)`,
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
  const [activeButton, setActiveButton] = useState("Save Draft");
  const handleButtonClick = (label) => {
    setActiveButton(label);
  };

  return (
    <RootStyle>
      <ToolbarStyle>
        <Box sx={{ flexGrow: 1 }} />

        <Stack
          direction="row"
          alignItems="center"
          spacing={{ xs: 0.5, sm: 1.5, md: 2.5 }}
        >
          <CustomButton
            variant="outlined"
            color="#FFCC33"
            width="121px"
            label="Save Draft"
            isActive={activeButton === "Save Draft"}
            onClick={() => handleButtonClick("Save Draft")}
          />
          <CustomButton
            variant="contained"
            color="#FFCC33"
            border="#212121"
            width="178px"
            label="Launch Campaign"
            isActive={activeButton === "Launch Campaign"}
            onClick={() => handleButtonClick("Launch Campaign")}
          />
        </Stack>
      </ToolbarStyle>
    </RootStyle>
  );
};

const CustomButton = ({
  variant,
  color,
  border,
  width,
  label,
  isActive,
  onClick,
}) => (
  <Button
    variant={variant}
    type="button"
    sx={{
      "&:hover": { background: color },
      background: isActive ? color : "#FFFFFF",
      color: isActive ? "#212121" : "#000000",
      height: "50px",
      width: width,
      borderRadius: "50px",
      fontWeight: 600,
      textTransform: "none",
      border: `1px solid ${border}`,
    }}
    onClick={onClick}
  >
    {label}
  </Button>
);

export default Navbar;
