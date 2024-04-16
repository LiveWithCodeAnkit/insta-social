import { Box, Button, Typography } from "@mui/material";
import dayjs from "dayjs";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { optionCampaignRequestByCreator } from "../../../../../../store/campaign_request/campaignRequest.slice";

const JoinCampaign = ({ campaignCreatorData, campaignRequestId }) => {
  const campaignDetails = campaignCreatorData?.campaignDetails || null;

  // const minDate = campaignDetails?.contentPostingDate?.minDate || "";
  // const date = new Date(maxDate);
  // const date1 = new Date(minDate);

  const maxDate = dayjs(campaignDetails?.contentPostingDate?.maxDate).format(
    "MM/DD/YYYY"
  );
  const minDate = dayjs(campaignDetails?.contentPostingDate?.minDate).format(
    "MM/DD/YYYY"
  );

  const dispatch = useDispatch();
  const optionByCreator = useSelector(
    (state) => state.CampaignRequest.optionCampaignRequestByCreator
  );

  console.log(optionByCreator, "optionByCreator");

  // useEffect(() => {
  //   dispatch(
  //     optionCampaignRequestByCreator({
  //       campaignId: queryData,
  //       status: "pending",
  //     })
  //   );
  // });

  const handleClickByOption = (status) => {
    console.log(status, "status");
    dispatch(
      optionCampaignRequestByCreator({
        campaignRequestId: campaignRequestId,
        status: status,
      })
    );
  };

  return (
    <Box
      sx={{
        backgroundColor: "background.default",
        boxShadow: "0px 5px 30px 0px rgba(0, 0, 0, 0.1)",
        padding: "1.8rem",
        borderRadius: "1.8rem",
        display: "flex",
        width: "100%",
        gap: "1.8rem",
      }}
    >
      <Box
        as="div"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1.2rem",
          p: "30px",
        }}
      >
        <Typography variant="h3">
          Want to join this campaign? opt in below!
        </Typography>
        <Box>
          <>
            <Typography variant="subtitle2" sx={{ color: "common.black" }}>
              Friendly reminder , by opting in you're making a commitment to the
              brand that , If approved, you 'll share a{" "}
              <span style={{ fontWeight: "700" }}>Video</span> on{" "}
              <span style={{ fontWeight: "700" }}>
                {campaignDetails?.campaigningPlatform}
              </span>{" "}
              between <span style={{ fontWeight: "700" }}> {minDate}</span> and{" "}
              <span style={{ fontWeight: "700" }}> {maxDate}</span> featuring
              the brand consistent with the campaign brif above.
            </Typography>
          </>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", mt: "20px" }}>
          <Typography variant="subtitle2">
            Please review our creator terms before opting in!
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "1.8rem",
            mt: "20px",
          }}
        >
          <Button
            variant="outlined"
            type="button"
            sx={{
              "&:hover": {
                border: "1px solid #212121",
                backgroundColor: "secondary.main",
                color: "#FFFFFF",
              },
              // border: "1px solid #212121",
              color: "#212121",
              // backgroundColor: "secondary.main",
              height: "50px",
              width: "160px",
              borderRadius: "50px",
              fontSize: "16px",
              fontWeight: 500,
            }}
            onClick={() => handleClickByOption("rejected")}
          >
            No Thanks
          </Button>
          <Button
            variant="outlined"
            type="button"
            sx={{
              "&:hover": {
                border: "1px solid #212121",
                color: "#212121",
              },
              border: "1px solid #212121",
              color: "#FFFFFF",
              backgroundColor: "secondary.main",
              height: "50px",
              width: "160px",
              borderRadius: "50px",
              fontSize: "16px",
              fontWeight: 500,
            }}
            onClick={() => handleClickByOption("approved")}
          >
            Opt In
          </Button>
        </Box>

        <Typography variant="subtitle1" sx={{ mt: "20px" }}>
          Brif expires on 02/29/24
        </Typography>
      </Box>
    </Box>
  );
};

export default JoinCampaign;
