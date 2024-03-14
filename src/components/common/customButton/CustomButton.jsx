import React from "react";
import { Box, Stack, AppBar, Toolbar, IconButton, Button } from "@mui/material";
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
     
    }}
    onClick={onClick}
  >
    {label}
  </Button>
);

export default CustomButton;
