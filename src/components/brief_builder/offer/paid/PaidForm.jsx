import React, { useState } from "react";
import {
  Box,
  Typography,
  FormControlLabel,
  Checkbox,
  Button,
} from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import CustomTextField from "@/components/common/text-field";
import { CgArrowLongRight, CgArrowLongLeft } from "react-icons/cg";

import { usePaidFrom } from "../../hook";

const PaidForm = ({ handleTab }) => {
  const [isSampleRequired, setIsSampleRequired] = useState(false);
  const { initialValues, schema, submit } = usePaidFrom({ handleTab });

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

  const handleCheckboxChange = (event) => {
    setIsSampleRequired(event.target.checked);
  };

  return (
    <form onSubmit={handleSubmit((data) => submit(data))}>
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
            <Controller
              name="isSampleRequired"
              control={control}
              defaultValue={false}
              render={({ field }) => (
                <>
                  <FormControlLabel
                    control={
                      <Checkbox
                        {...field}
                        checked={field.value}
                        onChange={(e) => {
                          field.onChange(e.target.checked);
                          setIsSampleRequired(e.target.checked);
                        }}
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
                        {...field}
                        checked={!field.value}
                        onChange={(e) => {
                          field.onChange(!e.target.checked);
                          setIsSampleRequired(!e.target.checked);
                        }}
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
                </>
              )}
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
            name="offerPrice"
            control={control}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                value={value}
                onChange={onChange}
                placeholder="Amount"
                error={Boolean(errors.offerPrice)}
                {...(errors.offerPrice && {
                  helperText: errors.offerPrice.message,
                })}
              />
            )}
          />
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "end",
          gap: "0.5rem",
          mt: "1rem",
        }}
      >
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
    </form>
  );
};

export default PaidForm;
