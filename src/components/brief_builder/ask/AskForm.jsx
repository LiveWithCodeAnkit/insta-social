"use client";
import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { FormControlLabel, Checkbox } from "@mui/material";
import { Box, Tab, Tabs, Typography, Card } from "@mui/material";
import { CgArrowLongLeft, CgArrowLongRight } from "react-icons/cg";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  createCampaign,
  getCampaignbyId,
} from "../../../../store/brief_builder/campaign/campaign.slice";
import TiktokForm from "./tiktok/TiktokForm";
import NopostForm from "./nopost/NopostForm";
import { useParams } from "next/navigation";
import { debounce } from "lodash";

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
  const { brief_builder } = useParams();

  const [value, setValue] = useState(0);
  const [loading, setLoading] = useState(false);

  const infoCam = useSelector(
    (state) => state.Campaign.addCampaignDetails?.campaign
  );

  const campaignData = useSelector(
    (state) => state.Campaign.getCampaignbyId.campaignData
  );

  const fetchCampaignByIdDebounced = debounce((id) => {
    dispatch(getCampaignbyId({ campaignId: id }));
  }, 300);

  useEffect(() => {
    if (infoCam?._id) {
      fetchCampaignByIdDebounced(infoCam._id);
    }
    return () => {
      fetchCampaignByIdDebounced.cancel();
    };
  }, [dispatch, infoCam?._id]);

  useEffect(() => {
    if (brief_builder && brief_builder.length > 0) {
      fetchCampaignByIdDebounced(brief_builder[0]);
    }
    return () => {
      fetchCampaignByIdDebounced.cancel();
    };
  }, [dispatch, brief_builder]);
  const postTypes = campaignData?.campaignDetails?.postType;

  const initialValues = {
    feedPost: postTypes ? postTypes.includes("FEED") : true,
    reel: postTypes ? postTypes.includes("REEL") : false,
    story: postTypes ? postTypes.includes("STORY") : false,
  };

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initialValues,
    mode: "onChange",
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const platform = campaignData?.campaignDetails?.campaigningPlatform;

    if (platform === "Tiktok") {
      setValue(1);
    } else if (platform === "Only Content") {
      setValue(2); // Set value to 2 if Only Content
    } else {
      setValue(0); // Set value to 0 (default) if Instagram or other platforms
    }
  }, [campaignData?.campaignDetails?.campaigningPlatform]);

  const campaignId = infoCam?._id || (brief_builder && brief_builder[0]);

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
        campaignId: campaignId,
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
                    render={({ field }) => (
                      <FormControlLabel
                        control={
                          <Checkbox
                            {...field}
                            checked={field.value}
                            onChange={(e) => field.onChange(e.target.checked)}
                            sx={{
                              color: "#FFCC33",
                              "&.Mui-checked": {
                                color: "#FFCC33",
                              },
                            }}
                          />
                        }
                        label="Feed Post"
                      />
                    )}
                  />
                  <Controller
                    name="reel"
                    control={control}
                    render={({ field }) => (
                      <FormControlLabel
                        control={
                          <Checkbox
                            {...field}
                            checked={field.value}
                            onChange={(e) => field.onChange(e.target.checked)}
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
                    render={({ field }) => (
                      <FormControlLabel
                        control={
                          <Checkbox
                            {...field}
                            checked={field.value}
                            onChange={(e) => field.onChange(e.target.checked)}
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
                    onClick={() => {
                      handleTab(2);
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
