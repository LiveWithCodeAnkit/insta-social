"use client";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  Icon,
  IconButton,
  InputAdornment,
  InputBase,
  InputLabel,
  Link,
  Stack,
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";
import { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useToastMessages } from "@/components/lib/messages/useToastMessages";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});
const LoginForm = ({ role }) => {
  const router = useRouter();
  const { Success, Error } = useToastMessages();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const TextInput = styled(InputBase)(({ theme }) => ({
    "label + &": {
      marginTop: theme.spacing(3),
    },
    "& .MuiInputBase-input": {
      width: "100%",
      borderRadius: "50px",
      position: "relative",
      backgroundColor: "#FEF5DC",
      border: "2px solid",
      borderColor: "#FEF5DC",
      fontSize: 16,
      padding: "10px 20px",
      transition: theme.transitions.create([
        "border-color",
        "background-color",
        "box-shadow",
      ]),
      "&:focus": {
        borderColor: "#fedd80",
      },
    },
  }));

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleLogin = async (value) => {
    try {
      setLoading(true);
      const values = {
        email: value.email,
        password: value.password,
        role: role,
      };
      const signInRes = await signIn("credentials", {
        ...values,
        redirect: false,
      });

      if (signInRes.error) {
        Error("We are not aware of this user.");
        router.push("/");
      } else {
        Success("Successfully logged in!");
        if (role === "BRAND") {
          router.push("/brief-builder");
        } else {
          router.push("/creator/dashboard/my-campaign");
        }
      }
    } catch (error) {
      console.error("Error during login:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit(handleLogin)}>
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <InputLabel
              shrink
              htmlFor="email"
              sx={{ fontSize: "18px", fontWeight: 600, color: "#212121" }}
            >
              Email
            </InputLabel>
            <FormControl variant="standard" fullWidth>
              <Controller
                control={control}
                name="email"
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    hiddenLabel
                    id="email"
                    name="email"
                    variant="filled"
                    placeholder="Email"
                    sx={{
                      "& .MuiFilledInput-root": {
                        borderRadius: "50px",
                        backgroundColor: "#FEF5DC !important",
                      },
                      "& .MuiFilledInput-input": {
                        borderRadius: "50px",
                      },
                    }}
                    InputProps={{
                      disableUnderline: true,
                    }}
                  />
                )}
              />

              <span style={{ color: "red" }}>{errors.email?.message}</span>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <InputLabel
              shrink
              htmlFor=""
              sx={{ fontSize: "18px", fontWeight: 600, color: "#212121" }}
            >
              Password
            </InputLabel>
            <FormControl variant="standard" fullWidth>
              <Controller
                control={control}
                name="password"
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    hiddenLabel
                    id="password"
                    name="password"
                    variant="filled"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    sx={{
                      "& .MuiFilledInput-root": {
                        borderRadius: "50px",
                        backgroundColor: "#FEF5DC !important",
                        borderColor: "#FEF5DC",
                        // "&:hover": {
                        //   backgroundColor: "#FEF5DC",
                        // },
                      },
                      "& .MuiFilledInput-input": {
                        borderRadius: "50px",
                      },
                    }}
                    InputProps={{
                      disableUnderline: true,
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                            sx={{ marginRight: "1px" }}
                          >
                            <span
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              {showPassword ? (
                                <VisibilityIcon sx={{ color: "#212121" }} />
                              ) : (
                                <VisibilityOffIcon sx={{ color: "#212121" }} />
                              )}
                            </span>
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
              <span style={{ color: "red" }}>{errors.password?.message}</span>
            </FormControl>
          </Grid>
        </Grid>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ my: 2 }}
        >
          <FormControlLabel control={<Checkbox />} label="Keep me logged in" />
          <Link variant="subtitle2" color={"#FFCC33"}>
            Forgot password?
          </Link>
        </Stack>

        <Button
          variant="contained"
          type="submit"
          fullWidth
          disabled={loading}
          sx={{
            "&:hover": { background: "#FFCC33" },
            background: "#FFCC33",
            color: "#212121",
            height: "50px",
            borderRadius: "50px",
            fontWeight: 600,
            textTransform: "none",
            mt: "30px",
          }}
        >
          {loading ? "Loading..." : "Login"}
        </Button>
      </Box>
    </form>
  );
};

export default LoginForm;
