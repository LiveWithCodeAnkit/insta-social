"use client";
import React, { useState } from "react";
import Standard from "./standard/Standard";
import { Box, Tab, Tabs, Typography, Card } from "@mui/material";
import CreatorsCard from "./creators/CreatorsCard";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      style={{ width: "100%" }}
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ mt: "30px" }}>
          <>{children}</>
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
const CampaignForm = ({ handleTab }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [infoTittle, setinfoTittle] = useState("Pro");
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
          gap: "1.8rem",
        }}
      >
        <Typography variant="h2">Brief Builder</Typography>
        <Card
          sx={{
            padding: "3rem",
            borderRadius: "1.8rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "2.18rem",
          }}
        >
          <Box
            sx={{
              display: "flex",
              boxShadow: "0px 5px 30px 0px rgba(0, 0, 0, 0.1)",
              width: "16rem",
              height: "5rem",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "3rem",
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
                  margin: "0 8px",
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
              <Tab label="Type" {...a11yProps(0)} />
              <Tab label="Creators" {...a11yProps(1)} />
            </Tabs>
          </Box>

          <TabPanel value={value} index={0}>
            <Standard
              handleChange={handleChange}
              setinfoTittle={setinfoTittle}
            />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <CreatorsCard handleTab={handleTab} infoTittle={infoTittle} />
          </TabPanel>
        </Card>
      </Box>
    </>
  );
};

export default CampaignForm;
