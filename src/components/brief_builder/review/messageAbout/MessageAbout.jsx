import React from "react";
import Image from "next/image";
import { Box, Typography } from "@mui/material";

const MessageAbout = ({ campaignDetails, productDetails }) => {
  if (!campaignDetails) {
    return <div>No details available</div>;
  }
  console.log("productDetails :-", productDetails);

  const extractContentBetweenTags = (htmlString, tagName) => {
    const regex = new RegExp(`<${tagName}>(.*?)<\/${tagName}>`, "g");
    const matches = htmlString.match(regex);
    return matches
      ? matches.map((match) =>
          match.replace(`<${tagName}>`, "").replace(`</${tagName}>`, "")
        )
      : [];
  };
  const { campaignMessage, hooks } = campaignDetails;

  const MessageParagraphs = extractContentBetweenTags(campaignMessage, "p");

  // Extract list items from campaignMessage
  const ulContentMatch = campaignMessage.match(/<ul>(.*?)<\/ul>/s);
  const ulMessageContent = ulContentMatch ? ulContentMatch[1] : "";
  const listItemsOfMessage = ulMessageContent
    ? ulMessageContent.match(/<li>(.*?)<\/li>/gs)
    : [];

  // Extract list items from hooks
  const ulContentMatchHook = hooks.match(/<ul>(.*?)<\/ul>/s);
  const ulHookContent = ulContentMatchHook ? ulContentMatchHook[1] : "";
  const listItemsOfHook = ulHookContent
    ? ulHookContent.match(/<li>(.*?)<\/li>/gs)
    : [];

  return (
    <>
      <Box
        sx={{
          backgroundColor: "white",
          boxShadow: "0px 5px 30px 0px rgba(0, 0, 0, 0.1)",
          padding: "1.8rem",
          borderRadius: "1.8rem",
          gap: "1.8rem",
        }}
      >
        <Box
          as="div"
          sx={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}
        >
          <Typography variant="h2">Messaging</Typography>
          <Box>
            <p style={{ color: "#777777" }}>{MessageParagraphs}</p>

            {listItemsOfMessage && listItemsOfMessage.length > 0 && (
              <ul
                style={{
                  padding: "1.5rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.8rem",
                }}
              >
                {listItemsOfMessage.map((item, index) => (
                  <li key={`list-item-${index}`} style={{ color: "#777777" }}>
                    {item.replace(/<\/?li>/g, "")}
                  </li>
                ))}
              </ul>
            )}
          </Box>
        </Box>
        <Box
          as="div"
          sx={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}
        >
          <Typography variant="h2">Hooks</Typography>

          {listItemsOfHook && listItemsOfHook.length > 0 && (
            <ul
              style={{
                padding: "1.5rem",
                display: "flex",
                flexDirection: "column",
                gap: "1.8rem",
              }}
            >
              {listItemsOfHook.map((item, index) => (
                <li key={`list-item-${index}`} style={{ color: "#777777" }}>
                  {item.replace(/<\/?li>/g, "")}
                </li>
              ))}
            </ul>
          )}
        </Box>
        <Box
          as="div"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1.2rem",
          }}
        >
          <Typography variant="h2">Product Info</Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              gap: "1.8rem",
            }}
          >
            <Image
              src={"/images/reviewone.png"}
              alt="infopic"
              width={400}
              height={400}
            />

            <Box
              as="div"
              sx={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}
            >
              <Typography variant="h2">Product Name</Typography>
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
              >
                <p style={{ color: "#777777" }}>
                  Contrary to popular belief, Lorem Ipsum is not simply random
                  text. It has roots in a piece of classical Latin literature
                  from 45 BC, making it over 2000 years old. Richard McClintock,
                  a Latin professor at Hampden-Sydney College in Virginia,
                  looked up one of the more obscure Latin words, consectetur,
                  from a Lorem Ipsum passage, and going through the cites of the
                  word in classical literature, discovered the undoubtable
                  source
                </p>
                <p style={{ color: "#777777" }}>
                  There are many variations of passages of Lorem Ipsum
                  available, but the majority have suffered alteration in some
                  form, by injected humour, or randomised words which don't look
                  even slightly believable. If you are going to use a passage of
                  Lorem Ipsum, you need to be sure there isn't anything
                  embarrassing hidden in the middle of text. All the Lorem Ipsum
                  generators on the Internet tend to repeat predefined chunks as
                  necessary, making this the first true generator on the
                  Internet. It uses a dictionary of over 200 Latin words,
                  combined with a handful of model sentence structures, to
                  generate Lorem Ipsum which looks reasonable. The generated
                  Lorem Ipsum is therefore always free from repetition, injected
                  humour, or non-characteristic words etc.
                </p>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default MessageAbout;
