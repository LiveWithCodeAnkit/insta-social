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

const ViewCampaignCreator = ({ open, handleClose, imageSmallUrls }) => {
  const [bigImageIdx, setBigImageIdx] = useState(0);
  const [openBigImage, setOpenBigImage] = useState(false);
  const handleOpenBigImage = () => setOpenBigImage(true);
  const handleCloseBigImage = () => setOpenBigImage(false);

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
            {/* <Box sx={{ display: "flex", alignItems: "center" }}>
              <Avatar
                src="/images/dummy/profilephoto.png"
                sx={{ width: 35, height: 35 }}
              />
              <Typography variant="h6" sx={{ ml: 2, fontWeight: "bold" }}>
                neatandsocial
              </Typography>
            </Box> */}
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
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. John Doe, 1216 Broadway, Fl 2, New York, NY 10001 United
              States
            </Typography>
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
