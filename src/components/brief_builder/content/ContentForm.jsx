"use client";
import React, { useEffect, useRef, useState } from "react";
import { Box, Typography, Card } from "@mui/material";
import Button from "@mui/material/Button";
import CustomTextField from "../../common/text-field";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { useContentForm } from "../hook";
import { CgArrowLongLeft, CgArrowLongRight } from "react-icons/cg";
import FileUpload from "@/components/common/fileupload/FileUpload";
import ImageUploading from "react-images-uploading";
import { AiFillDelete, AiFillCamera } from "react-icons/ai";
import { FaUpload } from "react-icons/fa";
import { MdOutlineModeEdit } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import Image from "next/image";
import { MdAddAPhoto } from "react-icons/md";
import { HiPlus, HiMinus } from "react-icons/hi";
import { RiDeleteBin6Fill } from "react-icons/ri";
import QuillMinimal from "@/components/common/editer/Editor";

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

const ContentForm = ({ handleChange }) => {
  const { initialValues, schema, submit } = useContentForm({ handleChange });

  const [images, setImages] = React.useState([]);
  const maxNumber = 69;
  const onImageChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };

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
  const hasAppended = useRef(false);
  const { fields, append, remove } = useFieldArray({
    control,
    name: "externalLinks",
  });
  const handleAddExternalLink = () => {
    append({});
  };

  const handleRemoveExternalLink = (ExternalLinkIndex) => {
    remove(ExternalLinkIndex);
  };
  useEffect(() => {
    if (!hasAppended.current && fields.length === 0) {
      append({});
      hasAppended.current = true;
    }
  }, [fields, append]);
  return (
    <form onSubmit={handleSubmit(submit)}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1.8rem",
        }}
      >
        <Controller
          name="campaignName"
          control={control}
          rules={{ required: true }}
          render={({ field: { value, onChange } }) => (
            <CustomTextField
              fullWidth
              value={value}
              sx={{ width: "30rem" }}
              label="Campaign Name"
              onChange={onChange}
              placeholder="Campaign Name"
              error={Boolean(errors.campaignName)}
              {...(errors.campaignName && {
                helperText: errors.campaignName.message,
              })}
            />
          )}
        />
        <Box
          sx={{
            border: "2px dashed #FFCC33",
            borderRadius: "15px",
            width: "100%",
            minHeight: "12.5rem",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#FEFAED",
            position: "relative",
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
                            width={200}
                            height={200}
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
                                onClick={() => onImageUpdate(index)}
                                style={{
                                  fontSize: "16px",
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
                                onClick={() => onImageRemove(index)}
                                style={{
                                  fontSize: "16px",
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
                          fontSize: "30px",
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
        {fields.map((item, index) => (
          <Box
            key={item.id}
            as="div"
            sx={{
              display: "flex",
              justifyContent: "start",
              alignItems: "end",
              gap: "1.2rem",
            }}
          >
            <Controller
              name={`externalLinks[${index}]`}
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <CustomTextField
                  fullWidth
                  value={value.externalLinks}
                  sx={{ width: "30rem" }}
                  onChange={onChange}
                  placeholder="External Links"
                  label={index === 0 ? "External Link" : undefined}
                />
              )}
            />
            {index === fields.length - 1 ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "2.5rem",
                  width: "2.5rem",
                  background: "#FFCC33",
                  borderRadius: "10px",
                  gap: "0.5rem",
                  cursor: "pointer",
                }}
                onClick={handleAddExternalLink}
              >
                <HiPlus />
              </Box>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "2.5rem",
                  width: "2.5rem",
                  background: "#F00E0E",
                  borderRadius: "10px",
                  gap: "0.5rem",
                  cursor: "pointer",
                  color: "white",
                }}
                onClick={() => handleRemoveExternalLink(index)}
              >
                <RiDeleteBin6Fill />
              </Box>
            )}
            <span>
              {errors.externalLinks &&
                typeof errors.externalLinks[index]?.message === "string" && (
                  <Typography
                    variant="body2"
                    sx={{ color: "error.main", marginLeft: "8px" }}
                  >
                    Not Valid
                  </Typography>
                )}
            </span>
          </Box>
        ))}

        <Box
          sx={{
            width: "auto",
            display: "flex",
            gap: "1.8rem",
            flexWrap: ["wrap", "nowrap"],
          }}
        >
          <Box
            as="div"
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "start",
              gap: "0.5rem",
              height: "100%",
              width: "100%",
            }}
          >
            <Typography
              variant="label"
              sx={{
                fontSize: "14px",
                fontWeight: "700",
              }}
            >
              Messaging
            </Typography>
            <Controller
              name="messaging"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <>
                  <QuillMinimal
                    value={value}
                    onChange={onChange}
                    label="Messaging"
                  />
                </>
              )}
            />
            {errors.messaging && (
              <Typography variant="caption" color="error">
                {errors.messaging.message}
              </Typography>
            )}
          </Box>
          <Box
            as="div"
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "start",
              gap: "0.5rem",
              height: "100%",
              width: "100%",
            }}
          >
            <Typography
              variant="label"
              sx={{
                fontSize: "14px",
                fontWeight: "700",
              }}
            >
              Hooks
            </Typography>
            <Controller
              name="hooks"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <>
                  <QuillMinimal
                    value={value}
                    onChange={onChange}
                    label="Hooks"
                  />
                </>
              )}
            />
            {errors.hooks && (
              <Typography variant="caption" color="error">
                {errors.hooks.message}
              </Typography>
            )}
          </Box>
          <Box
            as="div"
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "start",
              gap: "0.5rem",
              height: "100%",
              width: "100%",
            }}
          >
            <Typography
              variant="label"
              sx={{
                fontSize: "14px",
                fontWeight: "700",
              }}
            >
              Do
            </Typography>
            <Controller
              name="doDes"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <>
                  <QuillMinimal value={value} onChange={onChange} label="Do" />
                </>
              )}
            />
            {errors.doDes && (
              <Typography variant="caption" color="error">
                {errors.doDes.message}
              </Typography>
            )}
          </Box>
        </Box>
        <Box
          sx={{ width: "34.3rem", display: "flex", gap: "1.8rem", mt: "2rem" }}
        >
          {/* <Controller
            name="doNotDes"
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                rows={5}
                multiline
                fullWidth
                value={value}
                sx={{ mb: 4 }}
                label="Don’t"
                onChange={onChange}
                placeholder="Don`t"
                error={Boolean(errors.doNotDes)}
                {...(errors.doNotDes && {
                  helperText: errors.doNotDes.message,
                })}
              />
            )}
          /> */}
          <Box
            as="div"
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "start",
              gap: "0.5rem",
              height: "100%",
              width: "100%",
            }}
          >
            <Typography
              variant="label"
              sx={{
                fontSize: "14px",
                fontWeight: "700",
              }}
            >
              Do Not
            </Typography>
            <Controller
              name="doNotDes"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <>
                  <QuillMinimal
                    value={value}
                    onChange={onChange}
                    label="doNotDes"
                  />
                </>
              )}
            />
            {errors.doNotDes && (
              <Typography variant="caption" color="error">
                {errors.doNotDes.message}
              </Typography>
            )}
          </Box>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "end", gap: "0.5rem" }}>
          <Button
            variant="outlined"
            startIcon={<CgArrowLongLeft />}
            sx={{
              height: "50px",
              width: "147px",
              color: "#212121",
              borderRadius: "50px",
              fontWeight: 600,
              textTransform: "none",
              borderColor: "black",
            }}
          >
            Previous
          </Button>
          <Button
            type="submit"
            sx={{
              background: "#FFCC33",
              color: "#212121",
              height: "50px",
              width: "117px",
              borderRadius: "50px",
              fontWeight: 600,
              textTransform: "none",

              "&:hover": {
                background: "#FFCC33",
              },
            }}
            variant="contained"
            endIcon={<CgArrowLongRight />}
          >
            Next
          </Button>
        </Box>
      </Box>
    </form>
  );
};

export default ContentForm;
