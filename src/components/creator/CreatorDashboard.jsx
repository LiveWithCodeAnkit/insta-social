"use client";
import React from "react";
import { useState } from "react";
import { Box, Tab, Tabs, Typography } from "@mui/material";

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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
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
          <Typography variant="h3">Native For moms</Typography>

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
                label={<Typography variant="subtitle1">All (15)</Typography>}
                {...a11yProps(0)}
              />
              <Tab
                label={
                  <Typography variant="subtitle1">Pending (10)</Typography>
                }
                {...a11yProps(1)}
              />
            </Tabs>
          </Box>

          <TabPanel value={value} index={0}>
            <label>1</label>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <label>2</label>
          </TabPanel>
        </Box>
      </Box>
    </>
  );
};

export default CreatorDashboard;
