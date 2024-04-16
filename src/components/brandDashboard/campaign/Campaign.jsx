"use client";

import React, { useEffect } from "react";
import { useState } from "react";
import { Box, Stack, Tab, Tabs, Typography } from "@mui/material";
import Image from "next/image";
import ApproveCreators from "./Tabs/ApproveCreators";
import Ship from "./Tabs/Ship";
import Issue from "./Tabs/Issue";
import AwaitingContent from "./Tabs/AwaitingContent";
import ContentSubmitted from "./Tabs/ContentSubmitted";
import Complete from "./Tabs/Complete";
import GetHelp from "./Tabs/GetHelp";
import { useDispatch, useSelector } from "react-redux";
import { getCampaignbyId } from "../../../../store/brief_builder/campaign/campaign.slice";
import { useParams, usePathname } from "next/navigation";
import dayjs from "dayjs";

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
        <Box sx={{ mt: "20px" }}>
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

const Campaign = () => {
  const [value, setValue] = useState(0);
  const [value2, setValue2] = useState(0);
  const dispatch = useDispatch();
  const params = useParams();
  const campaignData = useSelector(
    (state) => state.Campaign.getCampaignbyId.campaignData
  );
  // console.log(params, "params");
  // console.log(campaignData, "campaignData");

  useEffect(() => {
    const res = dispatch(getCampaignbyId({ campaignId: params.campaignId }));
    // console.log(res, "res");
  }, [params.campaignId]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setValue2(6);
  };
  const handleChange2 = (event, newValue) => {
    setValue2(newValue);
    setValue(6);
  };

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
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="secondary"
            textColor="secondary"
            //   variant="fullWidth"
            sx={{
              "& .MuiTab-root": {
                color: "text.primary",
              },
              "& .Mui-selected": {
                backgroundColor: "#FFCC33",
                borderRadius: "50px",
              },
              "& .MuiTabs-indicator": {
                display: "none",
              },
            }}
          >
            <Tab
              label={
                <Typography variant="subtitle1">Approve Creators</Typography>
              }
              {...a11yProps(0)}
            />
            <Tab
              label={<Typography variant="subtitle1">Ship</Typography>}
              {...a11yProps(1)}
            />
            <Tab
              label={<Typography variant="subtitle1">Issue</Typography>}
              {...a11yProps(2)}
            />
            <Tab
              label={
                <Typography variant="subtitle1">Awaiting Content</Typography>
              }
              {...a11yProps(3)}
            />
            <Tab
              label={
                <Typography variant="subtitle1">Content Submitted</Typography>
              }
              {...a11yProps(4)}
            />
            <Tab
              label={<Typography variant="subtitle1">Complete</Typography>}
              {...a11yProps(5)}
            />
          </Tabs>
          <Tabs
            value={value2}
            onChange={handleChange2}
            indicatorColor="secondary"
            textColor="secondary"
            sx={{
              "& .MuiTab-root": {
                color: "text.primary",
              },
              "& .Mui-selected": {
                backgroundColor: "#FFCC33",
                borderRadius: "50px",
              },
              "& .MuiTabs-indicator": {
                display: "none",
              },
            }}
          >
            <Tab
              label={<Typography variant="subtitle1">Get Help</Typography>}
              {...a11yProps(6)}
            />
          </Tabs>
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
        <TabPanel value={value} index={0} sx={{ display: "block" }}>
          <ApproveCreators />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Ship />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Issue />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <AwaitingContent />
        </TabPanel>
        <TabPanel value={value} index={4}>
          <ContentSubmitted />
        </TabPanel>
        <TabPanel value={value} index={5}>
          <Complete />
        </TabPanel>
        <TabPanel value={value} index={6}>
          <GetHelp />
        </TabPanel>
      </Box>
    </Box>
  );
};

export default Campaign;
