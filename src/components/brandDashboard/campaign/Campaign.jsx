"use client";
import { Box, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCampaignbyId,
  getCampaignbyStatistics,
  resetCampaignData,
} from "../../../../store/brief_builder/campaign/campaign.slice";
import ApproveCreators from "./Tabs/ApproveCreators";
import AwaitingContent from "./Tabs/AwaitingContent";
import Complete from "./Tabs/Complete";
import ContentSubmitted from "./Tabs/ContentSubmitted";
import GetHelp from "./Tabs/GetHelp";
import Issue from "./Tabs/Issue";
import Ship from "./Tabs/Ship";

const Campaign = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const [campaignStatistics, setCampaignStatistics] = useState(null);

  const campaignData = useSelector(
    (state) => state.Campaign.getCampaignbyId.campaignData
  );

  const statistics = useSelector(
    (state) => state.Campaign.getCampaignbyStatistics.menuData
  );

  useEffect(() => {
    const res = dispatch(getCampaignbyId({ campaignId: params.campaignId }));

    return () => {
      dispatch(resetCampaignData());
    };
  }, [params.campaignId]);

  const [activeTab, setActiveTab] = useState('get_help');

  const handleTab = (index) => {
    setActiveTab(index);
  };

  const fetchCampaignStatistics = async () => {
    try {
      const res = await dispatch(
        getCampaignbyStatistics({ campaignId: params.campaignId })
      );
      console.log("i am fetch response :-", res.payload?.success);
      if (res.payload?.success) {
        // Use a callback function to ensure we are getting the latest state
        dispatch((_, getState) => {
          const updatedStatistics =
            getState().Campaign.getCampaignbyStatistics.menuData;
          setCampaignStatistics(updatedStatistics?.data);
        });
        setActiveTab('get_help');
      }
    } catch (error) {
      console.error("Error fetching campaign statistics:", error);
    }
  };

  const tabComponents = [
    {
      id:"approve_creator",
      Component: ApproveCreators,
      fetchCampaignStatistics: fetchCampaignStatistics,
    },
    {id:"ship", Component: Ship, fetchCampaignStatistics: fetchCampaignStatistics },
    {id:"issue", Component: Issue, fetchCampaignStatistics: fetchCampaignStatistics },
    {
      id:"awaiting_content",
      Component: AwaitingContent,
      fetchCampaignStatistics: fetchCampaignStatistics,
    },
    {
      id:"content_submitted",
      Component: ContentSubmitted,
      fetchCampaignStatistics: fetchCampaignStatistics,
    },
    { id:"complete",Component: Complete, fetchCampaignStatistics: fetchCampaignStatistics },
    { id:"get_help", Component: GetHelp, fetchCampaignStatistics: fetchCampaignStatistics },
  ];

  const generateComp=(active)=>{
    return tabComponents.find(tab=>tab.id===active)?.Component;
  }

  const SelectedComponent = generateComp(activeTab);

  //new implemet hide tab

  useEffect(() => {
    fetchCampaignStatistics();
  }, [dispatch, params.campaignId]);

  useEffect(() => {
    if (campaignStatistics) {
      if (campaignStatistics.find((stat) => stat._id === "Request_Approved")) {
        setActiveTab('approve_creator'); // Approve Creators tab
      } else if (
        campaignStatistics.find((stat) => stat._id === "Awaiting_Shipment")
      ) {
        setActiveTab('ship'); // Ship tab
      } else if (campaignStatistics.find((stat) => stat._id === "Issue")) {
        setActiveTab('issue'); // Issue tab
      } else if (
        campaignStatistics.find((stat) => stat._id === "Awaiting_Content")
      ) {
        setActiveTab('awaiting_content'); // Awaiting Content tab
      } else if (
        campaignStatistics.find(
          (stat) =>
            stat._id === "Awaiting_Content_Approval" ||
            stat._id === "Content_Approved" ||
            stat._id === "Content_Rejected"
        )
      ) {
        setActiveTab('content_submitted');
      } else if (campaignStatistics.find((stat) => stat._id === "Completed")) {
        setActiveTab('complete');
      } else {
        setActiveTab('get_help');
      }
    }
  }, [campaignStatistics]);

  // useEffect(() => {
  //   if (campaignStatistics) {
  //     const currentTabId = activeTab; // Store the current active tab
  //     let newActiveTab = null;

  //     console.log("currentTabId :-", currentTabId);
  //     // Check if the current tab is still present in the campaignStatistics
  //     const currentTabExists = campaignStatistics.find(
  //       (stat) => stat._id === currentTabId
  //     );

  //     // If the current tab is still valid, keep it as the active tab
  //     if (currentTabExists) {
  //       newActiveTab = currentTabId;
  //     } else {
  //       // Find the first tab that exists in the updated campaignStatistics
  //       if (
  //         campaignStatistics.find((stat) => stat._id === "Request_Approved")
  //       ) {
  //         newActiveTab = 0;
  //       } else if (
  //         campaignStatistics.find((stat) => stat._id === "Awaiting_Shipment")
  //       ) {
  //         newActiveTab = 1;
  //       } else if (campaignStatistics.find((stat) => stat._id === "Issue")) {
  //         newActiveTab = 2;
  //       } else if (
  //         campaignStatistics.find((stat) => stat._id === "Awaiting_Content")
  //       ) {
  //         newActiveTab = 3;
  //       } else if (
  //         campaignStatistics.find(
  //           (stat) =>
  //             stat._id === "Awaiting_Content_Approval" ||
  //             stat._id === "Content_Approved" ||
  //             stat._id === "Content_Rejected"
  //         )
  //       ) {
  //         newActiveTab = 4;
  //       } else if (
  //         campaignStatistics.find((stat) => stat._id === "Completed")
  //       ) {
  //         newActiveTab = 5;
  //       } else {
  //         newActiveTab = 6;
  //       }
  //     }

  //     // Update the active tab only if it has changed
  //     if (newActiveTab !== activeTab) {
  //       setActiveTab(newActiveTab);
  //     }
  //   }
  // }, [campaignStatistics]);

  return (
    <Box>
      <Box
        sx={{
          backgroundColor: "background.paper",
          boxShadow: "0px 0px 30px 0px #0000000D",
          borderRadius: "30px",
          height: "100%",
          p: "30px",
        }}
      >
        <Box>
          <Typography variant="h3">
            {campaignData?.campaignDetails?.campaignName}
          </Typography>
          <Typography variant="h6">
            Lives dates:{" "}
            {dayjs(
              campaignData?.campaignDetails?.contentPostingDate?.minDate
            ).format("MMMM DD[th] YYYY")}{" "}
            -{" "}
            {dayjs(
              campaignData?.campaignDetails?.contentPostingDate?.maxDate
            ).format("MMMM DD[th] YYYY")}
          </Typography>
          {/* <Typography variant="subtitle1" mt="20px" color="#777777" >
            {campaignData?.campaignDetails?.campaignMessage}
          </Typography> */}
          <div
            style={{ marginTop: "10px", color: "#777777" }}
            dangerouslySetInnerHTML={{
              __html: campaignData?.campaignDetails?.campaignMessage,
            }}
          ></div>
        </Box>

        <Box
          sx={{
            bgcolor: "primary.light",
            height: "80px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            p: "20px",
            borderRadius: "10px",
            mt: "30px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: "1rem",
            }}
          >
            {campaignStatistics &&
              campaignStatistics.find(
                (stat) => stat._id === "Request_Approved"
              ) && (
                <Box
                  as="div"
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    background: activeTab === 'approve_creator' ? "#FFCC33" : "",
                    borderRadius: "50px",
                    padding: "12px",
                    cursor: "pointer",
                  }}
                  onClick={() => handleTab('approve_creator')}
                >
                  <Typography
                    variant="label"
                    sx={{
                      fontSize: " 0.875rem",
                      color: "#212121",
                      fontWeight: "600",
                    }}
                  >
                    Approve Creators
                  </Typography>
                </Box>
              )}

            {campaignStatistics &&
              campaignStatistics.find(
                (stat) => stat._id === "Awaiting_Shipment"
              ) && (
                <Box
                  as="div"
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    background: activeTab === 'ship' ? "#FFCC33" : "",
                    borderRadius: "50px",
                    padding: "12px",
                    cursor: "pointer",
                  }}
                  onClick={() => handleTab('ship')}
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
                    Ship
                  </Typography>
                </Box>
              )}

            {campaignStatistics &&
              campaignStatistics.find((stat) => stat._id === "Issue") && (
                <Box
                  as="div"
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    background: activeTab === 'issue' ? "#FFCC33" : "",
                    borderRadius: "50px",
                    padding: "12px",
                    cursor: "pointer",
                  }}
                  onClick={() => handleTab('issue')}
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

            {campaignStatistics &&
              campaignStatistics.find(
                (stat) => stat._id === "Awaiting_Content"
              ) && (
                <Box
                  as="div"
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    background: activeTab === 'awaiting_content' ? "#FFCC33" : "",
                    borderRadius: "50px",
                    padding: "12px",
                    cursor: "pointer",
                  }}
                  onClick={() => handleTab('awaiting_content')}
                >
                  <Typography
                    variant="label"
                    sx={{
                      fontSize: " 0.875rem",
                      color: "#212121",
                      fontWeight: "600",
                    }}
                  >
                    Awaiting Content
                  </Typography>
                </Box>
              )}

            {campaignStatistics &&
              campaignStatistics.find(
                (stat) =>
                  stat._id === "Awaiting_Content_Approval" ||
                  stat._id === "Content_Approved" ||
                  stat._id === "Content_Rejected"
              ) && (
                <Box
                  as="div"
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    background: activeTab === 'content_submitted' ? "#FFCC33" : "",
                    borderRadius: "50px",
                    padding: "12px",
                    cursor: "pointer",
                  }}
                  onClick={() => handleTab('content_submitted')}
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

            {campaignStatistics &&
              campaignStatistics.find((stat) => stat._id === "Completed") && (
                <Box
                  as="div"
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    background: activeTab === 'complete' ? "#FFCC33" : "",
                    borderRadius: "50px",
                    padding: "12px",
                    cursor: "pointer",
                  }}
                  onClick={() => handleTab('complete')}
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
          </Box>

          <Box
            as="div"
            sx={{
              width: "99px",
              height: "50px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              background: activeTab === 'get_help' ? "#FFCC33" : "",
              borderRadius: "50px",
              cursor: "pointer",
            }}
            onClick={() => handleTab('get_help')}
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

        <Stack direction={"row"} gap={"20px"} sx={{ mt: "20px" }}>
          <Box
            sx={{
              height: "150px",
              maxWidth: "611px",
              background:
                "url(/images/brief_recap_bg.png) no-repeat center center / cover",
              p: "30px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              borderRadius: "10px",
              cursor: "pointer",
              position: "relative",
            }}
          >
            <Typography variant="h3">Brief Recap</Typography>
            <Typography
              variant="subtitle1"
              textAlign="center"
              mt={"10px"}
              color={"common.black"}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt
            </Typography>
            <Box sx={{ position: "absolute", right: 15, top: 15 }}>
              <Image
                src="/images/launch.png"
                alt="arrow right"
                width={24}
                height={24}
              />
            </Box>
          </Box>
          <Box
            sx={{
              height: "150px",
              maxWidth: "611px",
              background:
                "url(/images/todos_bg.png) no-repeat center center / cover",
              p: "30px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              borderRadius: "10px",
              cursor: "pointer",
              position: "relative",
            }}
          >
            <Typography variant="h3">To Dos</Typography>
            <Typography
              variant="subtitle1"
              textAlign="center"
              mt={"10px"}
              color={"common.black"}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt
            </Typography>
            <Box sx={{ position: "absolute", right: 15, top: 15 }}>
              <Image
                src="/images/launch.png"
                alt="arrow right"
                width={24}
                height={24}
              />
            </Box>
          </Box>
        </Stack>

        <Box
          as="div"
          sx={{
            marginTop: "2rem",
          }}
        >
          {SelectedComponent && (
            <SelectedComponent
              fetchCampaignStatistics={fetchCampaignStatistics}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Campaign;
