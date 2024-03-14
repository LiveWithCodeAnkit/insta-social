"use client";
import React from "react";
import { Box, Typography, Card } from "@mui/material";
import Button from "@mui/material/Button";
import CustomTextField from "../../common/text-field";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import { useContentForm } from "../hook";
import { CgArrowLongLeft, CgArrowLongRight } from "react-icons/cg";

const ContentPage = () => {
  const { initialValues, schema, submit } = useContentForm();
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
              name="messaging"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <CustomTextField
                  fullWidth
                  rows={5}
                  multiline
                  value={value}
                  sx={{ mb: 4 }}
                  label="Messaging"
                  onChange={onChange}
                  placeholder="Messaging"
                  error={Boolean(errors.messaging)}
                  {...(errors.messaging && {
                    helperText: errors.messaging.message,
                  })}
                />
              )}
            />

            <Controller
              name="hooks"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <CustomTextField
                  rows={5}
                  multiline
                  fullWidth
                  value={value}
                  sx={{ mb: 4 }}
                  label="Hooks"
                  onChange={onChange}
                  placeholder="Hooks"
                  error={Boolean(errors.hooks)}
                  {...(errors.hooks && {
                    helperText: errors.hooks.message,
                  })}
                />
              )}
            />
            <Controller
              name="doDes"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <CustomTextField
                  rows={5}
                  multiline
                  fullWidth
                  value={value}
                  sx={{ mb: 4 }}
                  label="Do"
                  onChange={onChange}
                  placeholder="Brand Website"
                  error={Boolean(errors.doDes)}
                  {...(errors.doDes && {
                    helperText: errors.doDes.message,
                  })}
                />
              )}
            />
          </Box>
          <Box sx={{ width: "34.3rem", display: "flex", gap: "1.8rem" }}>
            <Controller
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
            />
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
        </Card>
      </Box>
    </form>
  );
};

export default ContentPage;
