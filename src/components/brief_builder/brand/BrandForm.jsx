"use client";
import React, { useEffect, useState } from "react";
import { Box, Typography, Card } from "@mui/material";
import Button from "@mui/material/Button";
import CustomTextField from "../../common/text-field";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import { useBrandForm } from "../hook";
import { CgArrowLongRight } from "react-icons/cg";
import QuillMinimal from "@/components/common/editer/Editor";
import FileUploaderMultiple from "@/components/common/fileuploader/FileUploaderMultiple";

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

const BrandForm = ({ handleTab }) => {
  const { initialValues, loading, schema, submit } = useBrandForm({
    handleTab,
  });

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

  useEffect(() => {
    reset(initialValues);
  }, [initialValues]);

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
                    label="Instagram Handle"
                    onChange={onChange}
                    placeholder="Instagram"
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
                    label="Tiktok Handle"
                    onChange={onChange}
                    placeholder="Tiktok"
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
                <Typography
                  variant="caption"
                  color="error"
                  sx={{
                    fontSize: "0.875rem",
                  }}
                >
                  {errors.brandDescription.message}
                </Typography>
              )}
            </Box>

            <Box
              as="div"
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
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
                Upload Cover Picture
              </Typography>

              <Controller
                name="fileUpload"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <FileUploaderMultiple
                    name={"fileUpload"}
                    value={value}
                    onChange={onChange}
                    errors={errors}
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
                disabled={loading}
              >
                {loading ? "Loading..." : "Next"}
              </Button>
            </Box>
          </Card>
        </Box>
      </form>
    </>
  );
};

export default BrandForm;
