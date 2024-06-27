"use client";
import React, { useState } from "react";
import { Box, Typography, Card } from "@mui/material";
import ContentForm from "./ContentForm";

const ContentPage = ({ handleTab }) => {
  const [value, setValue] = useState(0);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
          gap: "1.8rem",
        }}
      >
        <Typography variant="h2">Brief Builder</Typography>
        <Card
          sx={{
            padding: "1.8rem",
            borderRadius: "1.8rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "2.18rem",
          }}
        >
          <Box
            as="div"
            sx={{
              width: "100%",
            }}
          >
            <ContentForm handleTab={handleTab} />
          </Box>
        </Card>
      </Box>
    </>
  );
};

export default ContentPage;
