"use client";
import React from "react";
import { useState } from "react";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import GetHelp from "./Tabs/GetHelp";
import TodoTable from "./Tabs/TodoTable";
import DeadlineTable from "./Tabs/DeadlineTable";
import ContentSubmitted from "./Tabs/ContentSubmitted";

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
  const [value, setValue] = useState(0);
  const [value2, setValue2] = useState(2);

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
          height: "140px",
          backgroundColor: "background.paper",
          boxShadow: "0px 0px 30px 0px #0000000D",
          borderRadius: "30px",
          p: "30px",
        }}
      >
        {/* <Typography variant="h3">Native For moms</Typography> */}
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
          <Tabs
            value={value}
            onChange={handleChange}
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
              label={<Typography variant="subtitle1">To-Do (8)</Typography>}
              {...a11yProps(0)}
            />
            <Tab
              label={
                <Typography variant="subtitle1">Past Deadline (6)</Typography>
              }
              {...a11yProps(1)}
            />
            <Tab
              label={
                <Typography variant="subtitle1">
                  Content Submitted (10)
                </Typography>
              }
              {...a11yProps(2)}
            />
            <Tab
              label={<Typography variant="subtitle1">Issue (12)</Typography>}
              {...a11yProps(3)}
            />
            <Tab
              label={<Typography variant="subtitle1">Complete (12)</Typography>}
              {...a11yProps(4)}
            />
            <Tab
              label={<Typography variant="subtitle1">All</Typography>}
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
                fontSize: "16px",
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
      </Box>
      <TabPanel value={value} index={0} sx={{ display: "block" }}>
        <TodoTable />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <DeadlineTable />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <ContentSubmitted />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <label>4</label>
      </TabPanel>
      <TabPanel value={value} index={4}>
        <label>5</label>
      </TabPanel>
      <TabPanel value={value} index={5}>
        <label>6</label>
      </TabPanel>
      <TabPanel value={value} index={6}>
        <GetHelp />
      </TabPanel>
    </Box>
  );
};

export default CreatorDashboard;
