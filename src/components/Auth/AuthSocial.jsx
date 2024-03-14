import { Box, Divider, Stack, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";

const AuthSocial = () => {
  return (
    <div>
      <Stack
        direction="row"
        spacing={"20px"}
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: "35px",
        }}
      >
        <Box sx={{ cursor: "pointer" }}>
          <Image
            src="/images/google_logo.png"
            alt="Google Logo"
            width={60}
            height={60}
          />
        </Box>
        <Box sx={{ cursor: "pointer" }}>
          <Image
            src="/images/facebook_logo.png"
            alt="Facebook Logo"
            width={60}
            height={60}
            sx={{ cursor: "pointer" }}
          />
        </Box>
        <Box sx={{ cursor: "pointer" }}>
          <Image
            src="/images/instagram_logo.png"
            alt="Instagram Logo"
            width={60}
            height={60}
            sx={{ cursor: "pointer" }}
          />
        </Box>
        <Box sx={{ cursor: "pointer" }}>
          <Image
            src="/images/tiktok_logo.png"
            alt="Tiktok Logo"
            width={60}
            height={60}
            sx={{ cursor: "pointer" }}
          />
        </Box>
      </Stack>
      <Divider sx={{ my: 3 }}>
        <Typography
          variant="body2"
          // sx={{ color: "text.secondary" }}
        >
          OR
        </Typography>
      </Divider>
    </div>
  );
};

export default AuthSocial;
