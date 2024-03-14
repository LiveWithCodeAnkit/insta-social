"use client";
import { Box } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { HiPlus, HiMinus } from "react-icons/hi";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { useOfferForm } from "../../hook";
import CustomTextField from "@/components/common/text-field";
import FileUpload from "@/components/common/fileupload/FileUpload";

const GiftPage = () => {
  const { initialValues, schema, submit } = useOfferForm();
  const [files, setFiles] = useState([]);

  const updateFilesState = (newFiles) => {
    setFiles(newFiles);
  };

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

  const { fields, append, remove } = useFieldArray({
    control,
    name: "variants",
  });

  const handleAddVariant = () => {
    append({});
  };

  const handleRemoveVariant = (index) => {
    remove(index);
  };

  const hasAppended = useRef(false);

  useEffect(() => {
    if (!hasAppended.current && fields.length === 0) {
      append({});
      hasAppended.current = true;
    }
  }, [fields, append]);

  return (
    <>
     
        <Box
          sx={{
            padding: "1.3rem",
            width: "31.8rem",
            display: "flex",
            flexDirection: "column",
            gap: "1.25rem",
            background: "white",
            borderRadius: "1.8rem",
            boxShadow: "0px 0px 30px 0px rgba(0, 0, 0, 0.05)",
          }}
        >
          <Box
            sx={{
              border: "2px dotted #FFCC33",
              borderRadius: "15px",
              width: "full",
              height: "12.5rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#FEFAED",
            }}
          >
            <Controller
              name="fileUpload"
              control={control}
              render={({ field: { onChange } }) => (
                <FileUpload
                  iconName="img"
                  maxSize={12582912}
                  errorText="File size is too large, please upload file size within (12MB)"
                  onChange={(file) => {
                    onChange(file);
                    updateFilesState([file]);
                  }}
                />
              )}
            />
          </Box>
          <Controller
            name="productName"
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                value={value}
                onChange={onChange}
                placeholder="Product Name"
                error={Boolean(errors.productName)}
                {...(errors.productName && {
                  helperText: errors.productName.message,
                })}
              />
            )}
          />
          <Controller
            name="productDes"
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                rows={5}
                fullWidth
                multiline
                onChange={onChange}
                placeholder="Product Description"
                error={Boolean(errors.productDes)}
                {...(errors.productDes && {
                  helperText: errors.productDes.message,
                })}
              />
            )}
          />
          <Controller
            name="productUrl"
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                value={value}
                onChange={onChange}
                placeholder="Product Link"
                error={Boolean(errors.productUrl)}
                {...(errors.productUrl && {
                  helperText: errors.productUrl.message,
                })}
              />
            )}
          />
          <Controller
            name="unitsPerCreator"
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                value={value}
                onChange={onChange}
                placeholder="Units per creator"
                error={Boolean(errors.unitsPerCreator)}
                {...(errors.unitsPerCreator && {
                  helperText: errors.unitsPerCreator.message,
                })}
              />
            )}
          />
          {fields.map((field, index) => (
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
                  <Controller
                    name={`variants[${index}].variant`}
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <CustomTextField
                        fullWidth
                        value={value}
                        onChange={onChange}
                        placeholder="Variant"
                        error={Boolean(errors.variants?.[index]?.variant)}
                        helperText={errors.variants?.[index]?.variant?.message}
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
                    name={`variants[${index}].variantValue`}
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <CustomTextField
                        fullWidth
                        value={value}
                        onChange={onChange}
                        placeholder="Variant Value"
                        error={Boolean(errors.variants?.[index]?.variantValue)}
                        helperText={
                          errors.variants?.[index]?.variantValue?.message
                        }
                      />
                    )}
                  />
                </Box>
              </Box>
              {index === fields.length - 1 ? (
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
                  onClick={() => handleRemoveVariant(index)}
                >
                  <HiMinus />
                </Box>
              )}
            </Box>
          ))}
          
        </Box>
      
     
    </>
  );
};

export default GiftPage;
