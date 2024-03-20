"use client";
import React, { useState } from "react";
import { Box, Typography, Card } from "@mui/material";
import Button from "@mui/material/Button";
import CustomTextField from "../../common/text-field";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import { useBrandForm } from "../hook";
import { CgArrowLongRight } from "react-icons/cg";
import FileUpload from "@/components/common/fileupload/FileUpload";
import QuillMinimal from "@/components/common/editer/Editor";

const BrandForm = ({ handleTab }) => {
  const { initialValues, loading, schema, submit } = useBrandForm({
    handleTab,
  });
  const [files, setFiles] = useState([]);

  const updateFilesState = (newFiles) => {
    setFiles(newFiles);
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

  return (
    <>
      <form onSubmit={handleSubmit(submit)}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
            gap: "1.8rem",
          }}
        >
          <Typography variant="h2">Brief Builder</Typography>
          <Card
            sx={{
              padding: "1.8rem",
              borderRadius: "1.8rem",
              display: "flex",
              flexDirection: "column",
              gap: "1.8rem",
            }}
          >
            <Box sx={{ width: "auto", display: "flex", gap: "1.8rem" }}>
              <Controller
                name="brandName"
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    label="Brand Name"
                    onChange={onChange}
                    placeholder="Brand Name"
                    error={Boolean(errors.brandName)}
                    {...(errors.brandName && {
                      helperText: errors.brandName.message,
                    })}
                  />
                )}
              />

              <Controller
                name="brandWebsite"
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    label="Brand Website"
                    onChange={onChange}
                    placeholder="Brand Website"
                    error={Boolean(errors.brandWebsite)}
                    {...(errors.brandWebsite && {
                      helperText: errors.brandWebsite.message,
                    })}
                  />
                )}
              />
            </Box>
            <Box sx={{ width: "auto", display: "flex", gap: "1.8rem" }}>
              <Controller
                name="brandInstagram"
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    label="Brand Instagram"
                    onChange={onChange}
                    placeholder="Brand Instagram"
                    error={Boolean(errors.brandInstagram)}
                    {...(errors.brandInstagram && {
                      helperText: errors.brandInstagram.message,
                    })}
                  />
                )}
              />

              <Controller
                name="brandTiktok"
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    label="Brand Tiktok"
                    onChange={onChange}
                    placeholder="Brand Tiktok"
                    error={Boolean(errors.brandTiktok)}
                    {...(errors.brandTiktok && {
                      helperText: errors.brandTiktok.message,
                    })}
                  />
                )}
              />
            </Box>

            <Box
              as="div"
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "start",
                gap: "0.5rem",
              }}
            >
              <Typography
                variant="label"
                sx={{
                  fontSize: "14px",
                  fontWeight: "600",
                }}
              >
                Brand Description
              </Typography>
              <Controller
                name="brandDescription"
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <>
                    <QuillMinimal
                      value={value}
                      onChange={onChange}
                      label="Brand Description"
                    />
                  </>
                )}
              />
              {errors.brandDescription && (
                <Typography variant="caption" color="error">
                  {errors.brandDescription.message}
                </Typography>
              )}
            </Box>

            <Box
              sx={{
                border: "2px dotted #FFCC33",
                borderRadius: "15px",
                maxWidth: "100%",
                minHeight: "12.5rem",
                height: "auto",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#FEFAED",
                padding: "1rem",
                boxSizing: "border-box",
              }}
            >
              <Controller
                name="fileUpload"
                control={control}
                render={({ field: { onChange } }) => (
                  <FileUpload
                    iconName="img"
                    maxSize={12582912}
                    errorText="File size is too large, please upload file size within (12MB)"
                    onChange={(file) => {
                      onChange(file);
                      updateFilesState([file]);
                    }}
                  />
                )}
              />
            </Box>

            <Box sx={{ display: "flex", justifyContent: "end" }}>
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
          </Card>
        </Box>
      </form>
    </>
  );
};

export default BrandForm;
