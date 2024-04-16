import React from "react";
import Image from "next/image";
import { Box, Button, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { exampleImages } from "../../../constants/creator";

const MoodBond = ({ campaignCreatorData }) => {
  const moodBondDetails =
    campaignCreatorData?.campaignDetails?.moodBoardDocs || {};

  console.log(moodBondDetails, "moodBondDetails");
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
            {moodBondDetails?.contents?.map((image, index) => (
              <Grid item sm={2} key={index}>
                <Image
                  src={`${image}`}
                  alt={`Image ${index}`}
                  width={200}
                  height={200}
                  layout="responsive"
                />
              </Grid>
            ))}
          </Grid>
          <Grid
            container
            sx={{
              justifyContent: "center",
              gap: "1.8rem",
            }}
            columns={{ sm: 4, md: 4, lg: 4 }}
          >
            {moodBondDetails?.externalLinks?.map((link, index) => (
              <Grid
                key={index}
                item
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  gap: "1.8rem",
                }}
              >
                <Box
                  as="div"
                  sx={{
                    padding: "1rem",
                    backgroundColor: "#FFF5D6",
                    borderRadius: "10px",
                    cursor: "pointer",
                  }}
                >
                  {link}
                </Box>
              </Grid>
            ))}
            {/* <Grid
              item
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "1.8rem",
              }}
            >
              <Button
                sx={{
                  width: "330px",
                  height: "50px",
                  borderRadius: "10px",
                  background: "#FFF5D6",
                  color: "common.black",
                  fontSize: "14px",
                  fontWeight: "600",
                }}
              >
                Instagram : Example 3
              </Button>
              <Button
                sx={{
                  width: "330px",
                  height: "50px",
                  borderRadius: "10px",
                  background: "#FFF5D6",
                  color: "common.black",
                  fontSize: "14px",
                  fontWeight: "600",
                }}
              >
                Instagram : Example 4
              </Button>
            </Grid>
            <Grid
              item
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "1.8rem",
              }}
            >
              <Button
                sx={{
                  width: "330px",
                  height: "50px",
                  borderRadius: "10px",
                  background: "#FFF5D6",
                  color: "common.black",
                  fontSize: "14px",
                  fontWeight: "600",
                }}
              >
                Instagram : Example 5
              </Button>
              <Button
                sx={{
                  width: "330px",
                  height: "50px",
                  borderRadius: "10px",
                  background: "#FFF5D6",
                  color: "common.black",
                  fontSize: "14px",
                  fontWeight: "600",
                }}
              >
                Instagram : Example 6
              </Button>
            </Grid> */}
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default MoodBond;
