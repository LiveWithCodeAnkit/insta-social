import React from "react";
import { Avatar, Box, Grid, Modal, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Carousel from "react-grid-carousel";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Image from "next/image";
import { FaDownload } from "react-icons/fa";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: 500, md: 500, lg: 600 },
  // width: 800,
  bgcolor: "background.paper",
  // border: '2px solid #000',
  // boxShadow: 24,
  p: "30px",
  borderRadius: "50px",
};

const arrowLeft = () => {
  return (
    <Box
      sx={{
        display: "flex",
        height: 30,
        width: 30,
        background: "#FFCC33",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "50%",
        position: "absolute",
        top: "50%",
        left: 0,
        zIndex: 1,
      }}
    >
      <ArrowBackIcon fontSize="small" sx={{ fontWeight: "bold" }} />
    </Box>
  );
};
const arrowRight = () => {
  return (
    <Box
      sx={{
        display: "flex",
        height: 30,
        width: 30,
        background: "#FFCC33",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "50%",
        position: "absolute",
        top: "50%",
        right: 0,
        zIndex: 1,
      }}
    >
      <ArrowForwardIcon fontSize="small" sx={{ fontWeight: "bold" }} />
    </Box>
  );
};

const BigImageModal = ({ open, handleClose, imageSmallUrls, bigImageIdx }) => {
  return (
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
            justifyContent: "space-between",
            alignItems: "center",
            mb: "10px",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Avatar
              src="/images/dummy/profilephoto.png"
              sx={{ width: 40, height: 40 }}
            />
            <Typography variant="h6" sx={{ ml: 2, fontWeight: "bold" }}>
              neatandsocial
            </Typography>
          </Box>
          <CloseIcon sx={{ cursor: "pointer" }} onClick={handleClose} />
        </Box>
        <Carousel
          cols={1}
          rows={1}
          // gap={"10px"}
          mobileBreakpoint={450}
          containerStyle={{
            // maxWidth: "470px",
            // width: "100%",
            position: "relative",
          }}
          arrowLeft={arrowLeft}
          arrowRight={arrowRight}
        >
          {imageSmallUrls?.map((imageUrl, idx) => {
            return (
              <Carousel.Item key={idx}>
                <Box
                  key={idx}
                  sx={{
                    borderRadius: "20px",
                    overflow: "hidden",
                    position: "relative",
                    height:"400px",
                    // width:"200px",
                  }}
                >
                  <Image
                    src={imageUrl}
                    onClick={() => {
                      // setBigImageIdx(idx);
                      // onClickBigImage();
                    }}
                    alt=""
                    // height={400}
                    // width={400}
                    fill={true}
                  />
                 
                  <Avatar
                    sx={{
                      position: "absolute",
                      bottom: 15,
                      right: 15,
                      backgroundColor: "#FFCC33",
                      color: "#212121",
                      height: 30,
                      width: 30,
                      cursor: "pointer",
                    }}
                  >
                    <FaDownload fontSize="14px" />
                  </Avatar>
                </Box>
              </Carousel.Item>
            );
          })}
        </Carousel>
      </Box>
    </Modal>
  );
};

export default BigImageModal;
