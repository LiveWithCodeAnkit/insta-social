import React from "react";
import { Box, Typography, Card } from "@mui/material";
import Button from "@mui/material/Button";
import { BiPlus } from "react-icons/bi";

const ProductDetailsForm = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "end",
            padding: "1rem",
          }}
        >
          <Button
            sx={{
              background: "#FFCC33",
              color: "#212121",
              padding: "0.8rem",
              borderRadius: "50px",
              fontWeight: 600,
              textTransform: "none",

              "&:hover": {
                background: "#FFCC33",
              },
            }}
            variant="contained"
            startIcon={<BiPlus />}
            onClick={() => handleAddGiftCard()}
          >
            Add Another
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default ProductDetailsForm;
