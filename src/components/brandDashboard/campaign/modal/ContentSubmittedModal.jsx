import Image from "next/image";
import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CloseIcon from "@mui/icons-material/Close";
import LaunchIcon from "@mui/icons-material/Launch";
import { FaDownload } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { FaComment } from "react-icons/fa";
import { CgMaximize } from "react-icons/cg";
import Carousel from "react-grid-carousel";
import FeedbackFormModal from "./FeedbackFormModal";
import CustomTextField from "@/components/common/text-field";
import { contentApprovebyBrand, getUploadedContent } from "../../../../../store/campaign_request/campaignRequest.slice";
import { useDispatch } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: 450, md: 900, lg: 1000 },
  maxHeight: "100vh",
  overflow: "auto",
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
        cursor: "pointer",
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
        cursor: "pointer",
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

const initialValues = {
  feedback: "",
};

const ContentSubmittedModal = ({
  imageSmallUrls,
  open,
  handleClose,
  infoModel,
  page,
  rowsPerPage,
  campaignId
}) => {
  const dispatch = useDispatch();
  const [bigImageIdx, setBigImageIdx] = useState(0);
  const [openFeedback, setOpenFeedback] = useState(false);
  // const handleOpenFeedback = () => setOpenFeedback(true);

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initialValues,
    mode: "onChange",
    // resolver: yupResolver(schema),
  });

  const handleFeedback = async (values) => {
    setOpenFeedback(true);
    const { feedback } = values;
    if (openFeedback) {
      handleApproveOrNot("REJECTED", feedback);
    }
  };

  const handleApproveOrNot = async (statusInfo, rejectMessage = "") => {
    const payload = {
      contentId: infoModel,
      status: statusInfo,
      rejectMessage: rejectMessage,
    };
    dispatch(contentApprovebyBrand(payload)).then(() => {
      handleClose()
      dispatch(
        getUploadedContent({
          campaignId: campaignId,
          requestStatus: ["APPROVED", "REJECTED", "PENDING"],
          page: page + 1,
          pageSize: rowsPerPage,
        })
      );
    })
  };

  //end of ank date 29 march

  const handleOpenFeedback = () => {
    setOpenFeedback((prevState) => !prevState);
  };

  const handleCloseFeedback = () => {
    setOpenFeedback(false);
    handleClose();
  };

  // const handleDeclineWithFeedback = (feedback) => {
  //   handleOpenFeedback();
  //   if (openFeedback) {
  //     handleApproveOrNot("REJECTED", feedback);
  //   }
  // };

  return (
    <Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <form onSubmit={handleSubmit(handleFeedback)}>
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
            <Grid
              container
              spacing={3}
              sx={{
                mt: "1px",
                px: { xl: "50px", lg: "30px", md: "20px", xs: "10px" },
              }}
            >
              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    mb: 2,
                    borderRadius: "20px",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <Image
                    src={imageSmallUrls[bigImageIdx]}
                    alt="image"
                    width={400}
                    height={400}
                    layout="responsive"
                  />
                  <Avatar
                    sx={{
                      position: "absolute",
                      bottom: 10,
                      right: 10,
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
                              idx === bigImageIdx
                                ? "3px solid #FFCC33"
                                : "none",
                            borderRadius: "20px",
                            "&:hover": {
                              border:
                                idx !== bigImageIdx && "1px solid #FFCC33",
                            },
                            display: "flex",
                            overflow: "hidden",
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
              </Grid>
              <Grid item xs={12} md={6}>
                <Box>
                  <Typography variant="h3">Classic Pack</Typography>
                  <TextField
                    id="outlined-multiline-flexible"
                    //   label="Multiline"
                    fullWidth
                    multiline
                    rows={4}
                    value={
                      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. "
                    }
                    disabled
                  />
                  <Box sx={{ my: "20px" }}>
                    <Grid container spacing={4}>
                      <Grid item xs={6}>
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
                            width: "100%",
                            borderRadius: "8px",
                            fontSize: "14px",
                            fontWeight: 600,
                          }}
                        >
                          Like
                        </Button>
                      </Grid>
                      <Grid item xs={6}>
                        <Button
                          variant="contained"
                          type="button"
                          startIcon={<FaDownload />}
                          sx={{
                            background: "#FFCC33",
                            color: "#212121",
                            height: "40px",
                            width: "100%",
                            borderRadius: "8px",
                            fontSize: "14px",
                            fontWeight: 600,
                            textTransform: "none",
                            boxShadow: "none",
                          }}
                        >
                          Download All
                        </Button>
                      </Grid>
                    </Grid>
                  </Box>

                  {/* <Box sx={{ display: "flex", gap: "10px", alignItems:"center" }}> */}
                  <Button
                    variant="contained"
                    type="button"
                    sx={{
                      background: "#FFCC33",
                      color: "#212121",
                      height: "40px",
                      width: "100%",
                      borderRadius: "50px",
                      fontSize: "14px",
                      fontWeight: 600,
                      textTransform: "none",
                      boxShadow: "none",
                      my: "10px",
                    }}
                    onClick={() => {
                      handleApproveOrNot("APPROVED");
                    }}
                  >
                    Approve
                  </Button>
                  <Typography variant="subtitle1" sx={{ textAlign: "center" }}>
                    Or
                  </Typography>
                  {openFeedback && (
                    <Controller
                      name="feedback"
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <CustomTextField
                          fullWidth
                          multiline
                          rows={4}
                          value={value}
                          // label="Brand Name"
                          onChange={onChange}
                          // placeholder="Brand Name"
                          // error={Boolean(errors.feedback)}
                          // {...(errors.feedback && {
                          //   helperText: errors.feedback.message,
                          // })}
                        />
                      )}
                    />
                  )}
                  <Button
                    variant="outlined"
                    type="submit"
                    sx={{
                      border: "1px solid #212121",
                      color: "#212121",
                      height: "40px",
                      width: "100%",
                      borderRadius: "50px",
                      fontSize: "14px",
                      fontWeight: 600,
                      textTransform: "none",
                      mt: "10px",
                    }}
                  >
                    Decline With Feedback
                  </Button>
                  {/* </Box> */}
                </Box>
              </Grid>
            </Grid>
          </Box>
        </form>
      </Modal>
    </Box>

    // <Box>
    //   <Modal
    //     open={open}
    //     onClose={handleClose}
    //     aria-labelledby="modal-modal-title"
    //     aria-describedby="modal-modal-description"
    //   >
    //     <Box sx={style}>
    //       <Box
    //         sx={{
    //           display: "flex",
    //           justifyContent: "space-between",
    //           alignItems: "center",
    //         }}
    //       >
    //         <Box sx={{ display: "flex", alignItems: "center" }}>
    //           <Avatar
    //             src="/images/dummy/profilephoto.png"
    //             sx={{ width: 35, height: 35 }}
    //           />
    //           <Typography variant="h6" sx={{ ml: 2, fontWeight: "bold" }}>
    //             neatandsocial
    //           </Typography>
    //         </Box>
    //         <CloseIcon sx={{ cursor: "pointer" }} onClick={handleClose} />
    //       </Box>
    //       <Box
    //         sx={{
    //           display: "flex",
    //           justifyContent: "center",
    //           alignItems: "center",
    //           flexDirection: "column",
    //           mt: "20px",
    //         }}
    //       >
    //         <Box
    //           sx={{
    //             mb: 2,
    //             borderRadius: "20px",
    //             position: "relative",
    //             overflow: "hidden",
    //           }}
    //         >
    //           <Image
    //             src={imageSmallUrls[bigImageIdx]}
    //             alt="image"
    //             width={450}
    //             height={450}
    //             // layout={{md:"responsive",lg:""}}
    //           />
    //           <Avatar
    //             sx={{
    //               position: "absolute",
    //               bottom: 10,
    //               right: 10,
    //               backgroundColor: "#FFCC33",
    //               color: "#212121",
    //               height: 30,
    //               width: 30,
    //               cursor: "pointer",
    //             }}
    //           >
    //             <FaDownload fontSize="14px" />
    //           </Avatar>
    //         </Box>

    //         <Carousel
    //           cols={4}
    //           rows={1}
    //           gap={"20px"}
    //           mobileBreakpoint={450}
    //           containerStyle={{
    //             maxWidth: "470px",
    //             position: "relative",
    //           }}
    //           arrowLeft={arrowLeft}
    //           arrowRight={arrowRight}
    //         >
    //           {imageSmallUrls.map((imageUrl, idx) => {
    //             return (
    //               <Carousel.Item key={idx}>
    //                 <Box
    //                   key={idx}
    //                   sx={{
    //                     border: idx === bigImageIdx && "3px solid #FFCC33",
    //                     borderRadius: "20px",
    //                     "&:hover": {
    //                       border: idx !== bigImageIdx && "1px solid #FFCC33",
    //                     },
    //                     display: "flex",
    //                     overflow: "hidden",
    //                   }}
    //                 >
    //                   <Image
    //                     src={imageUrl}
    //                     onClick={() => {
    //                       setBigImageIdx(idx);
    //                       // onClickBigImage();
    //                     }}
    //                     alt=""
    //                     height={100}
    //                     width={100}
    //                     layout="responsive"
    //                   />
    //                 </Box>
    //               </Carousel.Item>
    //             );
    //           })}
    //         </Carousel>

    //         <Box sx={{ width: "450px", mt: "10px" }}>
    //           <Typography variant="h3">Classic Pack</Typography>
    //           <TextField
    //             id="outlined-multiline-flexible"
    //             //   label="Multiline"
    //             fullWidth
    //             multiline
    //             rows={4}
    //             value={
    //               "Lorem Ipsum is simply dummy text of the printing and typesetting industry. "
    //             }
    //             disabled
    //           />
    //           <Box sx={{ my: "20px" }}>
    //             <Grid container spacing={4}>
    //               <Grid item xs={6}>
    //                 <Button
    //                   variant="outlined"
    //                   type="button"
    //                   startIcon={<FavoriteIcon />}
    //                   sx={{
    //                     "&:hover": {
    //                       border: "1px solid #F00E0E",
    //                       backgroundColor: "#eabdbd",
    //                     },
    //                     border: "1px solid #F00E0E",
    //                     color: "#F00E0E",
    //                     height: "40px",
    //                     width: "100%",
    //                     borderRadius: "8px",
    //                     fontSize: "16px",
    //                     fontWeight: 600,
    //                   }}
    //                 >
    //                   Like
    //                 </Button>
    //               </Grid>
    //               <Grid item xs={6}>
    //                 <Button
    //                   variant="contained"
    //                   type="button"
    //                   startIcon={<FaDownload />}
    //                   sx={{
    //                     background: "#FFCC33",
    //                     color: "#212121",
    //                     height: "40px",
    //                     width: "100%",
    //                     borderRadius: "8px",
    //                     fontSize: "14px",
    //                     fontWeight: 600,
    //                     textTransform: "none",
    //                     boxShadow: "none",
    //                   }}
    //                 >
    //                   Download All
    //                 </Button>
    //               </Grid>
    //             </Grid>
    //           </Box>
    //           <Button
    //             variant="contained"
    //             type="button"
    //             sx={{
    //               background: "#FFCC33",
    //               color: "#212121",
    //               height: "50px",
    //               width: "100%",
    //               borderRadius: "50px",
    //               fontSize: "16px",
    //               fontWeight: 600,
    //               textTransform: "none",
    //               boxShadow: "none",
    //               my: "10px",
    //             }}
    //           >
    //             Approve
    //           </Button>
    //           <Typography variant="subtitle2" sx={{ textAlign: "center" }}>
    //             Or
    //           </Typography>
    //           <Button
    //             variant="outlined"
    //             type="button"
    //             onClick={handleDeclineWithFeedback}
    //             sx={{
    //               border: "1px solid #212121",
    //               color: "#212121",
    //               height: "50px",
    //               width: "100%",
    //               borderRadius: "50px",
    //               fontSize: "16px",
    //               fontWeight: 600,
    //               textTransform: "none",
    //               mt: "10px",
    //             }}
    //           >
    //             Decline With Feedback
    //           </Button>
    //         </Box>
    //       </Box>
    //     </Box>
    //   </Modal>

    //   <FeedbackFormModal
    //     open={openFeedback}
    //     handleClose={handleCloseFeedback}
    //   />
    // </Box>
  );
};

export default ContentSubmittedModal;
