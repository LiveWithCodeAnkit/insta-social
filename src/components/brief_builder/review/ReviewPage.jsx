import React from "react";
import { Box } from "@mui/material";
import BrandAbout from "./brandAbout/BrandAbout";
import OfferAbout from "./offerAbout/OfferAbout";
import MoodBond from "./moodBond/MoodBond";
import MessageAbout from "./messageAbout/MessageAbout";
import DoPage from "./do_not_do/DoPage";

const ReviewPage = () => {
  return (
    <>
      <Box
        as="div"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "1.8rem",
          padding: "1.8rem",
        }}
      >
        <BrandAbout />
        <OfferAbout />
        <MoodBond />
        <MessageAbout />
        <DoPage />
      </Box>
    </>
  );
};

export default ReviewPage;
