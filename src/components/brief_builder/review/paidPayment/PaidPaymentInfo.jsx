import { Box, Typography } from "@mui/material";
import React from "react";

const PaidPaymentInfo = ({ filteredPaidData }) => {
  if (!filteredPaidData || filteredPaidData.length === 0) {
    return null;
  }

  const amountInfo = filteredPaidData?.[0]?.offerPrice || 0;

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
          <Typography variant="h2">Payment</Typography>
          <Box>
            <Typography variant="body">
              Participating creators will receive a{" "}
              <Typography variant="body" component="span" fontWeight="bold">
                ${amountInfo} Payment
              </Typography>
              &nbsp; after completing the collab
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default PaidPaymentInfo;
