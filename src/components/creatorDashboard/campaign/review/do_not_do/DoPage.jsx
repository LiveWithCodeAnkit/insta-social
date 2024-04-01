import React from "react";
import { Box, Typography } from "@mui/material";

const DoPage = ({ campaignCreatorData }) => {
  const campaignDetails = campaignCreatorData?.campaignDetails || "";
  // console.log(campaignDetails, "campaignDetails into doPage");

  const { doThings, doNotThings } = campaignDetails;

  //do things

  const ulContentMatchdoThings = doThings?.match(/<ul>(.*?)<\/ul>/s);
  const uldoThingsContent = ulContentMatchdoThings
    ? ulContentMatchdoThings[1]
    : "";

  const listItemsOfdoThings = uldoThingsContent
    ? uldoThingsContent.match(/<li>(.*?)<\/li>/gs)
    : [];

  //

  //do not thing
  const ulContentMatchdoNotThings = doNotThings?.match(/<ul>(.*?)<\/ul>/s);
  const uldoNotThingsContent = ulContentMatchdoNotThings
    ? ulContentMatchdoNotThings[1]
    : "";

  const listItemsOfdoNotThings = uldoNotThingsContent
    ? uldoNotThingsContent.match(/<li>(.*?)<\/li>/gs)
    : [];
  ///
  return (
    <>
      <Box
        as="div"
        sx={{
          display: "flex",
          width: "100%",
          gap: "1.8rem",
        }}
      >
        <Box
          sx={{
            backgroundColor: "white",
            boxShadow: "0px 5px 30px 0px rgba(0, 0, 0, 0.1)",
            borderRadius: "1.8rem",
            gap: "1.8rem",
            padding: "1.8rem",
            width: "100%",
          }}
        >
          <Box
            as="div"
            sx={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}
          >
            <Typography variant="h2">Do</Typography>

            {listItemsOfdoThings && listItemsOfdoThings.length > 0 && (
              <ul
                style={{
                  padding: "1.5rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.8rem",
                }}
              >
                {listItemsOfdoThings.map((item, index) => (
                  <li key={`list-item-${index}`} style={{ color: "#777777" }}>
                    {item.replace(/<\/?li>/g, "")}
                  </li>
                ))}
              </ul>
            )}
          </Box>
        </Box>

        <Box
          sx={{
            backgroundColor: "white",
            boxShadow: "0px 5px 30px 0px rgba(0, 0, 0, 0.1)",
            borderRadius: "1.8rem",
            gap: "1.8rem",
            padding: "1.8rem",
            width: "100%",
          }}
        >
          <Box
            as="div"
            sx={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}
          >
            <Typography variant="h2">Don’t</Typography>

            {listItemsOfdoNotThings && listItemsOfdoNotThings.length > 0 && (
              <ul
                style={{
                  padding: "1.5rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.8rem",
                }}
              >
                {listItemsOfdoNotThings.map((item, index) => (
                  <li key={`list-item-${index}`} style={{ color: "#777777" }}>
                    {item.replace(/<\/?li>/g, "")}
                  </li>
                ))}
              </ul>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default DoPage;
