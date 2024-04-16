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
import BigImageModal from "./BigImageModal";

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

const ViewCampaignBriefModal = ({
  open,
  handleClose,
  completeModel,
  page,
  rowsPerPage,
  campaignId,
}) => {
  const [bigImageIdx, setBigImageIdx] = useState(0);
  const [openBigImage, setOpenBigImage] = useState(false);
  const handleOpenBigImage = () => setOpenBigImage(true);
  const handleCloseBigImage = () => setOpenBigImage(false);
  // console.log(completeModel,"completeModel");

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
              <Box
                sx={{
                  mb: 2,
                  borderRadius: "20px",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <Image
                  src={completeModel?.uploadedContent?.[bigImageIdx]?.content}
                  alt="image"
                  width={400}
                  height={400}
                  layout="responsive"
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
                <Box
                  onClick={handleOpenBigImage}
                  sx={{
                    position: "absolute",
                    top: 15,
                    right: 15,
                    backgroundColor: "#FFCC33",
                    color: "#212121",
                    height: 35,
                    width: 35,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "10px",
                  }}
                >
                  <CgMaximize fontSize="22px" />
                </Box>
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
                {completeModel?.uploadedContent?.map((imageUrl, idx) => {
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
                          overflow: "hidden",
                        }}
                      >
                        <Image
                          src={imageUrl?.content}
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
            </Grid>
            <Grid item xs={7}>
              <Box>
                <Typography variant="h4">Classic Pack</Typography>
                <Typography
                  variant="subtitle2"
                  sx={{ color: "#777777", mt: "20px" }}
                >
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, It is a long
                  established fact that a reader will be
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mt: "20px",
                    cursor: "pointer",
                  }}
                >
                  <Image
                    src={"/images/instagram_icon.png"}
                    alt="instagram icon"
                    width={20}
                    height={20}
                  />
                  <Typography variant="h5" sx={{ mx: "5px" }}>
                    Instagram
                  </Typography>
                  <LaunchIcon sx={{ color: "#00B2F7" }} />
                </Box>
                <Box
                  sx={{
                    mt: "30px",
                    borderTop: "1px solid #D9D9D9",
                    borderBottom: "1px solid #D9D9D9",
                    p: "15px 0",
                    width: "85%",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box>
                      <FavoriteIcon color="error" />
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Typography variant="h4" sx={{ lineHeight: "28px" }}>
                          300
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          sx={{
                            ml: "5px",
                            color: "#777777",
                            lineHeight: "28px",
                          }}
                        >
                          Like
                        </Typography>
                      </Box>
                    </Box>
                    <Divider
                      orientation="vertical"
                      flexItem
                      sx={{ height: "55px" }}
                    />
                    <Box>
                      <FaEye color="#5ADA5F" fontSize={"20px"} />
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Typography variant="h4" sx={{ lineHeight: "28px" }}>
                          3210
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          sx={{
                            ml: "5px",
                            color: "#777777",
                            lineHeight: "28px",
                          }}
                        >
                          View
                        </Typography>
                      </Box>
                    </Box>
                    <Divider
                      orientation="vertical"
                      flexItem
                      sx={{ height: "55px" }}
                    />
                    <Box>
                      <FaComment color="#00B2F7" fontSize={"20px"} />
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Typography variant="h4" sx={{ lineHeight: "28px" }}>
                          56
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          sx={{
                            ml: "5px",
                            color: "#777777",
                            lineHeight: "28px",
                          }}
                        >
                          Comment
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
          <Box
            sx={{
              mt: "20px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Button
                variant="outlined"
                type="button"
                startIcon={<FavoriteIcon />}
                sx={{
                  "&:hover": {
                    border: "1px solid #F00E0E",
                    backgroundColor: "#eabdbd",
                  },
                  border: "1px solid #F00E0E",
                  color: "#F00E0E",
                  height: "40px",
                  width: "100px",
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontWeight: 600,
                }}
              >
                Like
              </Button>
              <Button
                variant="contained"
                type="button"
                startIcon={<FaDownload />}
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
                  ml: "15px",
                }}
              >
                Download All
              </Button>
            </Box>
            <Box>
              <Button
                variant="outlined"
                type="button"
                size="large"
                sx={{
                  // background: "#FFCC33",
                  border: "1px solid #212121",
                  color: "#212121",
                  // height: "40px",
                  // width: "178px",
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontWeight: 600,
                  textTransform: "none",
                  boxShadow: "none",
                  ml: "15px",
                }}
              >
                Request Whitelist
              </Button>
              <Button
                variant="contained"
                type="button"
                size="large"
                sx={{
                  background: "#FFCC33",
                  color: "#212121",
                  // height: "40px",
                  // width: "178px",
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontWeight: 600,
                  textTransform: "none",
                  boxShadow: "none",
                  ml: "15px",
                }}
              >
                Message Creator
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>

      <BigImageModal
        open={openBigImage}
        handleClose={handleCloseBigImage}
        imageSmallUrls={completeModel?.campaignId?.campaignDetails?.moodBoardDocs?.contents}
        bigImageIdx
      />
    </Box>
  );
};

export default ViewCampaignBriefModal;
