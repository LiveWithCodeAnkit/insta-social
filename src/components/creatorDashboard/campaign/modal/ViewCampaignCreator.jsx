import Image from "next/image";
import React, { useState } from "react";
import Carousel from "react-grid-carousel";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  Modal,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CloseIcon from "@mui/icons-material/Close";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LaunchIcon from "@mui/icons-material/Launch";
import { FaDownload } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { FaComment } from "react-icons/fa";
import { CgMaximize } from "react-icons/cg";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: { xs: 400, md: 600, lg: 600 },
  bgcolor: "background.paper",
  // border: '2px solid #000',
  // boxShadow: 24,
  p: "30px",
  borderRadius: "50px",
};

const ViewCampaignCreator = ({
  open,
  handleClose,
  imageSmallUrls,
  campaignData,
}) => {
  const [bigImageIdx, setBigImageIdx] = useState(0);
  const [openBigImage, setOpenBigImage] = useState(false);
  const handleOpenBigImage = () => setOpenBigImage(true);
  const handleCloseBigImage = () => setOpenBigImage(false);

  // console.log(campaignData, "campaignData");

  const campaignModalDetails = campaignData?.campaignId?.campaignDetails || "";

  // console.log(campaignModalDetails, "campaignModalDetails");

  const extractContentBetweenTags = (htmlString, tagName) => {
    const regex = new RegExp(`<${tagName}>(.*?)<\/${tagName}>`, "g");
    const matches = htmlString?.match(regex);
    return matches
      ? matches.map((match) =>
          match.replace(`<${tagName}>`, "").replace(`</${tagName}>`, "")
        )
      : [];
  };
  const { campaignMessage } = campaignModalDetails;

  const MessageParagraphs = extractContentBetweenTags(campaignMessage, "p");

  // Extract list items from campaignMessage
  const ulContentMatch = campaignMessage?.match(/<ul>(.*?)<\/ul>/s);
  const ulMessageContent = ulContentMatch ? ulContentMatch[1] : "";
  const listItemsOfMessage = ulMessageContent
    ? ulMessageContent.match(/<li>(.*?)<\/li>/gs)
    : [];

  return (
    <Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <CloseIcon sx={{ cursor: "pointer" }} onClick={handleClose} />
          </Box>
          <Box>
            <Box
              sx={{
                mb: 2,
                borderRadius: "20px",
                position: "relative",
                overflow: "hidden",
                height: "500px",
                width: "500px",
              }}
            >
              <Image
                src={imageSmallUrls[bigImageIdx]}
                alt="image"
                // width={500}
                // height={500}
                fill={true}
              />
            </Box>
            <Typography
              sx={{
                color: "#777777",
                fontWeight: "fontWeightRegular",
                fontSize: "16px",
                width: "500px",
              }}
            >
              {MessageParagraphs}
            </Typography>

            {listItemsOfMessage && listItemsOfMessage?.length > 0 && (
              <ul
                style={{
                  padding: "1.5rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.8rem",
                }}
              >
                {listItemsOfMessage?.map((item, index) => (
                  <li key={`list-item-${index}`} style={{ color: "#777777" }}>
                    {item.replace(/<\/?li>/g, "")}
                  </li>
                ))}
              </ul>
            )}
          </Box>
          <Box
            sx={{
              mt: "20px",
              // display: "flex",
              // justifyContent: "center",
            }}
          >
            <Box>
              <Button
                variant="contained"
                type="button"
                sx={{
                  background: "#FFCC33",
                  color: "#212121",
                  height: "50px",
                  width: "194px",
                  borderRadius: "50px",
                  fontSize: "16px",
                  fontWeight: 600,
                  textTransform: "none",
                  boxShadow: "none",
                  ml: "15px",
                }}
              >
                Message Brand
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default ViewCampaignCreator;
