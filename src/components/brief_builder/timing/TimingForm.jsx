"use client";
import React, { useEffect } from "react";
import { Box, Typography, Card } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Button from "@mui/material/Button";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";

import { CgArrowLongRight, CgArrowLongLeft } from "react-icons/cg";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import { useTimingForm } from "../hook";
import { useDispatch, useSelector } from "react-redux";
import { getCampaignbyId } from "../../../../store/brief_builder/campaign/campaign.slice";
import dayjs from "dayjs";

const TimingForm = ({ handleTab }) => {
  const { initialValues, loading, schema, submit } = useTimingForm({
    handleTab,
  });
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialValues,
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
              gap: "2rem",
            }}
          >
            <Box
              sx={{
                width: "auto",
                display: "flex",
                gap: "1.8rem",
                flexWrap: "wrap",
              }}
            >
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoItem
                  label={
                    <Typography
                      variant="label"
                      sx={{
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                    >
                      Creators Ready to Review
                    </Typography>
                  }
                >
                  <Controller
                    name="creatorsReadyToReview"
                    control={control}
                    defaultValue={initialValues.creatorsReadyToReview}
                    render={({ field: { value, onChange } }) => (
                      <DatePicker
                        value={value ? dayjs(value) : null}
                        onChange={onChange}
                        sx={{
                          width: "30rem",
                          "& .MuiOutlinedInput-input": {
                            padding: "10.5px 14px",
                          },
                          borderColor: errors.creatorsReadyToReview
                            ? "red"
                            : "black",
                        }}
                      />
                    )}
                  />
                  {errors.creatorsReadyToReview && (
                    <Typography variant="caption" color="error">
                      {errors.creatorsReadyToReview.message}
                    </Typography>
                  )}
                </DemoItem>
              </LocalizationProvider>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoItem
                  label={
                    <Typography
                      variant="label"
                      sx={{
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                    >
                      Product Shipped
                    </Typography>
                  }
                >
                  <Controller
                    name="productShipped"
                    control={control}
                    defaultValue={initialValues.productShipped}
                    render={({ field: { value, onChange } }) => (
                      <DatePicker
                        value={value ? dayjs(value) : null}
                        onChange={onChange}
                        sx={{
                          width: "30rem",
                          "& .MuiOutlinedInput-input": {
                            padding: "10.5px 14px",
                          },
                          borderColor: errors.productShipped ? "red" : "black",
                        }}
                      />
                    )}
                  />
                  {errors.productShipped && (
                    <Typography variant="caption" color="error">
                      {errors.productShipped.message}
                    </Typography>
                  )}
                </DemoItem>
              </LocalizationProvider>

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoItem
                  label={
                    <Typography
                      variant="label"
                      sx={{
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                    >
                      Content Submitted for Approval
                    </Typography>
                  }
                >
                  <Controller
                    name="contentSubmitted"
                    control={control}
                    defaultValue={initialValues.contentSubmitted}
                    render={({ field: { value, onChange } }) => (
                      <DatePicker
                        value={value ? dayjs(value) : null}
                        onChange={onChange}
                        sx={{
                          width: "30rem",
                          "& .MuiOutlinedInput-input": {
                            padding: "10.5px 14px",
                          },
                          borderColor: errors.contentSubmitted
                            ? "red"
                            : "black",
                        }}
                      />
                    )}
                  />
                  {errors.contentSubmitted && (
                    <Typography variant="caption" color="error">
                      {errors.contentSubmitted.message}
                    </Typography>
                  )}
                </DemoItem>
              </LocalizationProvider>
            </Box>
            <Box
              sx={{
                width: "auto",
                display: "flex",
                gap: "1.8rem",
                flexWrap: "wrap",
              }}
            >
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoItem
                  label={
                    <Typography
                      variant="label"
                      sx={{
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                    >
                      From Date
                    </Typography>
                  }
                >
                  <Controller
                    name="fromDate"
                    control={control}
                    defaultValue={initialValues.fromDate}
                    render={({ field: { value, onChange } }) => (
                      <DatePicker
                        value={value ? dayjs(value) : null}
                        onChange={onChange}
                        sx={{
                          width: "30rem",
                          "& .MuiOutlinedInput-input": {
                            padding: "10.5px 14px",
                          },
                          borderColor: errors.fromDate ? "red" : "black",
                        }}
                      />
                    )}
                  />
                  {errors.fromDate && (
                    <Typography variant="caption" color="error">
                      {errors.fromDate.message}
                    </Typography>
                  )}
                </DemoItem>
              </LocalizationProvider>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoItem
                  label={
                    <Typography
                      variant="label"
                      sx={{
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                    >
                      To Date
                    </Typography>
                  }
                >
                  <Controller
                    name="toDate"
                    control={control}
                    defaultValue={initialValues.toDate}
                    render={({ field: { value, onChange } }) => (
                      <DatePicker
                        value={value ? dayjs(value) : null}
                        onChange={onChange}
                        sx={{
                          width: "30rem",
                          "& .MuiOutlinedInput-input": {
                            padding: "10.5px 14px",
                          },
                          borderColor: errors.toDate ? "red" : "black",
                        }}
                      />
                    )}
                  />
                  {errors.toDate && (
                    <Typography variant="caption" color="error">
                      {errors.toDate.message}
                    </Typography>
                  )}
                </DemoItem>
              </LocalizationProvider>
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
                onClick={() => {
                  handleTab(5);
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

export default TimingForm;
