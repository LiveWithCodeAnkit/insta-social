import React from "react";
import Image from "next/image";
import { CircularProgress, Grid } from "@mui/material";

const Loading = () => {
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: "100vh" }} // Adjust as needed for your layout
    >
      <Image
        src={"/images/spinner.gif"}
        alt="infopic"
        width={200}
        height={200}
      />
    </Grid>
  );
};

export default Loading;
