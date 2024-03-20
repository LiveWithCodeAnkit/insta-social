import React from "react";
import Image from "next/image";
import { Box, Typography } from "@mui/material";
const BrandAbout = ({ brandDeatils }) => {
  if (!brandDeatils) {
    return <div>No brand details available</div>;
  }

  const { name, website, socialMediaLinks, info } = brandDeatils;

  const extractContentBetweenTags = (htmlString, tagName) => {
    const regex = new RegExp(`<${tagName}>(.*?)<\/${tagName}>`, "g");
    const matches = htmlString.match(regex);
    return matches
      ? matches.map((match) =>
          match.replace(`<${tagName}>`, "").replace(`</${tagName}>`, "")
        )
      : [];
  };
  const paragraphs = extractContentBetweenTags(info, "p");

  const ulContentMatch = info.match(/<ul>(.*?)<\/ul>/s);
  const ulContent = ulContentMatch ? ulContentMatch[1] : "";

  // Extract list items from <ul> content
  const listItems = ulContent ? ulContent.match(/<li>(.*?)<\/li>/gs) : [];

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
        <Image
          src={"/images/reviewone.png"}
          alt="infopic"
          width={400}
          height={400}
        />

        <Box
          as="div"
          sx={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}
        >
          <Typography variant="h2">{name}</Typography>
          <Box>
            {paragraphs.map((paragraph, index) => (
              <p key={`paragraph-${index}`} style={{ color: "#777777" }}>
                {paragraph}
              </p>
            ))}

            {listItems && listItems.length > 0 && (
              <ul
                style={{
                  padding: "1.5rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.8rem",
                }}
              >
                {listItems.map((item, index) => (
                  <li key={`list-item-${index}`} style={{ color: "#777777" }}>
                    {item.replace(/<\/?li>/g, "")}
                  </li>
                ))}
              </ul>
            )}
          </Box>

          <Box
            as="div"
            sx={{
              display: "flex",
              gap: "1.8rem",
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
