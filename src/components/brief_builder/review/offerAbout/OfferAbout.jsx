import React from "react";
import Image from "next/image";
import { Box, Typography } from "@mui/material";
import { aboutOffer } from "../../constants";

const OfferAbout = () => {
  return (
    <>
      <Box
        sx={{
          backgroundColor: "white",
          boxShadow: "0px 5px 30px 0px rgba(0, 0, 0, 0.1)",
          padding: "1.8rem",
          borderRadius: "1.8rem",
          display: "flex",
          justifyContent: "space-between",
          gap: "1.8rem",
          width: "100%",
        }}
      >
        <Box
          as="div"
          sx={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}
        >
          <Typography variant="h2">Info about the offer</Typography>
          {aboutOffer.map((offer) => (
            <Box
              key={offer.id}
              as="div"
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "start",
                gap: "1.2rem",
              }}
            >
              <Image
                src={offer.offerProductImage}
                alt="infopic"
                width={300}
                height={300}
              />
              <Box
                as="div"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  gap: "1.2rem",
                }}
              >
                <Typography variant="h2">{offer.offerProduct}</Typography>
                <p style={{ color: "#777777", width: "100%" }}>
                  {offer.offerProductDes}
                </p>
                <Box
                  as="div"
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    gap: "1.5rem",
                  }}
                >
                  <Box
                    as="div"
                    sx={{
                      display: "flex",
                      gap: "1.8rem",
                    }}
                  >
                    <Box
                      as="div"
                      sx={{
                        padding: "1rem",
                        backgroundColor: "#FFF5D6",
                        borderRadius: "10px",
                      }}
                    >
                      <label>Website : brandwebsite.com</label>
                    </Box>
                    <Box
                      as="div"
                      sx={{
                        padding: "1rem",
                        backgroundColor: "#FFF5D6",
                        borderRadius: "10px",
                      }}
                    >
                      <label>Instagram : @brand</label>
                    </Box>
                  </Box>
                  <Box
                    as="div"
                    sx={{
                      display: "flex",
                      gap: "1.8rem",
                    }}
                  >
                    <Box
                      as="div"
                      sx={{
                        display: "flex",
                        justifyContent: "start",
                        gap: "0.3rem",
                      }}
                    >
                      <label style={{ fontSize: "18px", color: "#777777" }}>
                        Color:
                      </label>
                      <label style={{ fontSize: "18px", color: "#C1121F" }}>
                        {offer.offerColor}
                      </label>
                    </Box>
                    <Box
                      as="div"
                      sx={{
                        display: "flex",
                        justifyContent: "start",
                        gap: "0.3rem",
                      }}
                    >
                      <label style={{ fontSize: "18px", color: "#777777" }}>
                        Size:
                      </label>
                      <label style={{ fontSize: "18px", color: "#C1121F" }}>
                        {offer.offerSize}
                      </label>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default OfferAbout;
