import React from "react";
import Image from "next/image";
import Divider from "@mui/material/Divider";
import { Box, Typography, Card } from "@mui/material";
const Standard = () => {
  return (
    <>
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
          }}
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
        </Card>
        <Card
          variant="outlined"
          sx={{
            width: "23.4rem",
            padding: "1rem",
            height: "21.1rem",
            borderRadius: "1.5rem",
            backgroundColor: "#FFF3AB",
            position: "relative",
          }}
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
    </>
  );
};

export default Standard;
