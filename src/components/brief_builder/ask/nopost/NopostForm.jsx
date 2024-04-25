"use client";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import { CgArrowLongLeft, CgArrowLongRight } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { createCampaign } from "../../../../../store/brief_builder/campaign/campaign.slice";

const NopostForm = ({ handleTab }) => {
  const dispatch = useDispatch();
  const infoCam = useSelector(
    (state) => state.Campaign.addCampaignDetails?.campaign
  );
  const [loading, setLoading] = useState(false);

  const handleNoContentApi = async () => {
    setLoading(true);
    const formData = new FormData();
    const campaignDetails = {
      campaignDetails: {
        campaignId: infoCam?._id,
        details: {
          campaigningPlatform: "Only Content",
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
          onClick={handleNoContentApi}
        >
          {loading ? "Loading..." : "Next"}
        </Button>
      </Box>
    </>
  );
};

export default NopostForm;