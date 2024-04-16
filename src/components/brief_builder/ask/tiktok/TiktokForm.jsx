"use client";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import { FormControlLabel, Checkbox } from "@mui/material";
import { Box, Tab, Tabs, Typography, Card } from "@mui/material";
import { CgArrowLongLeft, CgArrowLongRight } from "react-icons/cg";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { createCampaign } from "../../../../../store/brief_builder/campaign/campaign.slice";

const TiktokForm = ({ handleTab }) => {
  const dispatch = useDispatch();
  const infoCam = useSelector(
    (state) => state.Campaign.addCampaignDetails?.campaign
  );

  const [loading, setLoading] = useState(false);
  const { control, handleSubmit } = useForm({
    defaultValues: {
      video: true,
      image: false,
    },
  });

  const onSubmit = async (values) => {
    setLoading(true);
    const { video, image } = values;

    let postTypes = [];

    if (video) {
      postTypes.push("VIDEO");
    }
    if (image) {
      postTypes.push("IMAGE");
    }

    if (postTypes.length === 0) {
      postTypes.push("VIDEO");
    }

    const formData = new FormData();

    const campaignDetails = {
      campaignDetails: {
        campaignId: infoCam?._id,
        details: {
          campaigningPlatform: "Tiktok",
          postType: postTypes,
        },
      },
    };

    formData.append("data", JSON.stringify(campaignDetails));
    const res = await dispatch(createCampaign(formData));
    if (res.payload?.success) {
      handleTab(4);
    }
    setLoading(false);
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "3rem",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "7rem",
            }}
          >
            <Controller
              name="video"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      {...field}
                      sx={{
                        color: "#FFCC33",
                        "&.Mui-checked": {
                          color: "#FFCC33",
                        },
                      }}
                      defaultChecked
                    />
                  }
                  label="Video"
                />
              )}
            />
            <Controller
              name="image"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      {...field}
                      sx={{
                        color: "#FFCC33",
                        "&.Mui-checked": {
                          color: "#FFCC33",
                        },
                      }}
                    />
                  }
                  label="Image"
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
              disabled={loading}
            >
              {loading ? "Loading..." : "Next"}
            </Button>
          </Box>
        </Box>
      </form>
    </>
  );
};

export default TiktokForm;
