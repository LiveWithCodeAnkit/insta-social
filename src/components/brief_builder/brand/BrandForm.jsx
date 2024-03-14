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

const BrandForm = ({handleTab}) => {
  const { initialValues, schema, submit } = useBrandForm({handleTab});
  const [files, setFiles] = useState([]);

  const updateFilesState = (newFiles) => {
    setFiles(newFiles);
  };

  const {
    reset,
    control,
    handleSubmit,
    isSubmitting ,
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
                    sx={{ mb: 4 }}
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
                    sx={{ mb: 4 }}
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
                    sx={{ mb: 4 }}
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
                    sx={{ mb: 4 }}
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
            <Controller
              name="brandDescription"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <CustomTextField
                  rows={5}
                  fullWidth
                  multiline
                  sx={{ mb: 5 }}
                  label="Brand Description"
                  onChange={onChange}
                  placeholder="Brand Description"
                  error={Boolean(errors.brandDescription)}
                  {...(errors.brandDescription && {
                    helperText: errors.brandDescription.message,
                  })}
                />
              )}
            />

            <Box
              sx={{
                border: "2px dotted #FFCC33",
                borderRadius: "15px",
                width: "46.8rem",
                height: "12.5rem",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#FEFAED",
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
                disabled={isSubmitting} 
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
