"use client";
import React from "react";
import { Box } from "@mui/material";
import BrandAbout from "./brandAbout/BrandAbout";
import ContentAbout from "./ContentAbout/ContentAbout";
import MoodBond from "./moodBond/MoodBond";
import MessageAbout from "./messageAbout/MessageAbout";
import DoPage from "./do_not_do/DoPage";
import { useParams } from "next/navigation";

const ReviewPage = () => {
  const paramsId = useParams();
  // console.log("paramsId", paramsId);
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
        <MoodBond />
        <ContentAbout />
        <MessageAbout />
        <DoPage />
      </Box>
    </>
  );
};

export default ReviewPage;
