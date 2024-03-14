import React, { useState } from "react";
import { Avatar, Box, Button, Grid, Modal, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { FaDownload } from "react-icons/fa";
import CloseIcon from "@mui/icons-material/Close";
import Carousel from "react-grid-carousel";
import Image from "next/image";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: 600, md: 900, lg: 1100 },
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
        top: "35%",
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
        top: "35%",
        right: 0,
        zIndex: 1,
      }}
    >
      <ArrowForwardIcon fontSize="small" sx={{ fontWeight: "bold" }} />
    </Box>
  );
};

const IssueBriefModal = ({ imageSmallUrls, open, handleClose }) => {
  const [bigImageIdx, setBigImageIdx] = useState(0);
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
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Avatar
              src="/images/dummy/profilephoto.png"
              sx={{ width: 35, height: 35 }}
            />
            <Typography variant="h6" sx={{ ml: 2, fontWeight: "bold" }}>
              neatandsocial
            </Typography>
          </Box>
          <CloseIcon sx={{ cursor: "pointer" }} onClick={handleClose} />
        </Box>
        <Grid container spacing={3} sx={{ mt: "1px" }}>
          <Grid item xs={5}>
            <Box sx={{ mb: 2 }}>
              <Image
                src={imageSmallUrls[bigImageIdx]}
                alt="image"
                width={400}
                height={400}
                layout="responsive"
              />
            </Box>

            <Carousel
              cols={4}
              rows={1}
              gap={"10px"}
              mobileBreakpoint={450}
              containerStyle={{
                maxWidth: "470px",
                position: "relative",
              }}
              arrowLeft={arrowLeft}
              arrowRight={arrowRight}
            >
              {imageSmallUrls.map((imageUrl, idx) => {
                return (
                  <Carousel.Item key={idx}>
                    <Box
                      key={idx}
                      sx={{
                        border:
                          idx === bigImageIdx ? "3px solid #FFCC33" : "none",
                        borderRadius: "20px",
                        "&:hover": {
                          border: idx !== bigImageIdx && "1px solid #FFCC33",
                        },
                        display: "flex",
                      }}
                    >
                      <Image
                        src={imageUrl}
                        onClick={() => {
                          setBigImageIdx(idx);
                          // onClickBigImage();
                        }}
                        alt=""
                        height={100}
                        width={100}
                        layout="responsive"
                      />
                    </Box>
                  </Carousel.Item>
                );
              })}
            </Carousel>

            <Button
              variant="contained"
              type="button"
              startIcon={<FaDownload />}
              // size="large"
              sx={{
                background: "#FFCC33",
                color: "#212121",
                height: "40px",
                width: "160px",
                borderRadius: "8px",
                fontSize: "14px",
                fontWeight: 600,
                textTransform: "none",
                boxShadow: "none",
                mt: "30px",
              }}
            >
              Download All
            </Button>
          </Grid>
          <Grid item xs={7}>
            <Box sx={{ maxWidth: "400px" }}>
              <Typography variant="h4">Product Issue</Typography>
              <Typography
                variant="subtitle2"
                sx={{ color: "#777777", mt: "15px" }}
              >
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </Typography>
              <Typography variant="subtitle2" sx={{ mt: "20px" }}>
                John Doe, 1216 Broadway, Fl 2, New York, NY 10001 United States
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mt: "20px",
                }}
              >
                <Button
                  variant="outlined"
                  type="button"
                  size="large"
                  sx={{
                    border: "1px solid #212121",
                    color: "#212121",
                    // height: "40px",
                    // width: "168px",
                    borderRadius: "50px",
                    fontSize: "14px",
                    fontWeight: 500,
                    textTransform: "none",
                  }}
                >
                  Message Creator
                </Button>
                <Button
                  variant="contained"
                  type="button"
                  size="large"
                  sx={{
                    background: "#FFCC33",
                    color: "#212121",
                    // height: "40px",
                    // width: "72px",
                    borderRadius: "50px",
                    fontSize: "14px",
                    fontWeight: 500,
                    textTransform: "none",
                    boxShadow: "none",
                  }}
                >
                  Reship
                </Button>
                <Button
                  variant="outlined"
                  type="button"
                  size="large"
                  sx={{
                    "&:hover": {
                      backgroundColor: "info.lighter",
                    },
                    border: "none !important",
                    color: "#00B2F7",
                    // height: "40px",
                    // width: "105px",
                    borderRadius: "50px",
                    fontSize: "14px",
                    fontWeight: 500,
                    textTransform: "none",
                  }}
                >
                  Close
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default IssueBriefModal;
