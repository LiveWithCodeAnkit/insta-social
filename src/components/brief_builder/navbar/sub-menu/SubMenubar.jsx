"use client";
import Card from "@mui/material/Card";
import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import AskForm from "../../ask/AskForm";
import OfferForm from "../../offer/OfferForm";
import BrandForm from "../../brand/BrandForm";
import ReviewPage from "../../review/ReviewPage";
import TimingForm from "../../timing/TimingForm";
// import ContentPage from "../../content/ContentForm";
import { subMenuBriefBuilder } from "../../constants";
import CampaignForm from "../../campaign/CampaignForm";
import CreatorsForm from "../../creators/CreatorsForm";
import ContentPage from "../../content/ContentPage";

const SubMenubar = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTab = (index) => {
    setActiveTab(index);
  };

  const tabComponents = [
    { Component: BrandForm, handleTab: handleTab },
    { Component: CampaignForm, handleTab: handleTab },
    { Component: OfferForm, handleTab: handleTab },
    { Component: AskForm, handleTab: handleTab },
    { Component: ContentPage, handleTab: handleTab },
    { Component: CreatorsForm, handleTab: handleTab },
    { Component: TimingForm, handleTab: handleTab },
    { Component: ReviewPage, handleTab: handleTab },
  ];

  const SelectedComponent = tabComponents[activeTab].Component;
  const handleTabForSelectedComponent = tabComponents[activeTab].handleTab;

  return (
    <>
      <Card
        variant="outlined"
        sx={{
          borderRadius: "20px",
          position: "relative",
          height: "80px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          position: "sticky", // Change position to sticky
          top: 0,
          backdropFilter: "blur(8px)",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          zIndex: 100,
        }}
      >
        {subMenuBriefBuilder.map((item, index) => (
          <Box
            as="div"
            key={item.title}
            style={{
              textDecoration: "none",
              width: "258px",
              padding: "1.6rem",
              textAlign: "center",
              borderBottom: `0.3rem solid ${
                index === activeTab ? "#FFCC33" : "transparent"
              }`,
              position: "relative",
              cursor: "pointer",
            }}
            onClick={() => handleTab(index)}
          >
            <Typography
              variant="label"
              sx={{
                fontSize: "16px",
                color: index === activeTab ? "#FFCC33" : "text.primary",
              }}
            >
              {item.title}
            </Typography>
            {index === activeTab && (
              <Box
                sx={{
                  position: "absolute",
                  display: "block",
                  content: '""',
                  top: "4.3rem",
                  left: "50%",
                  transform: "translateX(-50%)",
                  borderLeft: "8px solid transparent",
                  borderRight: "8px solid transparent",
                  borderBottom: "8px solid #FFCC33",
                }}
              ></Box>
            )}
          </Box>
        ))}
      </Card>
      <Box
        as="div"
        sx={{
          marginTop: "3rem",
        }}
      >
        {SelectedComponent && (
          <SelectedComponent handleTab={handleTabForSelectedComponent} />
        )}
      </Box>
    </>
  );
};

export default SubMenubar;
