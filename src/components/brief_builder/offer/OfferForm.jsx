"use client";
import React, { useState } from "react";
import { Box, Typography, Tab, Tabs } from "@mui/material";
import GiftPage from "./gift/GiftPage";
import PaidForm from "./paid/PaidForm";

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
const OfferForm = ({ handleTab }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: "1.25rem",
        }}
      >
        <Box
          as="div"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "1.8rem",
          }}
        >
          <Typography sx={{ fontSize: "2.5rem", fontWeight: "bold" }}>
            Show us the money maker
          </Typography>
          <Typography
            sx={{
              fontSize: "1.25rem",
              fontWeight: "600",
            }}
          >
            creators will be able to choose one of the products you upload
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            boxShadow: "0px 5px 30px 0px rgba(0, 0, 0, 0.1)",
            width: "14rem",
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
            <Tab label="Gifting" {...a11yProps(0)} />
            <Tab label="Paid" {...a11yProps(1)} />
          </Tabs>
        </Box>
      </Box>

      <TabPanel value={value} index={0}>
        <GiftPage handleChange={handleChange} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <PaidForm handleTab={handleTab} />
      </TabPanel>
    </>
  );
};

export default OfferForm;
