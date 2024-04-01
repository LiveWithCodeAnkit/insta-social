import Image from "next/image";
import React from "react";
import { Avatar, Box, Button, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";

const CampaignCard = ({ item, onCardClickHandler }) => {
  // console.log(item, "CamapignCarditem");

  const campaignCardDetails = item?.campaignId?.campaignDetails || "";

  // console.log("campaignCardDetails", campaignCardDetails);

  const extractContentBetweenTags = (htmlString, tagName) => {
    const regex = new RegExp(`<${tagName}>(.*?)<\/${tagName}>`, "g");
    const matches = htmlString?.match(regex);
    return matches
      ? matches.map((match) =>
          match.replace(`<${tagName}>`, "").replace(`</${tagName}>`, "")
        )
      : [];
  };

  const MessageParagraphs = extractContentBetweenTags(
    campaignCardDetails.campaignMessage,
    "p"
  );

  return (
    <Box>
      <Box
        onClick={() => onCardClickHandler(item?.campaignId?._id)}
        sx={{
          p: "10px 15px 15px 15px",
          backgroundColor: "#F2F6FC",
          borderRadius: "15px",
          cursor: "pointer",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Avatar
              alt="Remy Sharp"
              src={item.profilephoto}
              sx={{ width: "30px", height: "30px", mr: "10px" }}
            />
            <Typography variant="subtitle1">
              {campaignCardDetails.campaignName}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            borderRadius: "15px",
            my: "10px",
            // height: "200px",
            // width: "300px",
          }}
        >
          <Image
            src={item.contentPhoto}
            alt=""
            layout="responsive"
            width={330}
            height={330}
            // fill={true}
          />
        </Box>
        <Typography variant="body1">{MessageParagraphs}</Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            mt: "10px",
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "30px",
              width: "190px",
              backgroundColor: "#5ADA5F",
              borderRadius: "8px",
            }}
          >
            <Typography variant="body1">
              {item?.requestStatus === "Awaiting_Content_Approval"
                ? "Awaiting Content Approval"
                : item?.requestStatus === "Content_Approved"
                ? "Content Approved"
                : item?.requestStatus === "Content_Rejected"
                ? "Content Rejected"
                : item?.requestStatus === "Issue"
                ? "Issue"
                : item?.requestStatus === "Awaiting_Shipment"
                ? "Awaiting Shipment"
                : item?.requestStatus === "Awaiting_Content"
                ? "Awaiting Content"
                : item?.requestStatus === "Past_Deadline"
                ? "Past Deadline"
                : "Completed"}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CampaignCard;
