"use client";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import { FormControlLabel, Checkbox } from "@mui/material";
import { Box, Tab, Tabs, Typography, Card } from "@mui/material";
import { CgArrowLongLeft, CgArrowLongRight } from "react-icons/cg";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { createCampaign } from "../../../../store/brief_builder/campaign/campaign.slice";
import TiktokForm from "./tiktok/TiktokForm";
import NopostForm from "./nopost/NopostForm";

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
const AskForm = ({ handleTab }) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);
  const [loading, setLoading] = useState(false);
  const { control, handleSubmit } = useForm();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const infoCam = useSelector(
    (state) => state.Campaign.addCampaignDetails?.campaign
  );

  const onSubmit = async (values) => {
    setLoading(true);
    const { feedPost, reel, story } = values;

    let postTypes = [];

    if (reel) {
      postTypes.push("REEL");
    }
    if (feedPost) {
      postTypes.push("FEED");
    }
    if (story) {
      postTypes.push("STORY");
    }
    if (postTypes.length === 0) {
      postTypes.push("REEL");
    }

    const formData = new FormData();

    const campaignDetails = {
      campaignDetails: {
        campaignId: infoCam?._id,
        details: {
          campaigningPlatform: "Instagram",
          postType: postTypes,
        },
      },
    };

    formData.append("data", JSON.stringify(campaignDetails));
    const res = await dispatch(createCampaign(formData));
    if (res.payload?.success) {
      handleTab(4);
    }
    setLoading(false);
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
            gap: "2.5rem",
          }}
        >
          <Box
            sx={{
              display: "flex",
              boxShadow: "0px 5px 30px 0px rgba(0, 0, 0, 0.1)",
              width: "24rem",
              height: "5rem",
              justifyContent: "center",
              alignItems: "center",
              padding: "0.5rem",
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
                  margin: "0 15px",
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
              <Tab label="Instagram" {...a11yProps(0)} />
              <Tab label="TikTok" {...a11yProps(1)} />
              <Tab label="No Post" {...a11yProps(2)} />
            </Tabs>
          </Box>

          <TabPanel value={value} index={0}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  gap: "3rem",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "7rem",
                  }}
                >
                  <Controller
                    name="feedPost"
                    control={control}
                    defaultValue={true}
                    render={({ field }) => (
                      <FormControlLabel
                        control={
                          <Checkbox
                            {...field}
                            sx={{
                              color: "#FFCC33",
                              "&.Mui-checked": {
                                color: "#FFCC33",
                              },
                            }}
                            defaultChecked
                          />
                        }
                        label="Feed Post"
                      />
                    )}
                  />
                  <Controller
                    name="reel"
                    control={control}
                    defaultValue={false}
                    render={({ field }) => (
                      <FormControlLabel
                        control={
                          <Checkbox
                            {...field}
                            sx={{
                              color: "#FFCC33",
                              "&.Mui-checked": {
                                color: "#FFCC33",
                              },
                            }}
                          />
                        }
                        label="Reel"
                      />
                    )}
                  />
                  <Controller
                    name="story"
                    control={control}
                    defaultValue={false}
                    render={({ field }) => (
                      <FormControlLabel
                        control={
                          <Checkbox
                            {...field}
                            sx={{
                              color: "#FFCC33",
                              "&.Mui-checked": {
                                color: "#FFCC33",
                              },
                            }}
                          />
                        }
                        label="Story"
                      />
                    )}
                  />
                </Box>
                <Box
                  sx={{ display: "flex", justifyContent: "end", gap: "0.5rem" }}
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
                    type="submit"
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
                    disabled={loading}
                  >
                    {loading ? "Loading..." : "Next"}
                  </Button>
                </Box>
              </Box>
            </form>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <TiktokForm handleTab={handleTab} />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <NopostForm handleTab={handleTab} />
          </TabPanel>
        </Card>
      </Box>
    </>
  );
};

export default AskForm;
