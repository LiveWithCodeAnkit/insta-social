import React from "react";
import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";

const DoPage = ({ campaignDetails }) => {
  if (
    !campaignDetails ||
    !campaignDetails.doThings ||
    !campaignDetails.doNotThings
  ) {
    return null;
  }

  const { doThings, doNotThings } = campaignDetails;

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Box
            sx={{
              backgroundColor: "white",
              boxShadow: "0px 5px 30px 0px rgba(0, 0, 0, 0.1)",
              borderRadius: "1.8rem",
              gap: "1.8rem",
              padding: "1.8rem",
              width: "100%",
              minHeight: "",
            }}
          >
            <Box
              as="div"
              sx={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}
            >
              <Typography variant="h2">Do</Typography>
              <div className="parent">
                <div
                  dangerouslySetInnerHTML={{
                    __html: doThings,
                  }}
                ></div>
              </div>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box
            sx={{
              backgroundColor: "white",
              boxShadow: "0px 5px 30px 0px rgba(0, 0, 0, 0.1)",
              borderRadius: "1.8rem",
              padding: "1.8rem",
              width: "100%",
            }}
          >
            <Box
              as="div"
              sx={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}
            >
              <Typography variant="h2">Don’t</Typography>

              <div className="parent">
                <div
                  dangerouslySetInnerHTML={{
                    __html: doNotThings,
                  }}
                ></div>
              </div>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default DoPage;
