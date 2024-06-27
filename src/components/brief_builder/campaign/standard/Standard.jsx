import {
  Box,
  Card,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { CgArrowLongLeft, CgArrowLongRight } from "react-icons/cg";
import { useDispatch } from "react-redux";
import { createCampaign } from "../../../../../store/brief_builder/campaign/campaign.slice";

const Standard = ({
  handleChange,
  setinfoTittle,
  infoTittle,
  handleTab,
  campaignData,
  campaignId,
}) => {
  const [clickedCard, setClickedCard] = useState(infoTittle);
  const [offerTypeInfo, setOfferTypeInfo] = useState("Gifting");

  useEffect(() => {
    if (
      campaignData &&
      campaignData.campaignDetails &&
      campaignData.campaignDetails.offerType
    ) {
      setOfferTypeInfo(campaignData.campaignDetails.offerType);
    }
  }, [campaignData]);
  const dispatch = useDispatch();
  const { control, reset, handleSubmit, setValue } = useForm({
    defaultValues: {
      offerType: offerTypeInfo,
    },
  });

  useEffect(() => {
    reset({ offerType: offerTypeInfo });
  }, [offerTypeInfo, reset]);

  useEffect(() => {
    setinfoTittle(clickedCard);
  }, [clickedCard, setinfoTittle]);

  const handleCardClick = (cardType) => {
    setClickedCard(cardType);
  };

  const onSubmit = async (data) => {
    const campaignDetails = {
      campaignDetails: {
        campaignId: campaignId,
        details: {
          campaignType: infoTittle,
          offerType: infoTittle && infoTittle === "Pro" ? "" : data.offerType,
        },
      },
    };

    const formData = new FormData();
    formData.append("data", JSON.stringify(campaignDetails));

    const res = await dispatch(createCampaign(formData));

    if (res.payload?.success) {
      handleChange(event, 1);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          as="div"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "1.8rem",
            padding: "0.5rem",
          }}
        >
          <Card
            variant="outlined"
            sx={{
              width: "23.4rem",
              padding: "1rem",
              height: "21.1rem",
              borderRadius: "1.5rem",
              backgroundColor:
                clickedCard === "Standard" ? "#FFF3AB" : "transparent",
              cursor: "pointer",
            }}
            onClick={() => handleCardClick("Standard")}
          >
            <Typography
              variant="label"
              sx={{
                fontSize: "26px",
                fontWeight: "600",
              }}
            >
              Standard
            </Typography>
            <Divider sx={{ borderColor: "primary.main", height: "2px" }} />
            <Box padding="1rem">
              <ul>
                <li style={{ color: "#777777" }}>Feature 1</li>
                <li style={{ color: "#777777" }}>Feature 2</li>
                <li style={{ color: "#777777" }}>Feature 3</li>
                <li style={{ color: "#777777" }}>Feature 4</li>
                <li style={{ color: "#777777" }}>Feature 5</li>
              </ul>
            </Box>
            <Box>
              <Typography
                variant="label"
                sx={{
                  fontSize: "14px",
                  fontWeight: "700",
                }}
              >
                Select offer type
              </Typography>
              <Controller
                name="offerType"
                control={control}
                defaultValue=""
                rules={{ required: "Offer Type is required" }}
                render={({ field }) => (
                  <RadioGroup
                    {...field}
                    value={field.value} // Set value from React Hook Form's value
                    onChange={(e) => setValue("offerType", e.target.value)}
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <FormControlLabel
                      value="Gifting"
                      control={<Radio />}
                      label="Gifting"
                    />
                    <FormControlLabel
                      value="Paid"
                      control={<Radio />}
                      label="Paid"
                    />
                  </RadioGroup>
                )}
              />
            </Box>
          </Card>
          <Card
            variant="outlined"
            sx={{
              width: "23.4rem",
              padding: "1rem",
              height: "21.1rem",
              borderRadius: "1.5rem",
              position: "relative",
              backgroundColor:
                clickedCard === "Pro" ? "#FFF3AB" : "transparent",
              cursor: "pointer",
            }}
            onClick={() => handleCardClick("Pro")}
          >
            <Typography
              variant="label"
              sx={{
                fontSize: "26px",
                fontWeight: "600",
              }}
            >
              Pro
            </Typography>
            <Divider sx={{ borderColor: "primary.main", height: "2px" }} />
            <Box padding="1rem">
              <ul>
                <li style={{ color: "#777777" }}>Feature 1</li>
                <li style={{ color: "#777777" }}>Feature 2</li>
                <li style={{ color: "#777777" }}>Feature 3</li>
                <li style={{ color: "#777777" }}>Feature 4</li>
                <li style={{ color: "#777777" }}>Feature 5</li>
              </ul>
            </Box>

            <Box
              sx={{ position: "absolute", right: "1.5rem", top: -1, zIndex: 4 }}
            >
              <Image
                src="/images/popular.png"
                alt="Google Logo"
                width={46}
                height={166}
              />
            </Box>
          </Card>
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
            onClick={() => {
              handleTab(0);
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
            // onClick={() => {
            //   handleChange(event, 1);
            // }}
          >
            Next
          </Button>
        </Box>
      </form>
    </>
  );
};

export default Standard;
