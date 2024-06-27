import { Box, Typography } from "@mui/material";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCampaignbyId } from "../../../../store/brief_builder/campaign/campaign.slice";
import GiftPage from "./gift/GiftPage";
import PaidForm from "./paid/PaidForm";

const OfferForm = ({ handleTab }) => {
  //fecth data for show hide tab

  const infoCam = useSelector(
    (state) => state.Campaign.addCampaignDetails?.campaign
  );
  const dispatch = useDispatch();
  const { brief_builder } = useParams();

  const campaignData = useSelector(
    (state) => state.Campaign.getCampaignbyId.campaignData
  );

  useEffect(() => {
    if (infoCam?._id) {
      dispatch(getCampaignbyId({ campaignId: infoCam._id }));
    }
  }, [dispatch, infoCam?._id]);

  useEffect(() => {
    if (brief_builder && brief_builder.length > 0) {
      dispatch(getCampaignbyId({ campaignId: brief_builder[0] }));
    }
  }, [dispatch, brief_builder]);

  /// new

  const shouldShowBothTabs =
    campaignData?.campaignDetails?.campaignType === "Pro" &&
    campaignData?.campaignDetails?.offerType === "";

  const shouldShowGiftingTab =
    campaignData?.campaignDetails?.campaignType === "Standard" &&
    campaignData?.campaignDetails?.offerType === "Gifting";

  const shouldShowPaidTab =
    campaignData?.campaignDetails?.campaignType === "Standard" &&
    campaignData?.campaignDetails?.offerType === "Paid";

  const shouldShowDefault =
    !campaignData ||
    !campaignData?.campaignDetails ||
    (campaignData?.campaignDetails?.campaignType === "" &&
      campaignData?.campaignDetails?.offerType === "");
  //new end

  //
  const [activeTab, setActiveTab] = useState(1);

  useEffect(() => {
    if (shouldShowBothTabs && activeTab !== 0 && activeTab !== 1) {
      setActiveTab(0); // Show both tabs
    } else if (shouldShowGiftingTab && activeTab !== 1) {
      setActiveTab(1); // Show Gifting tab only
    } else if (shouldShowPaidTab && activeTab !== 0 && activeTab !== 1) {
      setActiveTab(0); // Show Paid tab only
    }
  }, [campaignData]);

  const handleTabInside = (index) => {
    setActiveTab(index);
  };

  const tabComponents = [
    {
      Component: PaidForm,
      handleTab: handleTab,
      handleTabInside: handleTabInside,
    },
    {
      Component: GiftPage,
      handleTab: handleTab,
      handleTabInside: handleTabInside,
    },
  ];

  const SelectedComponent = tabComponents[activeTab].Component;

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
          {shouldShowDefault && (
            <>
              <Box
                as="div"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  background: activeTab === 0 ? "#FFCC33" : "",
                  borderRadius: "50px",
                  padding: "12px",
                  cursor: "pointer",
                }}
                onClick={() => handleTabInside(0)}
              >
                <Typography
                  variant="label"
                  sx={{
                    fontSize: " 0.875rem",
                    color: "#212121",
                    fontWeight: "600",
                  }}
                >
                  Paid
                </Typography>
              </Box>
              <Box
                as="div"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  background: activeTab === 1 ? "#FFCC33" : "",
                  borderRadius: "50px",
                  padding: "12px",
                  cursor: "pointer",
                }}
                onClick={() => handleTabInside(1)}
              >
                <Typography
                  variant="label"
                  sx={{
                    fontSize: " 0.875rem",
                    color: "#212121",
                    fontWeight: "600",
                  }}
                >
                  Gifting
                </Typography>
              </Box>
            </>
          )}
          {shouldShowBothTabs && (
            <>
              <Box
                as="div"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  background: activeTab === 0 ? "#FFCC33" : "",
                  borderRadius: "50px",
                  padding: "12px",
                  cursor: "pointer",
                }}
                onClick={() => handleTabInside(0)}
              >
                <Typography
                  variant="label"
                  sx={{
                    fontSize: " 0.875rem",
                    color: "#212121",
                    fontWeight: "600",
                  }}
                >
                  Paid
                </Typography>
              </Box>
              <Box
                as="div"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  background: activeTab === 1 ? "#FFCC33" : "",
                  borderRadius: "50px",
                  padding: "12px",
                  cursor: "pointer",
                }}
                onClick={() => handleTabInside(1)}
              >
                <Typography
                  variant="label"
                  sx={{
                    fontSize: " 0.875rem",
                    color: "#212121",
                    fontWeight: "600",
                  }}
                >
                  Gifting
                </Typography>
              </Box>
            </>
          )}
          {shouldShowGiftingTab && (
            <Box
              as="div"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: activeTab === 1 ? "#FFCC33" : "",
                borderRadius: "50px",
                padding: "12px",
                cursor: "pointer",
              }}
              onClick={() => handleTabInside(1)}
            >
              <Typography
                variant="label"
                sx={{
                  fontSize: " 0.875rem",
                  color: "#212121",
                  fontWeight: "600",
                }}
              >
                Gifting
              </Typography>
            </Box>
          )}
          {shouldShowPaidTab && (
            <>
              <Box
                as="div"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  background: activeTab === 0 ? "#FFCC33" : "",
                  borderRadius: "50px",
                  padding: "12px",
                  cursor: "pointer",
                }}
                onClick={() => handleTabInside(0)}
              >
                <Typography
                  variant="label"
                  sx={{
                    fontSize: " 0.875rem",
                    color: "#212121",
                    fontWeight: "600",
                  }}
                >
                  Paid
                </Typography>
              </Box>
              <Box
                as="div"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  background: activeTab === 1 ? "#FFCC33" : "",
                  borderRadius: "50px",
                  padding: "12px",
                  cursor: "pointer",
                }}
                onClick={() => handleTabInside(1)}
              >
                <Typography
                  variant="label"
                  sx={{
                    fontSize: " 0.875rem",
                    color: "#212121",
                    fontWeight: "600",
                  }}
                >
                  Gifting
                </Typography>
              </Box>
            </>
          )}
        </Box>
      </Box>

      <Box
        as="div"
        sx={{
          marginTop: "2rem",
        }}
      >
        {(shouldShowBothTabs ||
          shouldShowGiftingTab ||
          shouldShowPaidTab ||
          shouldShowDefault) && (
          <SelectedComponent
            handleTab={handleTab}
            handleTabInside={handleTabInside}
          />
        )}
      </Box>
    </>
  );
};

export default OfferForm;
