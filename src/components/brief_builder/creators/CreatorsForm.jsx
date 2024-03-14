"use client";
import React from "react";
import Button from "@mui/material/Button";
import Slider from "@mui/material/Slider";
import MenuItem from "@mui/material/MenuItem";
import { Box, Typography, Card } from "@mui/material";
import CustomTextField from "../../common/text-field";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import { CgArrowLongRight, CgArrowLongLeft } from "react-icons/cg";
import { useCreatorsForm } from "../hook";

const CreatorsForm = () => {
  const { initialValues, schema, submit } = useCreatorsForm();
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initialValues,
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  return (
    <>
      <form onSubmit={handleSubmit(submit)}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
            gap: "1.8rem",
          }}
        >
          <Typography variant="h2">Brief Builder</Typography>
          <Card
            sx={{
              padding: "1.8rem",
              borderRadius: "1.8rem",
            }}
          >
            <Box
              sx={{
                width: "auto",
                display: "flex",
                gap: "1.8rem",
                width: "68%",
              }}
            >
              <Controller
                name="country"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    select
                    fullWidth
                    value={value}
                    sx={{ mb: 4 }}
                    label="Select Country"
                    onChange={onChange}
                    error={Boolean(errors.country)}
                    {...(errors.country && {
                      helperText: errors.country.message,
                    })}
                  >
                    <MenuItem value="usa">USA</MenuItem>
                    <MenuItem value="India">India</MenuItem>
                    <MenuItem value="Itly">Itly</MenuItem>
                  </CustomTextField>
                )}
              />

              <Controller
                name="gender"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    select
                    fullWidth
                    value={value}
                    sx={{ mb: 4 }}
                    label="Select Gender"
                    onChange={onChange}
                    error={Boolean(errors.gender)}
                    {...(errors.gender && {
                      helperText: errors.gender.message,
                    })}
                  >
                    <MenuItem value="MALE">Male</MenuItem>
                    <MenuItem value="FEMALE">Female</MenuItem>
                    <MenuItem value="OTHERS">Others</MenuItem>
                  </CustomTextField>
                )}
              />
            </Box>
            <Box
              sx={{
                width: "30.9rem",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  variant="label"
                  sx={{ fontSize: "16px", fontWeight: "600" }}
                >
                  Age
                </Typography>
                <Typography
                  variant="span"
                  sx={{ fontSize: "14px", fontWeight: "400" }}
                >
                  (Between 18 and 35)
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  alignItems: "start",
                }}
              >
                <Controller
                  name="age"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <>
                      <Slider
                        aria-label="age"
                        min={18}
                        max={35}
                        value={value}
                        onChange={(e, newValue) => onChange(newValue)}
                        color="primary"
                        sx={{
                          height: "14px",
                        }}
                      />
                      <Box
                        as="div"
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          width: "100%",
                        }}
                      >
                        <Typography
                          variant="span"
                          sx={{
                            fontSize: "14px",
                            fontWeight: "400",
                            padding: "0.1rem",
                          }}
                        >
                          Min : {value[0]}
                        </Typography>

                        <Typography
                          variant="span"
                          sx={{
                            fontSize: "14px",
                            fontWeight: "400",
                            padding: "0.1rem",
                          }}
                        >
                          Max : {value[1]}
                        </Typography>
                      </Box>
                    </>
                  )}
                />
              </Box>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "end", gap: "0.5rem" }}>
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
              >
                Next
              </Button>
            </Box>
          </Card>
        </Box>
      </form>
    </>
  );
};

export default CreatorsForm;
