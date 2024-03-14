"use client";

import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  InputBase,
  InputLabel,
  Link,
  Stack,
  TextField,
  styled,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import { useForm, Controller } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { useSignup } from "../hook";

const SignupForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const { initialValues, schema, submit } = useSignup();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });
  return (
    <form onSubmit={handleSubmit(submit)}>
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <InputLabel
              shrink
              htmlFor=""
              sx={{ fontSize: "18px", fontWeight: 600, color: "#212121" }}
            >
              First Name
            </InputLabel>
            <FormControl variant="standard">
              <Controller
                name="firstName"
                control={control}
                rules={{ required: true }}
                defaultValue={initialValues.firstName}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    hiddenLabel
                    id="firstName"
                    name="firstName"
                    variant="filled"
                    type="text"
                    placeholder="First Name"
                    value={value}
                    onChange={onChange}
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
              <span style={{ color: "red" }}>{errors.firstName?.message}</span>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <InputLabel
              shrink
              htmlFor=""
              sx={{ fontSize: "18px", fontWeight: 600, color: "#212121" }}
            >
              Last Name
            </InputLabel>
            <FormControl variant="standard">
              <Controller
                name="lastName"
                control={control}
                rules={{ required: true }}
                defaultValue={initialValues.lastName}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    hiddenLabel
                    id="lastName"
                    name="lastName"
                    variant="filled"
                    type="text"
                    placeholder="Last Name"
                    value={value}
                    onChange={onChange}
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
              <span style={{ color: "red" }}>{errors.lastName?.message}</span>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <InputLabel
              shrink
              htmlFor=""
              sx={{ fontSize: "18px", fontWeight: 600, color: "#212121" }}
            >
              Email
            </InputLabel>
            <FormControl variant="standard" fullWidth>
              <Controller
                name="email"
                control={control}
                rules={{ required: true }}
                defaultValue={initialValues.email}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    hiddenLabel
                    id="email"
                    name="email"
                    variant="filled"
                    type="text"
                    placeholder="abc@gmail.com"
                    value={value}
                    onChange={onChange}
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
              htmlFor="password"
              sx={{ fontSize: "18px", fontWeight: 600, color: "#212121" }}
            >
              Password
            </InputLabel>
            <FormControl fullWidth>
              <Controller
                name="password"
                control={control}
                rules={{ required: true }}
                defaultValue={initialValues.password}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    hiddenLabel
                    id="password"
                    name="password"
                    variant="filled"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={value}
                    onChange={onChange}
                    sx={{
                      "& .MuiFilledInput-root": {
                        borderRadius: "50px",
                        backgroundColor: "#FEF5DC !important",
                        borderColor: "#FEF5DC",
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
          <Grid item xs={12}>
            <InputLabel
              shrink
              htmlFor=""
              sx={{ fontSize: "18px", fontWeight: 600, color: "#212121" }}
            >
              Confirm Password
            </InputLabel>
            <FormControl variant="standard" fullWidth>
              <Controller
                name="confirmPassword"
                control={control}
                rules={{ required: true }}
                defaultValue={initialValues.confirmPassword}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    hiddenLabel
                    id="confirmPassword"
                    name="confirmPassword"
                    variant="filled"
                    type={showPasswordConfirm ? "text" : "password"}
                    placeholder="Confirm Password"
                    value={value}
                    onChange={onChange}
                    sx={{
                      "& .MuiFilledInput-root": {
                        borderRadius: "50px",
                        backgroundColor: "#FEF5DC !important",
                        borderColor: "#FEF5DC",
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
                            onClick={() =>
                              setShowPasswordConfirm(!showPasswordConfirm)
                            }
                            edge="end"
                            sx={{ marginRight: "1px" }}
                          >
                            <span
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              {showPasswordConfirm ? (
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
              <span style={{ color: "red" }}>
                {errors.confirmPassword?.message}
              </span>
            </FormControl>
          </Grid>
        </Grid>

        <Button
          variant="contained"
          type="submit"
          fullWidth
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
          Create an Account
        </Button>
      </Box>
    </form>
  );
};

export default SignupForm;
