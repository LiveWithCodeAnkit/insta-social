import { Box, Typography } from "@mui/material";
import React from "react";
import LaunchIcon from "@mui/icons-material/Launch";

const ShippingInfo = () => {
  return (
    <>
      <Box
        sx={{
          backgroundColor: "white",
          boxShadow: "0px 5px 30px 0px rgba(0, 0, 0, 0.1)",
          padding: "1.8rem",
          borderRadius: "1.8rem",
          display: "flex",
          width: "100%",
          //   justifyContent: "space-between",
          gap: "1.8rem",
        }}
      >
        <Box
          as="div"
          sx={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}
        >
          <Typography variant="h3">Shipping Info</Typography>
          <Box>
            <Typography variant="subtitle1" sx={{ color: "common.black" }}>
              Please make sure the shipping info we have on file you is correct
              before you join the campaign
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "1.2rem",
              mt: "10px",
            }}
          >
            <Typography variant="h6">irma vazquez</Typography>
            <Typography variant="h6">9310 bxxxx</Typography>
            <Typography variant="h6">xxxxx xx</Typography>
            <Typography variant="h6">miami , fl 33147</Typography>
            <Typography variant="h6">united states</Typography>
          </Box>
          <Box
            sx={{
              mt: "10px",
              display: "flex",
              //   flexDirection: "column",
              cursor: "pointer",
              color: "primary.main",
            }}
          >
            <Typography variant="h4">Edit Shipping Info</Typography>
            <LaunchIcon sx={{ mt: "3px" }} />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ShippingInfo;
