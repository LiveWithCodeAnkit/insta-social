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
import makeAnimated from "react-select/animated";
import Select from "react-select";
import countryList from "../../../assets/Contries.json";

const CreatorsForm = ({ handleTab }) => {
  const animatedComponents = makeAnimated();
  const { initialValues, loading, schema, submit } = useCreatorsForm({
    handleTab,
  });
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
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.2rem",
                }}
              >
                <Typography
                  variant="label"
                  sx={{ fontSize: "14px", fontWeight: "600" }}
                >
                  Select Country
                </Typography>
                <Controller
                  name="country"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      isMulti
                      closeMenuOnSelect={true}
                      components={animatedComponents}
                      options={countryList.map((item) => ({
                        value: item.name,
                        label: item.name,
                      }))}
                      placeholder="Select country..."
                      classNamePrefix="select"
                      className="basic-multi-select"
                      theme={(theme) => ({
                        ...theme,
                        colors: {
                          ...theme.colors,
                          primary25: "#FFCC33",
                          primary: "#FFCC33",
                        },
                      })}
                      styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          borderColor: state.isFocused ? "#FFCC33" : "#D9D9D9",
                        }),
                        indicatorSeparator: (base) => ({
                          ...base,
                          backgroundColor: "#FFCC33", // Change the indicator color here
                        }),
                        dropdownIndicator: (base, state) => ({
                          ...base,
                          color: "#FFCC33", // Change the dropdown indicator color here
                        }),
                        multiValueRemove: (base, state) => ({
                          ...base,
                          color: "#FFCC33", // Change the color of the close icon here
                          "&:hover": {
                            backgroundColor: "#FFCC33", // Change the background color on hover if needed
                            color: "white", // Change the color on hover if needed
                          },
                        }),
                      }}
                    />
                  )}
                />
                {errors.country && (
                  <Typography
                    variant="caption"
                    color="error"
                    sx={{ marginTop: "0.3rem", fontSize: "0.875rem" }}
                  >
                    {errors.country.message}
                  </Typography>
                )}
              </Box>

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
                    <MenuItem value=" ">Select Gender</MenuItem>
                    <MenuItem value="MALE">Male</MenuItem>
                    <MenuItem value="FEMALE">Female</MenuItem>
                    <MenuItem value="OTHER">Others</MenuItem>
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
                disabled={loading}
                variant="contained"
                endIcon={<CgArrowLongRight />}
              >
                {loading ? "Loading..." : "Next"}
              </Button>
            </Box>
          </Card>
        </Box>
      </form>
    </>
  );
};

export default CreatorsForm;
