"use client";

import React, { useState } from "react";
import { AppBar, Box, Tab, Tabs, Typography, useTheme } from "@mui/material";
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
        <Box sx={{mt: "30px" }}>
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

const AllBrands = () => {
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [value2, setValue2] = useState(2);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setValue2(4);
  };
  const handleChange2 = (event, newValue) => {
    setValue2(newValue);
    setValue(4);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <Box>
      <Box
        sx={{
          height: "140px",
          borderRadius: "30px",
          backgroundColor: "background.paper",
          boxShadow: "0px 0px 30px 0px #0000000D",
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
          {/* <AppBar position="static" color="transparent" sx={{p: "0px"}}> */}
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
            <Tab label= {<Typography variant="subtitle1">All</Typography>} {...a11yProps(0)} />
            <Tab label={<Typography variant="subtitle1">Active</Typography>} {...a11yProps(1)} />
            <Tab label={<Typography variant="subtitle1">Previous</Typography>} {...a11yProps(2)} />
            <Tab label={<Typography variant="subtitle1">Drafts</Typography>} {...a11yProps(3)} />
          </Tabs>
          <Tabs
            value={value2}
            onChange={handleChange2}
            indicatorColor="secondary"
            textColor="secondary"
            sx={{
              "& .MuiTab-root": {
                color: "text.primary",
                fontSize: "16px"
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
            <Tab label={<Typography variant="subtitle1">Get Help</Typography>} {...a11yProps(4)} />
          </Tabs>
          {/* </AppBar> */}
        </Box>
      </Box>
      <TabPanel value={value} index={0} sx={{ display: "block"}}>
        <All />
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
      <TabPanel value={value} index={3}>
        Item Four
      </TabPanel>
      <TabPanel value={value} index={4}>
        Get Help
      </TabPanel>
    </Box>
  );
};

export default AllBrands;
