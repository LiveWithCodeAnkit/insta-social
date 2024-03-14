import { Box, Button, Grid, Typography } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Image from "next/image";
import React from "react";

const CoverPage = () => {
  return (
    <div>
      <Box
        sx={{
          p: "18px 50px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Image
          src="/images/logo.png"
          alt="Mini Store Logo"
          //   className={styles.vercelLogo}
          width={128}
          height={55}
          priority
        />
        <Button
          variant="contained"
          type="button"
          sx={{
            "&:hover": { background: "#FFCC33" },
            background: "#FFCC33",
            color: "#212121",
            height: "50px",
            width: "120px",
            borderRadius: "50px",
            fontWeight: 600,
            textTransform: "none",
          }}
        >
          Sign Up
        </Button>
      </Box>
      <Box height={"800px"}>
        <Grid container sx={{ height: "100%" }}>
          <Grid item xs={12} md={4}>
            <Box
              p="50px"
              height={"100%"}
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"center"}
              borderTop={"1px solid #e8e8e8"}
              borderBottom={"1px solid #e8e8e8"}
            >
              <Typography fontSize={40} fontWeight={600}>
                Creator
              </Typography>
              <Typography
                color={"#FFCC33"}
                fontSize={22}
                fontWeight={600}
                sx={{ mt: 1 }}
              >
                Login in as Creator
              </Typography>
              <Box
                sx={{
                  "&:hover": { background: "#ffc003" },
                  background: "#FFCC33",
                  color: "#212121",
                  height: "50px",
                  width: "50px",
                  borderRadius: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  mt: 6,
                  cursor: "pointer",
                }}
              >
                <ArrowForwardIosIcon />
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box
              p="50px"
              height={"100%"}
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"center"}
              border={"1px solid #e8e8e8"}
            >
              <Typography fontSize={40} fontWeight={600}>
                Brand
              </Typography>
              <Typography
                color={"#FFCC33"}
                fontSize={22}
                fontWeight={600}
                sx={{ mt: 1 }}
              >
                Login in as Brand
              </Typography>
              <Box
                sx={{
                  "&:hover": { background: "#ffc003" },
                  background: "#FFCC33",
                  color: "#212121",
                  height: "50px",
                  width: "50px",
                  borderRadius: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  mt: 6,
                  cursor: "pointer",
                }}
              >
                <ArrowForwardIosIcon />
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box
              p="50px"
              height={"100%"}
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"center"}
              borderTop={"1px solid #e8e8e8"}
              borderBottom={"1px solid #e8e8e8"}
            >
              <Typography fontSize={40} fontWeight={600}>
                Admin
              </Typography>
              <Typography
                color={"#FFCC33"}
                fontSize={22}
                fontWeight={600}
                sx={{ mt: 1 }}
              >
                Login in as Admin
              </Typography>
              <Box
                sx={{
                  "&:hover": { background: "#ffc003" },
                  background: "#FFCC33",
                  color: "#212121",
                  height: "50px",
                  width: "50px",
                  borderRadius: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  mt: 6,
                  cursor: "pointer",
                }}
              >
                <ArrowForwardIosIcon />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ textAlign: "center", p: "20px" }}>
        ©{" "}
        <Typography color="#0A7DF2" display={"inline"}>
          inline
        </Typography>
        . 2023. All rights reserved.
      </Box>
    </div>
  );
};

export default CoverPage;
