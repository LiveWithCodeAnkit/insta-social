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
          <Typography variant="h2">Info about the brand</Typography>
          <Box>
            <p style={{ color: "#777777" }}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make
            </p>
            <ul
              style={{
                padding: "1.5rem",
                display: "flex",
                flexDirection: "column",
                gap: "1.8rem",
              }}
            >
              <li style={{ color: "#777777" }}>
                <p>
                  It is a long established fact that a reader will be distracted
                  by the readable content of a page when looking at its layout.
                  The point of using Lorem Ipsum is that it has a more-or-less
                  normal distribution of letters, as opposed to using 'Content
                  here, content here', making it look like readable English.
                </p>
              </li>
              <li style={{ color: "#777777" }}>
                <p>
                  There are many variations of passages of Lorem Ipsum
                  available, but the majority have suffered alteration in some
                  form, by injected humour, or randomised words which don't look
                  even slightly believable. If you
                </p>
              </li>
            </ul>
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
