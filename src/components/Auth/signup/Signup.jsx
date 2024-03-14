import React from "react";
import SignupForm from "./SignupForm";
import { Box, Container, Grid, Typography } from "@mui/material";
import Image from "next/image";
import AuthSocial from "../AuthSocial";
import Link from "next/link";
const SignUp = () => {
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
          width={128}
          height={55}
          priority
        />
      </Box>

      <Box px={12}>
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
                <Box sx={{ textAlign: "center" }}>
                  <Typography
                    sx={{
                      fontSize: "40px",
                      fontWeight: 700,
                      color: "#FFCC33",
                    }}
                  >
                    Sign Up Brands
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "18px",
                      fontWeight: 400,
                      mt: "30px",
                    }}
                  >
                    Create a new account!
                  </Typography>
                </Box>

                <AuthSocial />
                <SignupForm />

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "0.5rem",
                    paddingTop: "1.8rem",
                  }}
                >
                  <Typography variant="body2" align="center">
                    Already I have an account?
                  </Typography>
                  <Link
                    href="/"
                    style={{
                      fontSize: "16px",
                      fontWeight: "400",
                      color: "#FFCC33",
                      textDecoration: "none",
                    }}
                  >
                    Sign in
                  </Link>
                </Box>
              </Container>
            </Box>
          </Grid>
          <Grid
            item
            xs={6}
            md={6}
            sx={{ display: "flex", alignItems: "center" }}
          >
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

export default SignUp;
