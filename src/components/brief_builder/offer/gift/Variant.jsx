import React from "react";
import { Box } from "@mui/material";
import { Controller, useFieldArray } from "react-hook-form";
import { HiPlus, HiMinus } from "react-icons/hi";
import CustomTextField from "@/components/common/text-field";
import { MuiChipsInput } from "mui-chips-input";

const Variant = ({ index, control, errors }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `gifts[${index}].variants`,
  });

  const handleAddVariant = () => {
    append({});
  };

  const handleRemoveVariant = (variantIndex) => {
    remove(variantIndex);
  };

  return (
    <>
      {fields.map((field, variantIndex) => (
        <Box
          key={field.id}
          sx={{
            backgroundColor: "#FEFAED",
            padding: "0.6rem",
            borderRadius: "0.6rem",
            display: "flex",
            width: "100%",
            gap: "0.6rem",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
              width: "100%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "0.9rem",
              }}
            >
              {/* <Controller
                name={`gifts[${index}].variants[${variantIndex}].variantType`}
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    onChange={onChange}
                    placeholder="Variant"
                    error={Boolean(
                      errors?.gifts?.[index]?.variants?.[variantIndex]
                        ?.variantType
                    )}
                    helperText={
                      errors?.gifts?.[index]?.variants?.[variantIndex]
                        ?.variantType?.message
                    }
                  />
                )}
              /> */}
              <Controller
                name={`gifts[${index}].variants[${variantIndex}].variantType`}
                control={control}
                render={({ field, fieldState }) => (
                  <MuiChipsInput
                    {...field}
                    helperText={field.value?.length === 3 ? "Max 3 Tags" : ""}
                    error={fieldState.invalid}
                    addOnBlur
                    className="custom-chip-input"
                    size="small"
                    inputProps={{
                      style: {
                        display: field.value?.length === 3 ? "none" : "block",
                      },
                    }}
                    placeholder="Variants Type"
                  />
                )}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <Controller
                name={`gifts[${index}].variants[${variantIndex}].variantDes`}
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    onChange={onChange}
                    placeholder="Variant Value"
                    error={Boolean(
                      errors?.gifts?.[index]?.variants?.[variantIndex]
                        ?.variantDes
                    )}
                    helperText={
                      errors?.gifts?.[index]?.variants?.[variantIndex]
                        ?.variantDes?.message
                    }
                  />
                )}
              />
            </Box>
          </Box>
          {variantIndex === fields.length - 1 ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "2.5rem",
                width: "2.5rem",
                background: "#FFCC33",
                borderRadius: "10px",
                gap: "0.5rem",
                cursor: "pointer",
              }}
              onClick={handleAddVariant}
            >
              <HiPlus />
            </Box>
          ) : (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "2.5rem",
                width: "2.5rem",
                background: "#FFCC33",
                borderRadius: "10px",
                gap: "0.5rem",
                cursor: "pointer",
              }}
              onClick={() => handleRemoveVariant(variantIndex)}
            >
              <HiMinus />
            </Box>
          )}
        </Box>
      ))}
    </>
  );
};

export default Variant;
