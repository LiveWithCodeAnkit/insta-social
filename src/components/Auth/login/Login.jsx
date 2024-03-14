"use client";

import {
  Box,
  Container,
  Divider,
  Grid,
  InputBase,
  Stack,
  Typography,
} from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import Image from "next/image";
import React from "react";
import AuthSocial from "../AuthSocial";
import LoginForm from "./LoginForm";
import Link from "next/link";
const Login = () => {
  return (
    <Box style={{ height: "100vh" }}>
      <Box
        sx={{
          p: "18px 50px",
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
      </Box>

      <Box px={12} pt={4}>
        <Grid container sx={{ height: "100%" }}>
          <Grid item xs={6} md={6}>
            <Box
              sx={{
                backgroundImage: 'url("/images/auth_background.png")',
                height: "100%",
                backgroundRepeat: "no-repeat",
                backgroundSize: "100% 100%",
              }}
            >
              <Container maxWidth="xs">
                <Box sx={{ textAlign: "center", pt: 3 }}>
                  <Typography
                    sx={{
                      fontSize: "40px",
                      fontWeight: 700,
                      color: "#FFCC33",
                    }}
                  >
                    Login
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "18px",
                      fontWeight: 400,
                      mt: "29px",
                    }}
                  >
                    Welcome back! Please enter your details
                  </Typography>
                </Box>

                <AuthSocial />
                <LoginForm />

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "0.5rem",
                    paddingTop: "1.8rem",
                  }}
                >
                  <Typography variant="body2" align="center">
                    Don’t have an account?
                  </Typography>
                  <Link
                    href="/signup"
                    style={{
                      fontSize: "16px",
                      fontWeight: "400",
                      color: "#FFCC33",
                      textDecoration: "none",
                    }}
                  >
                    Signup for free
                  </Link>
                </Box>
              </Container>
            </Box>
          </Grid>
          <Grid item xs={6} md={6}>
            {/* <Box
              sx={{
                borderRadius: "20px",
                height: "100%",
                width: "70%",
                // background: "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #FFCC33 99.34%)",
              }}
            > */}
            <Container maxWidth="sm" sx={{ ml: 0 }}>
              <Box
                sx={{
                  backgroundImage: 'url("/images/auth_bg_right.png")',
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "100% 100%",
                  height: "700px",
                  borderRadius: "20px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "space-between",
                }}
              >
                <Box sx={{ mt: "auto", p: 4 }}>
                  <Typography
                    sx={{
                      fontSize: "18px",
                      fontWeight: 600,
                      color: "#212121",
                      lineHeight: "26px",
                    }}
                  >
                    Social Media
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "36px",
                      fontWeight: 600,
                      color: "#FFFF",
                      mt: 1,
                      lineHeight: "43px",
                    }}
                  >
                    Social Media Trend with
                    <br /> Mini social
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "18px",
                      fontWeight: 400,
                      color: "#FFFF",
                      mt: 1,
                      lineHeight: "26px",
                    }}
                  >
                    Vitae habitant taciti efficitur volutpat rutrum letius
                    praesent litora proin magna dolor.
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", mt: 3 }}>
                    <Image
                      src="/images/avtar_login.png"
                      alt="Facebook Logo"
                      width={60}
                      height={60}
                      sx={{ cursor: "pointer" }}
                    />
                    <Typography
                      sx={{
                        fontSize: "20px",
                        fontWeight: 600,
                        color: "#212121",
                        lineHeight: "26px",
                        ml: 2,
                      }}
                    >
                      Jane Doe
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Container>
            {/* </Box> */}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Login;
