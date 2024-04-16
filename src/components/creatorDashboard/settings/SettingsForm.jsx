"use client";
import React, { useEffect } from "react";
import CustomTextField from "@/components/common/text-field";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import {
  Box,
  Button,
  Grid,
  InputLabel,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { useSettingForm } from "../hook";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import { getCreatorProfileByCreator } from "../../../../store/campaign_request/campaignRequest.slice";
import { useDispatch, useSelector } from "react-redux";
import makeAnimated from "react-select/animated";
import Select from "react-select";
import countryList from "../../../assets/Contries.json";
import dayjs from "dayjs";

const SettingsForm = () => {
  const { initialValues, loading, schema, submit } = useSettingForm({});
  const dispatch = useDispatch();
  const animatedComponents = makeAnimated();
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

  // const handleCancel = () => {
  //   const { email, ...fieldsToReset } = initialValues;
  //   reset({ ...fieldsToReset, email: getCreatorData?.email || "" });
  // };

  useEffect(() => {
    dispatch(getCreatorProfileByCreator());
  }, []);

  const getCreatorData = useSelector(
    (state) =>
      state.CampaignRequest?.getCreatorProfileByCreator
        ?.getCreatorProfileByCreatorData
  );

  // console.log("getCreatorData", getCreatorData);

  const getDatebyCreator = getCreatorData
    ? new Date(getCreatorData?.dob)?.toLocaleDateString().substring(0, 10)
    : null;

  useEffect(() => {
    if (getCreatorData) {
      reset({
        firstName: getCreatorData?.firstName || "",
        lastName: getCreatorData?.lastName || "",
        gender: getCreatorData?.gender || " ",
        language: getCreatorData?.language?.join(", ") || " ",
        instagramUserName:
          getCreatorData?.socialMediaLinks?.find(
            (link) => link?.platForm === "Instagram"
          )?.userName || "",
        tiktokUserName:
          getCreatorData?.socialMediaLinks?.find(
            (link) => link?.platForm === "Tiktok"
          )?.userName || "",
        dob: new Date(getCreatorData?.dob) || null,
        email: getCreatorData?.email || "",
        phone: getCreatorData?.phone || "",
        address1: getCreatorData?.address1 || "",
        address2: getCreatorData?.address2 || "",
        cityName: getCreatorData?.city || "",
        stateName: getCreatorData?.state || "",
        postalCode: getCreatorData?.postalCode || "",
        countryName:
          { value: getCreatorData.country, label: getCreatorData.country } ||
          " ",
      });
    }
  }, [getCreatorData]);

  return (
    <form onSubmit={handleSubmit(submit)}>
      <Box
        sx={{
          backgroundColor: "white",
          boxShadow: "0px 5px 30px 0px rgba(0, 0, 0, 0.1)",
          padding: "1.8rem",
          borderRadius: "1.8rem",
          gap: "1.8rem",
        }}
      >
        <Box
          as="div"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1.2rem",
            justifyContent: "center",
          }}
        >
          <Typography variant="h3">Personal Information</Typography>

          <Grid
            container
            sx={{ display: "flex", flexDirection: "row", mb: 1 }}
            spacing={2}
            columns={{ xs: 4, sm: 8, md: 12, lg: 12 }}
          >
            <Grid item xs={4}>
              <Controller
                name="firstName"
                control={control}
                defaultValue={initialValues.firstName}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    label="First Name"
                    onChange={onChange}
                    placeholder="First Name"
                    error={Boolean(errors.firstName)}
                    {...(errors.firstName && {
                      helperText: errors.firstName.message,
                    })}
                  />
                )}
              />
            </Grid>
            <Grid item xs={4}>
              <Controller
                name="lastName"
                control={control}
                defaultValue={initialValues.lastName}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    label="Last Name"
                    onChange={onChange}
                    placeholder="Last Name"
                    error={Boolean(errors.lastName)}
                    {...(errors.lastName && {
                      helperText: errors.lastName.message,
                    })}
                  />
                )}
              />
            </Grid>
            <Grid item xs={4}>
              <Controller
                name="gender"
                control={control}
                defaultValue={initialValues.gender}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    select
                    fullWidth
                    value={value}
                    defaultValue=""
                    label="Gender"
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
            </Grid>
          </Grid>

          <Grid
            container
            sx={{ display: "flex", flexDirection: "row", mb: 1 }}
            spacing={2}
            columns={{ xs: 4, sm: 8, md: 12, lg: 12 }}
          >
            <Grid item xs={4}>
              <Controller
                name="language"
                control={control}
                defaultValue={initialValues.language}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    select
                    fullWidth
                    value={value}
                    defaultValue=""
                    label="Select language"
                    onChange={onChange}
                    error={Boolean(errors.language)}
                    {...(errors.language && {
                      helperText: errors.language.message,
                    })}
                  >
                    <MenuItem value=" ">Select language</MenuItem>
                    <MenuItem value="English">English</MenuItem>
                    <MenuItem value="Hindi">Hindi</MenuItem>
                    <MenuItem value="Other">Others</MenuItem>
                  </CustomTextField>
                )}
              />
            </Grid>
            <Grid item xs={4}>
              <Controller
                name="instagramUserName"
                control={control}
                defaultValue={initialValues.instagramUserName}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    label="Instagram Username"
                    onChange={onChange}
                    placeholder="@Jackie.Fuentes"
                    error={Boolean(errors.instagramUserName)}
                    {...(errors.instagramUserName && {
                      helperText: errors.instagramUserName.message,
                    })}
                  />
                )}
              />
            </Grid>
            <Grid item xs={4}>
              <Controller
                name="tiktokUserName"
                control={control}
                defaultValue={initialValues.tiktokUserName}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    label="TikTok Username"
                    onChange={onChange}
                    placeholder="@Jackie.Fuentes"
                    error={Boolean(errors.tiktokUserName)}
                    {...(errors.tiktokUserName && {
                      helperText: errors.tiktokUserName.message,
                    })}
                  />
                )}
              />
            </Grid>
          </Grid>

          <Grid
            container
            sx={{ display: "flex", flexDirection: "row", mb: 1 }}
            spacing={2}
            columns={{ xs: 4, sm: 8, md: 12, lg: 12 }}
          >
            <Grid item xs={4}>
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                sx={{
                  "& MuiStack-root": {
                    gap: "3px",
                  },
                }}
              >
                <DemoItem
                  label={
                    <Typography
                      variant="label"
                      sx={{
                        fontSize: "14px",
                        fontWeight: "600",
                        // "& .MuiFormControl-root": {
                        //   marginTop: "3px !important",
                        // },
                      }}
                    >
                      DOB
                    </Typography>
                  }
                >
                  <Controller
                    name="dob"
                    control={control}
                    defaultValue={initialValues.dob}
                    render={({ field: { value, onChange } }) => (
                      <DatePicker
                        value={dayjs(value)}
                        onChange={onChange}
                        placeholder="dob"
                        sx={{
                          // width: "30rem",
                          "& .MuiOutlinedInput-input": {
                            padding: "10.5px 14px",
                          },
                          "& .MuiFormControl-root.MuiTextField-root": {
                            marginTop: "3px !important",
                          },
                          borderColor: errors.dob ? "red" : "black",
                        }}
                      />
                    )}
                  />
                  {errors.dob && (
                    <Typography variant="caption" color="error">
                      {errors.dob.message}
                    </Typography>
                  )}
                </DemoItem>
              </LocalizationProvider>
            </Grid>
            <Grid item xs={4}>
              <Controller
                name="email"
                control={control}
                defaultValue={initialValues.email}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    label="Email"
                    disabled
                    onChange={onChange}
                    placeholder="Jackie.Fuentes@gmail.com"
                    error={Boolean(errors.email)}
                    {...(errors.email && {
                      helperText: errors.email.message,
                    })}
                  />
                )}
              />
            </Grid>
            <Grid item xs={4}>
              <Controller
                name="phone"
                control={control}
                defaultValue={initialValues.phone}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    label="Phone"
                    onChange={onChange}
                    placeholder="+41 123 4567 890"
                    error={Boolean(errors.phone)}
                    {...(errors.phone && {
                      helperText: errors.phone.message,
                    })}
                  />
                )}
              />
            </Grid>
          </Grid>

          <Grid
            container
            sx={{ display: "flex", flexDirection: "row", mb: 1 }}
            spacing={2}
            columns={{ xs: 4, sm: 8, md: 12, lg: 12 }}
          >
            <Grid item xs={6}>
              <InputLabel
                htmlFor="address1"
                sx={{
                  mb: 1,
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "#212121",
                }}
              >
                Address
              </InputLabel>
              <Controller
                name="address1"
                control={control}
                defaultValue={initialValues.address1}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    fullWidth
                    value={value}
                    multiline
                    rows={4}
                    onChange={onChange}
                    placeholder="Address 1"
                    error={Boolean(errors.address1)}
                    {...(errors.address1 && {
                      helperText: errors.address1.message,
                    })}
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <InputLabel
                htmlFor="address2"
                sx={{
                  mb: 1,
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "#212121",
                }}
              >
                Address 2
              </InputLabel>
              <Controller
                name="address2"
                control={control}
                defaultValue={initialValues.address2}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    fullWidth
                    value={value}
                    multiline
                    rows={4}
                    onChange={onChange}
                    placeholder="Address 2"
                    error={Boolean(errors.address2)}
                    {...(errors.address2 && {
                      helperText: errors.address2.message,
                    })}
                  />
                )}
              />
            </Grid>
          </Grid>

          <Grid
            container
            sx={{ display: "flex", flexDirection: "row", mb: 1 }}
            spacing={2}
            columns={{ xs: 4, sm: 8, md: 12, lg: 12 }}
          >
            <Grid item xs={3}>
              <Controller
                name="cityName"
                control={control}
                defaultValue={initialValues.cityName}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    label="City"
                    onChange={onChange}
                    placeholder="Dietrichbury"
                    error={Boolean(errors.cityName)}
                    {...(errors.cityName && {
                      helperText: errors.cityName.message,
                    })}
                  />
                )}
              />
            </Grid>
            <Grid item xs={3}>
              <Controller
                name="stateName"
                control={control}
                defaultValue={initialValues.stateName}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    label="State"
                    onChange={onChange}
                    placeholder="Virginia"
                    error={Boolean(errors.stateName)}
                    {...(errors.stateName && {
                      helperText: errors.stateName.message,
                    })}
                  />
                )}
              />
            </Grid>
            <Grid item xs={3}>
              <Controller
                name="postalCode"
                control={control}
                defaultValue={initialValues.postalCode}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    label="Postal Code"
                    onChange={onChange}
                    placeholder="04265-8757"
                    error={Boolean(errors.postalCode)}
                    {...(errors.postalCode && {
                      helperText: errors.postalCode.message,
                    })}
                  />
                )}
              />
            </Grid>
            <Grid item xs={3}>
              {/* <Controller
                name="countryName"
                control={control}
                defaultValue={initialValues.countryName}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    select
                    fullWidth
                    value={value}
                    label="Country"
                    onChange={onChange}
                    error={Boolean(errors.countryName)}
                    {...(errors.countryName && {
                      helperText: errors.countryName.message,
                    })}
                  >
                    <MenuItem value=" ">Select Country</MenuItem>
                    <MenuItem value="USA">USA</MenuItem>
                    <MenuItem value="INDIA">India</MenuItem>
                    <MenuItem value="ITLY">Itly</MenuItem>
                  </CustomTextField>
                )}
              /> */}
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
                  Country
                </Typography>
                <Controller
                  name="countryName"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      isMulti={false}
                      closeMenuOnSelect={true}
                      value={field.value}
                      components={animatedComponents}
                      options={countryList.map((item) => ({
                        value: item.name,
                        label: item.name,
                      }))}
                      onChange={(value) => field.onChange(value)}
                      placeholder="Select Country"
                      classNamePrefix="select"
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
                          backgroundColor: "#FFCC33",
                        }),
                        dropdownIndicator: (base, state) => ({
                          ...base,
                          color: "#FFCC33",
                        }),
                        multiValueRemove: (base, state) => ({
                          ...base,
                          color: "#FFCC33",
                          "&:hover": {
                            backgroundColor: "#FFCC33",
                            color: "white",
                          },
                        }),
                      }}
                    />
                  )}
                />
                {errors.countryName && (
                  <Typography
                    variant="caption"
                    color="error"
                    sx={{ marginTop: "0.3rem", fontSize: "0.875rem" }}
                  >
                    {errors.countryName.message}
                  </Typography>
                )}
              </Box>
            </Grid>
          </Grid>

          <Box sx={{ display: "flex", flexDirection: "row", gap: "20px" }}>
            <Button
              variant="contained"
              type="submit"
              sx={{
                "&:hover": { background: "#FFCC33" },
                background: "#FFCC33",
                color: "#212121",
                height: "50px",
                width: "140px",
                borderRadius: "50px",
                fontWeight: 600,
                textTransform: "none",
                boxShadow: "0px 4px 20px 0px #FFD24B80",
              }}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </Button>
            {/* <Button
              variant="outlined"
              type="button"
              onClick={handleCancel}
              sx={{
                border: "1px solid #212121",
                color: "#212121",
                height: "50px",
                width: "140px",
                borderRadius: "50px",
                fontWeight: 600,
                textTransform: "none",
              }}
            >
              Cancel
            </Button> */}
          </Box>
        </Box>
      </Box>
    </form>
  );
};

export default SettingsForm;
