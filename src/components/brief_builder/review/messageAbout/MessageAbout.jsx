import React from "react";
import Image from "next/image";
import { Box, Typography } from "@mui/material";

const MessageAbout = ({ campaignDetails, productDetails }) => {
  if (!campaignDetails) {
    return;
  }

  const { campaignMessage, hooks } = campaignDetails;

  let firstImageUrl = "";
  let firstInfo = "";

  // Check if productDetails array is not empty and it has elements
  if (productDetails.length > 0) {
    // Check if the first element has images and info
    if (productDetails[0].images.length > 0) {
      // Store the URL of the first image in the variable
      firstImageUrl = productDetails[0].images[0];
    }
    // Store the 'info' property of the first element in the variable
    firstInfo = productDetails[0].info;
  }
  //

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
          sx={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}
        >
          <Typography variant="h2">Messaging</Typography>
          <Box>
            <div className="parent">
              <div
                dangerouslySetInnerHTML={{
                  __html: campaignMessage,
                }}
              ></div>
            </div>
          </Box>
        </Box>
        <Box
          as="div"
          sx={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}
        >
          <Typography variant="h2">Hooks</Typography>

          <div className="parent">
            <div
              dangerouslySetInnerHTML={{
                __html: hooks,
              }}
            ></div>
          </div>
        </Box>
        <Box
          as="div"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1.2rem",
          }}
        >
          <Typography variant="h2">Product Info</Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "start",
              gap: "1.8rem",
            }}
          >
            <Image src={firstImageUrl} alt="infopic" width={400} height={400} />

            <Box
              as="div"
              sx={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}
            >
              <Typography variant="h2">Product Name</Typography>
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
              >
                <div className="parent">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: firstInfo,
                    }}
                  ></div>
                </div>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default MessageAbout;
