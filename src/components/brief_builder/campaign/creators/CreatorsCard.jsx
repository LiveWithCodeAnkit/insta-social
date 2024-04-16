import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { campaignInfoStanderd, campaignInfoPro } from "../../constants";
import { CgArrowLongRight, CgArrowLongLeft } from "react-icons/cg";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { createCampaign } from "../../../../../store/brief_builder/campaign/campaign.slice";

const CreatorsCard = ({ infoTittle, handleTab }) => {
  const campaignInfo =
    infoTittle === "Pro" ? campaignInfoPro : campaignInfoStanderd;

  const infoCam = useSelector(
    (state) => state.Campaign.addCampaignDetails?.campaign
  );
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isNextDisabled, setIsNextDisabled] = useState(true);

  useEffect(() => {
    setIsNextDisabled(!selectedItem);
  }, [selectedItem]);

  const handleCardClick = (item) => {
    setSelectedItem(item);
  };

  const convertAmountToNumber = (amount) => {
    const suffixes = {
      k: 1000,
      m: 1000000,
      b: 1000000000,
    };

    const numericPart = parseFloat(amount);
    if (isNaN(numericPart)) return null;

    const suffix = amount.slice(-1).toLowerCase();
    if (suffixes.hasOwnProperty(suffix)) {
      return numericPart * suffixes[suffix];
    } else {
      return numericPart;
    }
  };

  const handleNextApi = async () => {
    const { amountInfo, numInfo } = selectedItem;

    const newamoutnInfo = convertAmountToNumber(amountInfo);

    setLoading(true);
    const campaignDetails = {
      campaignDetails: {
        campaignId: infoCam?._id,

        details: {
          campaignType: infoTittle,
          minNumberOfCreator: numInfo,
          followersCriteria: {
            minFollowers: 100,
            maxFollowers: 250,
          },
          approxAmount: newamoutnInfo,
        },
      },
    };
    const formData = new FormData();
    formData.append("data", JSON.stringify(campaignDetails));
    const res = await dispatch(createCampaign(formData));
    if (res.payload?.success) {
      handleTab(2);
    }
  };
  return (
    <>
      <Box
        as="div"
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          gap: "30px",
          flexWrap: "wrap",
        }}
      >
        {campaignInfo.map((item, index) => (
          <Box
            as="div"
            sx={{
              height: "388px",
              width: "220px",
              borderRadius: "20px 20px 10px 10px",
              backgroundColor: selectedItem === item ? "#ECC94B" : "#FCECB4",
              display: "flex",
              flexDirection: "column",
              justifyContent: "start",
              alignItems: "center",
              overflow: "hidden",
              gap: "10px",
              cursor: "pointer",
              "&:hover": {
                cursor: "pointer",
              },
            }}
            key={index}
            onClick={() => handleCardClick(item)}
          >
            <Box
              as="div"
              sx={{
                height: "190px",
                width: "290px",
                borderRadius: "10% 10% 56% 56% / 0% 0% 58% 58%",
                backgroundColor: "#FEFAED",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: "10px",
              }}
            >
              <label style={{ fontSize: "40px", fontWeight: "bold" }}>
                {item.numInfo}
              </label>
              <label style={{ fontSize: "30px", fontWeight: "bold" }}>
                Creators
              </label>
            </Box>
            <Box
              as="div"
              sx={{
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: "20px",
              }}
            >
              <label style={{ fontSize: "25px", fontWeight: "800" }}>
                100k-250k
              </label>
              <Box
                as="div"
                sx={{
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  gap: "50px",
                }}
              >
                <label style={{ fontSize: "16px", fontWeight: "600" }}>
                  est. cumulative following
                </label>
                <label style={{ fontSize: "25px", fontWeight: "800" }}>
                  {`$ ${item.amountInfo}`}
                </label>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "end",
          gap: "0.5rem",
          marginTop: "2rem",
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
          disabled={loading || isNextDisabled}
          onClick={handleNextApi}
        >
          {loading ? "Loading..." : "Next"}
        </Button>
      </Box>
    </>
  );
};

export default CreatorsCard;
