import React from "react";
import {
  Box,
  Typography,
  Card,
  Tab,
  Tabs,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import CustomTextField from "@/components/common/text-field";
const PaidForm = () => {
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });
  return (
    <>
      <Box
        sx={{
          padding: "1.8rem",
          width: "full",
          display: "flex",
          gap: "1.25rem",
          background: "white",
          borderRadius: "1.8rem",
          boxShadow: "0px 0px 30px 0px rgba(0, 0, 0, 0.05)",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
          }}
        >
          <Typography
            variant="label"
            sx={{
              fontSize: "16px",
              fontWeight: "600",
            }}
          >
            Is Sample Required?
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "start",
              alignContent: "center",
            }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  sx={{
                    color: "#FFCC33",
                    "&.Mui-checked": {
                      color: "#FFCC33",
                    },
                  }}
                />
              }
              label="Yes"
            />

            <FormControlLabel
              control={
                <Checkbox
                  sx={{
                    color: "#FFCC33",
                    "&.Mui-checked": {
                      color: "#FFCC33",
                    },
                  }}
                />
              }
              label="No"
            />
          </Box>
        </Box>
        <Box
          sx={{
            width: "46rem",
          }}
        >
          <Typography
            variant="label"
            sx={{
              fontSize: "16px",
              fontWeight: "600",
            }}
          >
            Amount
          </Typography>

          <Controller
            name="Amount"
            control={control}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                value={value}
                onChange={onChange}
                placeholder="Amount"
                error={Boolean(errors.productName)}
                {...(errors.productName && {
                  helperText: errors.productName.message,
                })}
              />
            )}
          />
        </Box>
      </Box>
    </>
  );
};

export default PaidForm;
