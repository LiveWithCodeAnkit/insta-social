"use client";
import React, { useEffect, useState } from "react";
import { alpha, styled } from "@mui/material/styles";
import { Box, Stack, AppBar, Toolbar, IconButton, Button } from "@mui/material";
import {
  addlaunchCampaign,
  getCampaignbyId,
} from "../../../../store/brief_builder/campaign/campaign.slice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

const DRAWER_WIDTH = 280;
const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 92;

const RootStyle = styled(AppBar)(({ theme }) => ({
  boxShadow: "none",
  color: "black",
  backdropFilter: "blur(6px)",
  WebkitBackdropFilter: "blur(6px)", // Fix on Mobile
  backgroundColor: "transparent",
  [theme.breakpoints.up("lg")]: {
    width: `calc(100% - ${DRAWER_WIDTH + 1}px)`,
  },
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  minHeight: APPBAR_MOBILE,
  [theme.breakpoints.up("lg")]: {
    minHeight: APPBAR_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

const Navbar = ({ onOpenSidebar }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [activeButton, setActiveButton] = useState("Save Draft");

  const infoCam = useSelector(
    (state) => state.Campaign.addCampaignDetails?.campaign
  );

  const { brief_builder } = useParams();
  const campaignData = useSelector(
    (state) => state.Campaign.getCampaignbyId.campaignData
  );
  useEffect(() => {
    if (infoCam?._id) {
      dispatch(getCampaignbyId({ campaignId: infoCam._id }));
    }
  }, [dispatch, infoCam?._id]);

  useEffect(() => {
    if (brief_builder && brief_builder.length > 0) {
      dispatch(getCampaignbyId({ campaignId: brief_builder[0] }));
    }
  }, [dispatch, brief_builder]);

  const campaignId = infoCam?._id || (brief_builder && brief_builder[0]);

  const handleButtonClick = async (label) => {
    setActiveButton(label);

    if (label === "Launch Campaign") {
      const res = await dispatch(addlaunchCampaign(campaignId));
      if (res.payload?.success) {
        router.push("/brand/dashboard");
      }
      console.log(res);
    } else {
      router.push("/brief_builder");
    }
  };

  return (
    <RootStyle>
      <ToolbarStyle>
        <Box sx={{ flexGrow: 1 }} />

        <Stack
          direction="row"
          alignItems="center"
          spacing={{ xs: 0.5, sm: 1.5, md: 2.5 }}
        >
          <CustomButton
            variant="outlined"
            color="#FFCC33"
            width="121px"
            label="Save Draft"
            isActive={activeButton === "Save Draft"}
            onClick={() => handleButtonClick("Save Draft")}
          />
          <CustomButton
            variant="contained"
            color="#FFCC33"
            border="#212121"
            width="178px"
            label="Launch Campaign"
            isActive={activeButton === "Launch Campaign"}
            onClick={() => handleButtonClick("Launch Campaign")}
          />
        </Stack>
      </ToolbarStyle>
    </RootStyle>
  );
};

const CustomButton = ({
  variant,
  color,
  border,
  width,
  label,
  isActive,
  onClick,
}) => (
  <Button
    variant={variant}
    type="button"
    sx={{
      "&:hover": { background: color },
      background: isActive ? color : "#FFFFFF",
      color: isActive ? "#212121" : "#000000",
      height: "50px",
      width: width,
      borderRadius: "50px",
      fontWeight: 600,
      textTransform: "none",
      border: `1px solid ${border}`,
    }}
    onClick={onClick}
  >
    {label}
  </Button>
);

export default Navbar;
