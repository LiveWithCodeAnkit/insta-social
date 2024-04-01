import React from "react";
import Image from "next/image";
import { Box, Typography } from "@mui/material";
const MessageAbout = ({ campaignCreatorData }) => {
  const campaignDetails = campaignCreatorData?.campaignDetails || "";
  const productDetails = campaignCreatorData?.productDetails || "";

  console.log(campaignDetails, "messageAbout");
  console.log(productDetails, "productDetails into messageAbout");

  const extractContentBetweenTags = (htmlString, tagName) => {
    const regex = new RegExp(`<${tagName}>(.*?)<\/${tagName}>`, "g");
    const matches = htmlString?.match(regex);
    return matches
      ? matches.map((match) =>
          match.replace(`<${tagName}>`, "").replace(`</${tagName}>`, "")
        )
      : [];
  };
  const { campaignMessage, hooks } = campaignDetails;

  // productDetails extract
  const { info, productHooks } = productDetails;

  const MessageParagraphs = extractContentBetweenTags(campaignMessage, "p");

  // const ProductParagraphs = extractContentBetweenTags(info, "p");

  // console.log(ProductParagraphs)

  // Extract list items from campaignMessage
  const ulContentMatch = campaignMessage?.match(/<ul>(.*?)<\/ul>/s);
  const ulMessageContent = ulContentMatch ? ulContentMatch[1] : "";
  const listItemsOfMessage = ulMessageContent
    ? ulMessageContent.match(/<li>(.*?)<\/li>/gs)
    : [];

  // Extract list items from hooks
  const ulContentMatchHook = hooks?.match(/<ul>(.*?)<\/ul>/s);
  const ulHookContent = ulContentMatchHook ? ulContentMatchHook[1] : "";
  const listItemsOfHook = ulHookContent
    ? ulHookContent.match(/<li>(.*?)<\/li>/gs)
    : [];

  // Extract list items from campaignMessage
  // const ulContentProductMatch = info?.match(/<ul>(.*?)<\/ul>/s);
  // const ulMessageProductContent = ulContentProductMatch
  //   ? ulContentProductMatch[1]
  //   : "";
  // const listItemsOfProduct = ulMessageProductContent
  //   ? ulMessageProductContent.match(/<li>(.*?)<\/li>/gs)
  //   : [];

  return (
    <>
      <Box
        sx={{
          backgroundColor: "white",
          boxShadow: "0px 5px 30px 0px rgba(0, 0, 0, 0.1)",
          padding: "1.8rem",
          borderRadius: "1.8rem",
          gap: "1.8rem",
          width: "100%",
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
          sx={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
        >
          <Typography variant="h2">Hooks</Typography>

          <Box>
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
          <Box>
            {productDetails &&
              productDetails?.map((product, index) => (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "",
                    gap: "1.8rem",
                  }}
                >
                  {product?.images?.map((productImage, index) => (
                    <Image
                      src={`/${productImage}`}
                      alt={`Image ${index}`}
                      width={400}
                      height={400}
                    />
                  ))}

                  <Box
                    as="div"
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "1.2rem",
                    }}
                  >
                    <Typography variant="h2">{product?.name}</Typography>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "1.5rem",
                      }}
                    >
                      <p style={{ color: "#777777" }}>{product?.info}</p>
                    </Box>
                  </Box>
                </Box>
              ))}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default MessageAbout;
