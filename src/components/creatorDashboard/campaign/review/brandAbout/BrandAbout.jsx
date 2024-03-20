import React from "react";
import Image from "next/image";
import { Box, Typography } from "@mui/material";
const BrandAbout = () => {
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
        }}
      >
        {/* <Image
          src={"/images/reviewone.png"}
          alt="infopic"
          width={400}
          height={400}
        /> */}

        <Box
          as="div"
          sx={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}
        >
          <Typography variant="h2">About the brand</Typography>
          <Box>
            <p style={{ color: "#777777" }}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised when an unknown printer took a galley of type and
              scrambled it to make a type specimen book.
            </p>
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
        </Box>
      </Box>
    </>
  );
};

export default BrandAbout;
