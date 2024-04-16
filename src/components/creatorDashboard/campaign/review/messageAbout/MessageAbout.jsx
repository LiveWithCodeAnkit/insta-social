import React from "react";
import Image from "next/image";
import { Box, Typography } from "@mui/material";
const MessageAbout = ({ campaignCreatorData }) => {
  const campaignDetails = campaignCreatorData?.campaignDetails || "";
  const productDetails = campaignCreatorData?.productDetails || "";

  // console.log(campaignDetails, "messageAbout");
  // console.log(productDetails, "productDetails into messageAbout");

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
            marginBottom: "1rem",
          }}
        >
          <Typography variant="h2">Messaging</Typography>
          <Box>
            <div className="parent">
              <div
                dangerouslySetInnerHTML={{
                  __html: campaignDetails?.campaignMessage,
                }}
              ></div>
            </div>
          </Box>
        </Box>
        <Box
          as="div"
          sx={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
        >
          <Typography variant="h2">Hooks</Typography>

          <Box>
            <div className="parent">
              <div
                dangerouslySetInnerHTML={{ __html: campaignDetails?.hooks }}
              ></div>
            </div>
          </Box>
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
          <Box sx={{ display: "grid", gap: "1.8rem" }}>
            {productDetails &&
              productDetails?.map((product, index) => (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "",
                    gap: "1.8rem",
                  }}
                >
                  {product?.images?.map((productImage, index) => (
                    <Image
                      src={`${productImage}`}
                      alt={`Image ${index}`}
                      width={300}
                      height={300}
                    />
                  ))}

                  <Box
                    as="div"
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "1.2rem",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "1.5rem",
                      }}
                    >
                      <div className="parent">
                        <div
                          dangerouslySetInnerHTML={{ __html: product?.info }}
                        ></div>
                      </div>
                    </Box>
                  </Box>
                </Box>
              ))}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default MessageAbout;
