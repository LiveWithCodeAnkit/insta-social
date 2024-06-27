import { Box, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";

const MessageAbout = ({ campaignDetails, productDetails }) => {
  if (
    !campaignDetails ||
    !campaignDetails.campaignMessage ||
    !campaignDetails.hooks
  ) {
    return null; // Return null if campaignDetails, campaignMessage, or hooks are not provided
  }

  const { campaignMessage, hooks, campaignConcept } = campaignDetails;

  const firstProduct = productDetails?.[0] || {};
  const firstImageUrl = firstProduct.images?.[0] || "";
  const firstInfo = firstProduct.info || "";
  const productName = firstProduct.name || "";
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
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1.2rem",
            width: "100%",
          }}
        >
          <Box as="div" sx={{ display: "flex", flexDirection: "column" }}>
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

          <Box as="div" sx={{ display: "flex", flexDirection: "column" }}>
            <Typography variant="h2">Hooks</Typography>

            <div className="parent">
              <div
                dangerouslySetInnerHTML={{
                  __html: hooks,
                }}
              ></div>
            </div>
          </Box>

          <Box as="div" sx={{ display: "flex", flexDirection: "column" }}>
            <Typography variant="h2">Concept</Typography>

            <div className="parent">
              <div
                dangerouslySetInnerHTML={{
                  __html: campaignConcept,
                }}
              ></div>
            </div>
          </Box>
        </Box>

        {productDetails && (
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
              <Image
                src={firstImageUrl}
                alt="infopic"
                width={400}
                height={400}
              />
              <Box
                as="div"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.2rem",
                }}
              >
                <Typography variant="h2">{productName}</Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1.5rem",
                  }}
                >
                  <div className="parent">
                    <div dangerouslySetInnerHTML={{ __html: firstInfo }}></div>
                  </div>
                </Box>
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </>
  );
};

export default MessageAbout;
