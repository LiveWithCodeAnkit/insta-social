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
import { FaDownload } from "react-icons/fa";
import ImageUploading from "react-images-uploading";
import { CgMaximize } from "react-icons/cg";
import { useForm, Controller } from "react-hook-form";
import { FaUpload } from "react-icons/fa";
import { MdOutlineModeEdit } from "react-icons/md";
import { MdAddAPhoto } from "react-icons/md";
import { HiPlus, HiMinus } from "react-icons/hi";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { IoClose } from "react-icons/io5";
// import { useBrandForm } from "@/components/brief_builder/hook";
import { yupResolver } from "@hookform/resolvers/yup";
import CustomTextField from "@/components/common/text-field";
import { useContentModalForm } from "../../hook";

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
        cursor: "pointer",
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
        cursor: "pointer",
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

const buttonStyle = {
  background: "none",
  border: "none",
  color: "#FFCC33",
  textDecoration: "none",
  cursor: "pointer",
  padding: 0,
  fontSize: "16px",
  fontWeight: "bold",
  height: "20px",
};

const UploadContentModal = ({ open, allData, handleClose, imageSmallUrls }) => {
  const [bigImageIdx, setBigImageIdx] = useState(0);
  const [openBigImage, setOpenBigImage] = useState(false);
  const handleOpenBigImage = () => setOpenBigImage(true);
  const handleCloseBigImage = () => setOpenBigImage(false);
  const { initialValues, schema, submit } = useContentModalForm({
    allData,
    handleClose,
  });

  const [images, setImages] = React.useState([]);
  const maxNumber = 3;
  const onImageChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };
  // console.log("images:-", images);

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initialValues,
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  return (
    <>
      <Box>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <form onSubmit={handleSubmit(submit)}>
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
                      src={imageSmallUrls[bigImageIdx]}
                      alt="image"
                      width={500}
                      height={500}
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
                <Grid item xs={7}>
                  <Box>
                    <Box
                      sx={{
                        height: "150px",
                        maxWidth: "611px",
                        background:
                          "url(/images/brief_recap_bg.png) no-repeat center center / cover",
                        p: "30px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                        borderRadius: "10px",
                        cursor: "pointer",
                        position: "relative",
                      }}
                    >
                      <Typography variant="h4">Brief Recap</Typography>
                      <Typography
                        variant="subtitle1"
                        textAlign="center"
                        mt={"10px"}
                        color={"common.black"}
                      >
                        You will share a feed post on Instagram between October
                        6th, 2022 and ASAP
                      </Typography>
                      <Box sx={{ position: "absolute", right: 15, top: 15 }}>
                        <Image
                          src="/images/launch.png"
                          alt="arrow right"
                          width={24}
                          height={24}
                        />
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        // height: "450px",
                        borderRadius: "30px",
                        backgroundColor: "background.paper",
                        boxShadow: "0px 0px 30px 0px #0000000D",
                        p: "20px",
                        mt: "20px",
                      }}
                    >
                      <Typography variant="h4">Content Submission</Typography>
                      <Box sx={{ mt: "10px" }}>
                        <Box
                          sx={{
                            border: "2px dotted #FFCC33",
                            borderRadius: "15px",
                            height: "130px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: "#FEFAED",
                          }}
                        >
                          <Controller
                            name="images"
                            control={control}
                            render={({ field }) => (
                              <ImageUploading
                                multiple
                                value={field.value}
                                onChange={(imageList, addUpdateIndex) => {
                                  field.onChange(imageList);
                                  setImages(imageList);
                                }}
                                maxNumber={maxNumber}
                                dataURLKey="data_url"
                                acceptType={["jpg", "png"]}
                              >
                                {({
                                  imageList,
                                  onImageUpload,
                                  onImageRemoveAll,
                                  onImageUpdate,
                                  onImageRemove,
                                  isDragging,
                                  dragProps,
                                }) => (
                                  <div className="upload__image-wrapper">
                                    {imageList.length === 0 && (
                                      <div className="dz-messagenew">
                                        <div
                                          style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                          }}
                                        >
                                          <FaUpload
                                            style={{
                                              color: "#FFCC33",
                                              width: "30px",
                                              height: "28px",
                                            }}
                                          />
                                        </div>
                                        <div>
                                          <span className="dz-message-text">
                                            Drag & drop images and videos
                                          </span>
                                          <div
                                            className="dz-message-btn"
                                            style={{
                                              display: "flex",
                                              justifyContent: "center",
                                              alignItems: "center",
                                              gap: "0.5rem",
                                            }}
                                          >
                                            <span>or</span>
                                            <button
                                              style={buttonStyle}
                                              size="sm"
                                              variant="primary"
                                              type="button"
                                              {...dragProps}
                                              onClick={onImageUpload}
                                            >
                                              Browse Files
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    )}
                                    <div
                                      style={{
                                        display: "flex",
                                        gap: "1.5rem",
                                        justifyContent: "center",
                                        alignItems: "center",
                                      }}
                                    >
                                      {imageList.map((image, index) => (
                                        <div key={index} className="image-item">
                                          <Image
                                            src={image.data_url}
                                            width={100}
                                            height={100}
                                            alt="pic"
                                          />
                                          <div className="image-item__btn-wrapper">
                                            <div
                                              style={{
                                                background: "#FFCC33",
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                padding: "0.2rem",
                                                borderRadius: "50%",
                                              }}
                                            >
                                              <MdOutlineModeEdit
                                                onClick={() =>
                                                  onImageUpdate(index)
                                                }
                                                style={{
                                                  fontSize: "14px",
                                                  cursor: "pointer",
                                                  color: "white",
                                                }}
                                              />
                                            </div>
                                            <div
                                              style={{
                                                background: "#F00E0E",
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                padding: "0.2rem",
                                                borderRadius: "50%",
                                              }}
                                            >
                                              <IoClose
                                                onClick={() =>
                                                  onImageRemove(index)
                                                }
                                                style={{
                                                  fontSize: "14px",
                                                  color: "white",
                                                  cursor: "pointer",
                                                }}
                                              />
                                            </div>
                                          </div>
                                        </div>
                                      ))}
                                      <MdAddAPhoto
                                        style={{
                                          fontSize: "24px",
                                          color: "#FFCC33",
                                          cursor: "pointer",
                                        }}
                                        onClick={onImageUpload}
                                      />
                                    </div>
                                  </div>
                                )}
                              </ImageUploading>
                            )}
                          />
                        </Box>
                        <Box
                          sx={{
                            mt: "30px",
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          <Typography
                            variant="subtitle2"
                            sx={{ color: "#777777" }}
                          >
                            Accepted filetypes:
                            <span style={{ color: "#FFCC33" }}>
                              HEIC, jpg, m4v, mp4, mov, png, ogg, tif, webm
                            </span>
                          </Typography>
                        </Box>
                      </Box>
                      <Box sx={{ mt: "20px" }}>
                        <Controller
                          name="captionName"
                          control={control}
                          rules={{ required: true }}
                          render={({ field: { value, onChange } }) => (
                            <CustomTextField
                              fullWidth
                              value={value}
                              sx={{ mb: 4 }}
                              onChange={onChange}
                              placeholder="Write caption Here.."
                              error={Boolean(errors.captionName)}
                              {...(errors.captionName && {
                                helperText: errors.captionName.message,
                              })}
                            />
                          )}
                        />
                      </Box>
                      <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <Button
                          variant="contained"
                          type="submit"
                          sx={{
                            background: "#FFCC33",
                            color: "#212121",
                            height: "50px",
                            width: "123px",
                            borderRadius: "50px",
                            fontSize: "16px",
                            fontWeight: 600,
                            textTransform: "none",
                            boxShadow: "none",
                          }}
                        >
                          Submit
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </form>
        </Modal>

        {/* <BigImageModal
        open={openBigImage}
        handleClose={handleCloseBigImage}
        imageSmallUrls={imageSmallUrls}
        bigImageIdx
      /> */}
      </Box>
    </>
  );
};

export default UploadContentModal;
