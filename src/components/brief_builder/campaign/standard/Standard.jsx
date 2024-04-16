import React, { useEffect, useState } from "react";
import Image from "next/image";
import Divider from "@mui/material/Divider";
import { Box, Typography, Card } from "@mui/material";
import { CgArrowLongRight, CgArrowLongLeft } from "react-icons/cg";
import Button from "@mui/material/Button";

const Standard = ({ handleChange, setinfoTittle }) => {
  const [clickedCard, setClickedCard] = useState("Pro");

  useEffect(() => {
    setinfoTittle(clickedCard);
  }, [clickedCard, setinfoTittle]);

  const handleCardClick = (cardType) => {
    setClickedCard(cardType);
  };

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
            backgroundColor:
              clickedCard === "Standard" ? "#FFF3AB" : "transparent",
            cursor: "pointer",
          }}
          onClick={() => handleCardClick("Standard")}
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
            position: "relative",
            backgroundColor: clickedCard === "Pro" ? "#FFF3AB" : "transparent",
            cursor: "pointer",
          }}
          onClick={() => handleCardClick("Pro")}
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "end",
          gap: "0.5rem",
          marginTop: "2rem",
        }}
      >
        <Button
          variant="outlined"
          startIcon={<CgArrowLongLeft />}
          sx={{
            height: "50px",
            width: "147px",
            color: "#212121",
            borderRadius: "50px",
            fontWeight: 600,
            textTransform: "none",
            borderColor: "black",
          }}
        >
          Previous
        </Button>
        <Button
          type="submit"
          sx={{
            background: "#FFCC33",
            color: "#212121",
            height: "50px",
            width: "117px",
            borderRadius: "50px",
            fontWeight: 600,
            textTransform: "none",

            "&:hover": {
              background: "#FFCC33",
            },
          }}
          variant="contained"
          endIcon={<CgArrowLongRight />}
          onClick={() => {
            handleChange(event, 1);
          }}
        >
          Next
        </Button>
      </Box>
    </>
  );
};

export default Standard;
