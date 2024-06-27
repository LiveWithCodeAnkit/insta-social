import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Avatar, Box, Button, Divider, Modal, Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import LaunchIcon from "@mui/icons-material/Launch";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CloseIcon from "@mui/icons-material/Close";
import Carousel from "react-grid-carousel";
import { useDispatch } from "react-redux";
import {
  campaignApproveReject,
  contentIsFavoritebyBrand,
  getCampaignRequest,
  getStatisticsByCreator,
} from "../../../../../store/campaign_request/campaignRequest.slice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
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

const HandleBriefModal = ({
  imageSmallUrls,
  open,
  handleClose,
  data,
  campaignId,
  page,
  rowsPerPage,
  fetchCampaignStatistics,
  getCampaignRequestList,
}) => {
  console.log(data, "data in >>");
  const dispatch = useDispatch();
  const [favoriteStatus, setFavoriteStatus] = useState(
    data?.favorites || false
  );

  useEffect(() => {
    console.log(data?.favorites,"data?.favorites");
    setFavoriteStatus(data?.favorites || false);
    // return () => {
    //   setFavoriteStatus(false);
    // };
  }, [data]);

  const isFavoriteHandler = (e) => {
    e.stopPropagation();
    dispatch(
      contentIsFavoritebyBrand({
        campaignRequestId: data.id,
        isFavorite: !favoriteStatus,
      })
    ).then(() => {
      getCampaignRequestList();
      setFavoriteStatus((prev) => !prev);
    });
  };

  const approveRejectHandler = (status, e) => {
    e.stopPropagation();
    dispatch(
      campaignApproveReject({
        campaignId,
        campaignRequestIds: [data.id],
        status,
      })
    ).then(() => {
      dispatch(
        getCampaignRequest({
          campaignId: campaignId,
          requestStatus: ["Request_Approved"],
          page: page + 1,
          pageSize: rowsPerPage,
        })
      );
      fetchCampaignStatistics();
      handleClose();
    });
  };

  return (
    <Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <CloseIcon sx={{ cursor: "pointer" }} onClick={handleClose} />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box>
              <Avatar src={""} sx={{ width: 150, height: 150, mb: "5px" }} />
            </Box>
            <Typography id="modal-modal-title" variant="h4">
              {data.handle}
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mt: "15px",
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
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                mt: "15px",
                mb: "22px",
                width: "430px",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography variant="h4">30K</Typography>
                <Typography
                  variant="subtitle1"
                  sx={{ ml: "5px", color: "#777777" }}
                >
                  Followers
                </Typography>
              </Box>
              <Divider
                orientation="vertical"
                flexItem
                sx={{ height: "55px" }}
              />
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography variant="h4">16K</Typography>
                <Typography
                  variant="subtitle1"
                  sx={{ ml: "5px", color: "#777777" }}
                >
                  Following
                </Typography>
              </Box>
            </Box>

            <Carousel
              cols={4}
              rows={1}
              gap={"10px"}
              mobileBreakpoint={450}
              containerStyle={{
                width: "470px",
                position: "relative",
              }}
              arrowLeft={arrowLeft}
              arrowRight={arrowRight}
            >
              {imageSmallUrls.map((imageUrl, idx) => {
                return (
                  <Carousel.Item key={idx}>
                    <div key={idx} className="">
                      <Image
                        src={imageUrl}
                        onClick={() => {
                          // setBigImageIdx(idx);
                          // onClickBigImage();
                        }}
                        alt=""
                        height={100}
                        width={100}
                        layout="responsive"
                      />
                    </div>
                  </Carousel.Item>
                );
              })}
            </Carousel>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                mt: "20px",
                width: "430px",
              }}
            >
              <Button
                variant="outlined"
                type="button"
                startIcon={<StarIcon />}
                onClick={isFavoriteHandler}
                sx={{
                  border: favoriteStatus ? "none" : "1px solid #212121",
                  color: favoriteStatus ? "#fff" : "#212121",
                  backgroundColor: favoriteStatus ? "#FFCC33" : "#fff",
                  ":hover": {
                    background: favoriteStatus && "#fcbf09",
                  },
                  // height: "40px",
                  // width: "118px",
                  borderRadius: "50px",
                  fontSize: "14px",
                  fontWeight: 500,
                  textTransform: "none",
                }}
              >
                Favorite
              </Button>
              <Button
                variant="contained"
                type="button"
                onClick={(e) => approveRejectHandler("approve", e)}
                sx={{
                  "&:hover": { background: "#FFCC33" },
                  background: "#FFCC33",
                  color: "#212121",
                  // height: "40px",
                  width: "105px",
                  borderRadius: "50px",
                  fontSize: "14px",
                  fontWeight: 500,
                  textTransform: "none",
                  boxShadow: "none",
                }}
              >
                Approve
              </Button>
              <Button
                variant="outlined"
                type="button"
                onClick={(e) => approveRejectHandler("reject", e)}
                sx={{
                  "&:hover": {
                    borderColor: "info.main",
                    backgroundColor: "info.lighter",
                  },
                  border: "none",
                  color: "#00B2F7",
                  // height: "40px",
                  width: "105px",
                  borderRadius: "50px",
                  fontSize: "14px",
                  fontWeight: 500,
                  textTransform: "none",
                }}
              >
                Reject
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default HandleBriefModal;
