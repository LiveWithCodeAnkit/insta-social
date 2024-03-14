"use client";
import React, { useState } from "react";
import Standard from "./standard/Standard";
import { Box, Tab, Tabs, Typography, Card } from "@mui/material";
import Button from "@mui/material/Button";
import { CgArrowLongLeft, CgArrowLongRight } from "react-icons/cg";

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
const CampaignForm = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
              <Tab label="Standard" {...a11yProps(0)} />
              <Tab label="Pro" {...a11yProps(1)} />
            </Tabs>
          </Box>

          <TabPanel value={value} index={0}>
            <Standard />
          </TabPanel>
          <TabPanel value={value} index={1}>
            Pro
          </TabPanel>
          <Box
            sx={{
              display: "flex",
              justifyContent: "end",
              gap: "0.5rem",
              width: "100%",
            }}
          >
            <Button
              variant="outlined"
              startIcon={<CgArrowLongLeft />}
              sx={{
                height: "50px",
                width: "147px",
                color: "#212121",
                borderRadius: "50px",
                fontWeight: 600,
                textTransform: "none",
                borderColor: "black",
              }}
            >
              Previous
            </Button>
            <Button
              sx={{
                background: "#FFCC33",
                color: "#212121",
                height: "50px",
                width: "117px",
                borderRadius: "50px",
                fontWeight: 600,
                textTransform: "none",

                "&:hover": {
                  background: "#FFCC33",
                },
              }}
              variant="contained"
              endIcon={<CgArrowLongRight />}
            >
              Next
            </Button>
          </Box>
        </Card>
      </Box>
    </>
  );
};

export default CampaignForm;
