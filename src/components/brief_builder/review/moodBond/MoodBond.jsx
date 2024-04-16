import React from "react";
import Image from "next/image";
import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { exampleImages } from "../../constants";

const MoodBond = ({ moodDeatils }) => {
  if (
    !moodDeatils?.contents ||
    !Array.isArray(moodDeatils?.contents) ||
    moodDeatils?.contents.length === 0
  ) {
    return;
  }

  return (
    <>
      <Box
        sx={{
          backgroundColor: "white",
          boxShadow: "0px 5px 30px 0px rgba(0, 0, 0, 0.1)",
          padding: "1.8rem",
          borderRadius: "1.8rem",
          gap: "1.8rem",
          width: "100%",
        }}
      >
        <Box
          as="div"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1.2rem",
            justifyContent: "center",
          }}
        >
          <Typography variant="h2">Mood Board</Typography>
          <Grid container spacing={"30px"} columns={{ sm: 4, md: 6, lg: 8 }}>
            {moodDeatils?.contents &&
              moodDeatils?.contents.map((content, index) => (
                <Grid item sm={2} key={index}>
                  <Image
                    src={content}
                    alt={`Image ${index}`}
                    width={200}
                    height={200}
                    layout="responsive"
                  />
                </Grid>
              ))}
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default MoodBond;
