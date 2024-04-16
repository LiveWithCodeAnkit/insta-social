import React from "react";
import Image from "next/image";
import { Box, Typography } from "@mui/material";
const BrandAbout = ({ brandDeatils }) => {
  if (!brandDeatils) {
    return <div>No  details available</div>;
  }

  const { name, website, socialMediaLinks, info, logo } = brandDeatils;

  // Extract list items from <ul> content

  const instagramLinkObj = socialMediaLinks.find(
    (link) => link.platForm.toLowerCase() === "instagram"
  );
  const instagramLink = instagramLinkObj
    ? instagramLinkObj.link
    : "Not available";
  return (
    <>
      <Box
        sx={{
          backgroundColor: "white",
          boxShadow: "0px 5px 30px 0px rgba(0, 0, 0, 0.1)",
          padding: "1.8rem",
          borderRadius: "1.8rem",
          display: "flex",
          justifyContent: "start",
          gap: "1.8rem",
          minWidth: "100%",
        }}
      >
        <Image src={logo} alt="infopic" width={400} height={400} />

        <Box
          as="div"
          sx={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}
        >
          <Typography variant="h2">{name}</Typography>
          <Box>
            <div className="parent">
              <div
                dangerouslySetInnerHTML={{
                  __html: info,
                }}
              ></div>
            </div>
          </Box>

          <Box
            as="div"
            sx={{
              display: "flex",
              gap: "1.8rem",
              flexWrap: "wrap",
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
              <label>{`Website : ${website}`}</label>
            </Box>
            <Box
              as="div"
              sx={{
                padding: "1rem",
                backgroundColor: "#FFF5D6",
                borderRadius: "10px",
              }}
            >
              <label>Instagram : {instagramLink}</label>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default BrandAbout;
