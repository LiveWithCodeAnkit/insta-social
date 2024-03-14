import React from "react";
import { Box, Typography } from "@mui/material";

const DoPage = () => {
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
          }}
        >
          <Box
            as="div"
            sx={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}
          >
            <Typography variant="h2">Do</Typography>

            <ul
              style={{
                padding: "1.5rem",
                display: "flex",
                flexDirection: "column",
                gap: "1.8rem",
              }}
            >
              {[...Array(4)].map((_, index) => (
                <li key={index} style={{ color: "#777777" }}>
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard
                  </p>
                </li>
              ))}
            </ul>
          </Box>
        </Box>

        <Box
          sx={{
            backgroundColor: "white",
            boxShadow: "0px 5px 30px 0px rgba(0, 0, 0, 0.1)",
            borderRadius: "1.8rem",
            gap: "1.8rem",
            padding: "1.8rem",
          }}
        >
          <Box
            as="div"
            sx={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}
          >
            <Typography variant="h2">Don’t</Typography>

            <ul
              style={{
                padding: "1.5rem",
                display: "flex",
                flexDirection: "column",
                gap: "1.8rem",
              }}
            >
              {[...Array(4)].map((_, index) => (
                <li key={index} style={{ color: "#777777" }}>
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard
                  </p>
                </li>
              ))}
            </ul>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default DoPage;
