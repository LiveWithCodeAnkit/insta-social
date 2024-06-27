"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import GetHelp from "./Tabs/GetHelp";
import TodoTable from "./Tabs/TodoTable";
import DeadlineTable from "./Tabs/DeadlineTable";
import ContentSubmitted from "./Tabs/ContentSubmitted";
import { useDispatch, useSelector } from "react-redux";
import {
  getStatisticsByCreator,
  optionCampaignRequestByCreator,
} from "../../../store/campaign_request/campaignRequest.slice";
import Issue from "./Tabs/Issue";
import Complete from "./Tabs/Complete";
import All from "./Tabs/All";

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ mt: "30px" }}>
          <Box>{children}</Box>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}
const CreatorDashboard = () => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState(6);
  const [campaignStatistics, setCampaignStatistics] = useState(null);

  const campaignCreatorbyRequest = useSelector(
    (state) =>
      state.CampaignRequest.optionCampaignRequestByCreator
        .optionCampaignRequestByCreatorData
  );
  console.log("campaignCreatorbyRequest", campaignCreatorbyRequest);

  const campaignHandlerAlltab = useSelector(
    (state) =>
      state.CampaignRequest.campaignAllTabByCreator.campaignAllTabByCreatorData
  );

  console.log(campaignHandlerAlltab, "campaignHandlerAlltab");
  // const handleChange = (event, newValue) => {
  //   console.log(event.target.textContent, "value");
  //   setActiveTab(event.target.textContent);
  //   setValue(newValue);
  //   setValue2(6);
  // };

  // const handleChange2 = (event, newValue) => {
  //   setValue2(newValue);
  //   setValue(6);
  // };

  const handleTab = (index) => {
    setActiveTab(index);
  };

  const tabComponents = [
    { Component: TodoTable },
    { Component: DeadlineTable },
    { Component: ContentSubmitted },
    { Component: Issue },
    { Component: Complete },
    { Component: All },
    { Component: GetHelp },
  ];

  const SelectedComponent = tabComponents[activeTab]?.Component;

  useEffect(() => {
    dispatch(getStatisticsByCreator()).then((res)=>{
     console.log(res,"response")
     setCampaignStatistics(res.payload)
    });
  }, []);

  useEffect(() => {
    if (campaignStatistics) {
      if (campaignStatistics.find((stat) => stat._id === "Awaiting_Shipment" || stat._id === "Awaiting_Content")) {
        setActiveTab(0); 
      } else if (
        campaignStatistics.find((stat) => stat._id === "Awaiting_Content_Approval"||stat._id === "Content_Approved"||stat._id === "Content_Rejected")
      ) {
        setActiveTab(2); 
      } else if (campaignStatistics.find((stat) => stat._id === "Issue")) {
        setActiveTab(3); 
      } else if (
        campaignStatistics.find((stat) => stat._id === "Completed")
      ) {
        setActiveTab(4);
      } else {
        setActiveTab('get_help'); 
      }
    }
  }, [campaignStatistics]);

  return (
    <Box>
      <Box
        sx={{
          height: "140px",
          backgroundColor: "background.paper",
          boxShadow: "0px 0px 30px 0px #0000000D",
          borderRadius: "30px",
          p: "30px",
        }}
      >
        <Box
          sx={{
            bgcolor: "primary.light",
            height: "80px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            p: "20px",
            borderRadius: "10px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: "1rem",
            }}
          >
            {campaignHandlerAlltab.filter(
              (item) =>
                item._id === "Awaiting_Shipment" ||
                item._id === "Awaiting_Content"
            )?.length > 0 && (
              <Box
                as="div"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  background: activeTab === 0 ? "#FFCC33" : "",
                  borderRadius: "50px",
                  padding: "12px",
                  cursor: "pointer",
                }}
                onClick={() => handleTab(0)}
              >
                <Typography
                  variant="label"
                  sx={{
                    fontSize: " 0.875rem",
                    color: "#212121",
                    fontWeight: "600",
                  }}
                >
                  To-Do
                </Typography>
              </Box>
            )}

            <Box
              as="div"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: activeTab === 1 ? "#FFCC33" : "",
                borderRadius: "50px",
                padding: "12px",
                cursor: "pointer",
              }}
              onClick={() => handleTab(1)}
            >
              <Typography
                variant="label"
                sx={{
                  fontSize: " 0.875rem",
                  color: "#212121",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
              >
                Past Deadline
              </Typography>
            </Box>

            {campaignHandlerAlltab.filter(
              (item) =>
                item._id === "Awaiting_Content_Approval" ||
                item._id === "Content_Approved" ||
                item._id === "Content_Rejected"
            )?.length > 0 && (
              <Box
                as="div"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  background: activeTab === 2 ? "#FFCC33" : "",
                  borderRadius: "50px",
                  padding: "12px",
                  cursor: "pointer",
                }}
                onClick={() => handleTab(2)}
              >
                <Typography
                  variant="label"
                  sx={{
                    fontSize: " 0.875rem",
                    color: "#212121",
                    fontWeight: "600",
                  }}
                >
                  Content Submitted
                </Typography>
              </Box>
            )}

            {campaignHandlerAlltab.filter((item) => item._id === "Issue")
              ?.length > 0 && (
              <Box
                as="div"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  background: activeTab === 3 ? "#FFCC33" : "",
                  borderRadius: "50px",
                  padding: "12px",
                  cursor: "pointer",
                }}
                onClick={() => handleTab(3)}
              >
                <Typography
                  variant="label"
                  sx={{
                    fontSize: " 0.875rem",
                    color: "#212121",
                    fontWeight: "600",
                  }}
                >
                  Issue
                </Typography>
              </Box>
            )}

            {campaignHandlerAlltab.filter((item) => item._id === "Completed")
              ?.length > 0 && (
              <Box
                as="div"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  background: activeTab === 4 ? "#FFCC33" : "",
                  borderRadius: "50px",
                  padding: "12px",
                  cursor: "pointer",
                }}
                onClick={() => handleTab(4)}
              >
                <Typography
                  variant="label"
                  sx={{
                    fontSize: " 0.875rem",
                    color: "#212121",
                    fontWeight: "600",
                  }}
                >
                  Complete
                </Typography>
              </Box>
            )}

            <Box
              as="div"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: activeTab === 5 ? "#FFCC33" : "",
                borderRadius: "50px",
                padding: "12px",
                cursor: "pointer",
              }}
              onClick={() => handleTab(5)}
            >
              <Typography
                variant="label"
                sx={{
                  fontSize: " 0.875rem",
                  color: "#212121",
                  fontWeight: "600",
                }}
              >
                All
              </Typography>
            </Box>
          </Box>

          <Box
            as="div"
            sx={{
              width: "99px",
              height: "50px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              background: activeTab === 6 ? "#FFCC33" : "",
              borderRadius: "50px",
              cursor: "pointer",
            }}
            onClick={() => handleTab(6)}
          >
            <Typography
              variant="label"
              sx={{
                fontSize: " 0.875rem",
                color: "#212121",
                fontWeight: "600",
              }}
            >
              GetHelp
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box sx={{ mt: "30px" }}>
        {SelectedComponent && <SelectedComponent />}
      </Box>
    </Box>
  );
};

export default CreatorDashboard;
