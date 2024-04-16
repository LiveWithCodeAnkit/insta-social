import { Box, Grid, Stack, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";

const BriefDetails = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Box
          sx={{
            // height: "150px",
            // maxWidth: "611px",
            background:
              "url(/images/brief_recap_bg.png) no-repeat center center / cover",
            p: "30px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            borderRadius: "10px",
            cursor: "pointer",
            position: "relative",
          }}
        >
          <Typography variant="h3">Brief Recap</Typography>
          <Typography
            variant="subtitle1"
            textAlign="center"
            mt={"10px"}
            color={"common.black"}
          >
            You will share a feed post on Instagram between October 6th, 2022
            and ASAP
          </Typography>
          <Box sx={{ position: "absolute", right: 15, top: 15 }}>
            <Image
              src="/images/launch.png"
              alt="arrow right"
              width={24}
              height={24}
            />
          </Box>
        </Box>
      </Grid>

      <Grid item xs={6}>
        <Box
          as="div"
          sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          <Typography variant="h2">Objective</Typography>
          <Box>
            <p
              style={{
                color: "#777777",
                fontSize: "1rem",
                lineHeight: "1.8rem",
              }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default BriefDetails;
