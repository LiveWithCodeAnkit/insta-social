import React from "react";
import Image from "next/image";
import { Box, Grid, Typography } from "@mui/material";
import { brandAboutData } from "../../../constants/creator";
import BriefDetails from "./BriefDetails";

const BrandAbout = ({ campaignCreatorData }) => {
  // console.log(campaignCreatorData, "campaignDetails into BrandAbout");

  const brandDetails = campaignCreatorData?.brandDetails || "";
  const campaignDetails = campaignCreatorData?.campaignDetails || "";

  console.log(brandDetails, "brandDetails into brandAbout");
  console.log(campaignDetails, "campaignDetails into brandAbout");
  const { info } = brandDetails;
  const extractContentBetweenTags = (htmlString, tagName) => {
    const regex = new RegExp(`<${tagName}>(.*?)<\/${tagName}>`, "g");
    const matches = htmlString?.match(regex);
    return matches
      ? matches.map((match) =>
          match.replace(`<${tagName}>`, "").replace(`</${tagName}>`, "")
        )
      : [];
  };

  const MessageParagraphs = extractContentBetweenTags(info, "p");

  return (
    <>
      <BriefDetails />
      <Box
        sx={{
          backgroundColor: "white",
          boxShadow: "0px 5px 30px 0px rgba(0, 0, 0, 0.1)",
          padding: "1.8rem",
          borderRadius: "1.8rem",
          display: "flex",
          justifyContent: "space-between",
          gap: "1.8rem",
          width: "100%",
        }}
      >
        <Grid container>
          <Grid item xs={4}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                // mt: "0",
                gap: "0.8rem",
              }}
            >
              <Box>
                <Typography variant="h3">Platform</Typography>
                <Box>
                  <p style={{ color: "#777777" }}>
                    {campaignDetails?.campaigningPlatform}
                  </p>
                </Box>
              </Box>

              <Box>
                <Typography variant="h3">Post</Typography>
                <Box>
                  <p style={{ color: "#777777" }}>
                    {campaignDetails?.postType?.[0]}
                  </p>
                </Box>
              </Box>

              <Box>
                <Typography variant="h3">Tags</Typography>
                <Box>
                  <p style={{ color: "#777777" }}>
                    {`#${campaignDetails?.tags?.[0] || ""}`}
                  </p>
                </Box>
              </Box>

              <Typography variant="subtitle1" sx={{ color: "#777777" }}>
                {/* {`#${campaignDetails?.tags[0]}`} */}
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={8}>
            <Box
              as="div"
              sx={{ display: "flex", flexDirection: "column", gap: "1.8rem" }}
            >
              <Typography variant="h2">{brandDetails.name}</Typography>
              <Box>
                <p
                  style={{
                    color: "#777777",
                    fontSize: "1rem",
                    lineHeight: "1.8rem",
                  }}
                >
                  {MessageParagraphs}
                </p>
              </Box>

              <Box
                as="div"
                sx={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "1.8rem",
                  "@media screen and (max-width: 768px)": {
                    gridTemplateColumns: "1fr",
                  },
                }}
              >
                <Box
                  as="div"
                  sx={{
                    padding: "1rem",
                    backgroundColor: "#FFF5D6",
                    borderRadius: "10px",
                  }}
                >
                  <label>Website : {brandDetails.website}</label>
                </Box>
                {brandDetails?.socialMediaLinks?.map((media, index) => {
                  return (
                    <Box
                      as="div"
                      key={index}
                      sx={{
                        padding: "1rem",
                        backgroundColor: "#FFF5D6",
                        borderRadius: "10px",
                        cursor: "pointer",
                      }}
                    >
                      <label>
                        {media.platForm} : {media.link}
                      </label>
                    </Box>
                  );
                })}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default BrandAbout;
