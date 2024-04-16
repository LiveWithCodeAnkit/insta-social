import React from "react";
import { Box, Typography } from "@mui/material";

const DoPage = ({ campaignCreatorData }) => {
  const campaignDetails = campaignCreatorData?.campaignDetails || "";
  // console.log(campaignDetails, "campaignDetails into doPage");

  return (
    <>
      <Box
        as="div"
        sx={{
          display: "flex",
          width: "100%",
          gap: "1.8rem",
        }}
      >
        <Box
          sx={{
            backgroundColor: "white",
            boxShadow: "0px 5px 30px 0px rgba(0, 0, 0, 0.1)",
            borderRadius: "1.8rem",
            gap: "1.8rem",
            padding: "1.8rem",
            width: "100%",
          }}
        >
          <Box
            as="div"
            sx={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}
          >
            <Typography variant="h2">Do</Typography>

            <div className="parent">
              <div
                dangerouslySetInnerHTML={{ __html: campaignDetails?.doThings }}
              ></div>
            </div>
          </Box>
        </Box>

        <Box
          sx={{
            backgroundColor: "white",
            boxShadow: "0px 5px 30px 0px rgba(0, 0, 0, 0.1)",
            borderRadius: "1.8rem",
            gap: "1.8rem",
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
                  __html: campaignDetails?.doNotThings,
                }}
              ></div>
            </div>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default DoPage;
