"use client";
import { Box, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { useOfferForm } from "../../hook";
import CustomTextField from "@/components/common/text-field";
import FileUpload from "@/components/common/fileupload/FileUpload";
import Button from "@mui/material/Button";
import { BiPlus } from "react-icons/bi";
import { CgArrowLongRight, CgArrowLongLeft } from "react-icons/cg";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { MuiChipsInput } from "mui-chips-input";
import FileUploaderMultiple from "@/components/common/fileuploader/FileUploaderMultiple";

const GiftPage = ({ handleTabInside, handleTab }) => {
  const { initialValues, loading, schema, submit } = useOfferForm({
    handleTabInside,
    handleTab,
  });
  // handleTab(3);
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
    name: "gifts",
  });

  const handleAddGiftCard = () => {
    append({
      offerImage: [],
      productName: "",
      description: "",
      productLink: "",
      variantType: [],
      variantDes: "",
    });
  };

  const handleRemoveOffer = (offerId) => {
    remove(offerId);
  };
  const isValueUnique = (chipValue, allChipValues) => {
    return allChipValues.indexOf(chipValue) === -1;
  };

  const hasAppended = useRef(false);
  useEffect(() => {
    if (!hasAppended.current && fields.length === 0) {
      append({
        offerImage: [],
        productName: "",
        description: "",
        productLink: "",
        variantType: [],
        variantDes: "",
      });
      hasAppended.current = true;
    }
  }, [fields, append]);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "end",
            padding: "1rem",
          }}
        >
          <Button
            sx={{
              background: "#FFCC33",
              color: "#212121",
              padding: "0.8rem",
              borderRadius: "50px",
              fontWeight: 600,
              textTransform: "none",

              "&:hover": {
                background: "#FFCC33",
              },
            }}
            variant="contained"
            startIcon={<BiPlus />}
            onClick={() => handleAddGiftCard()}
          >
            Add Another
          </Button>
        </Box>
      </Box>
      <form onSubmit={handleSubmit(submit)}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "start",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          {fields.map((item, index) => (
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
                position: "relative",
              }}
              key={item.id}
            >
              {index == 0 ? (
                ""
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "end",
                    alignItems: "end",
                    position: "absolute",
                    right: "0",
                    top: "-11px",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "2rem",
                      width: "2rem",
                      background: "#F00E0E",
                      borderRadius: "10px",
                      gap: "0.5rem",
                      cursor: "pointer",
                      color: "white",
                      right: 0,
                    }}
                    onClick={() => handleRemoveOffer(index)}
                  >
                    <RiDeleteBin6Fill />
                  </Box>
                </Box>
              )}

              <Box
                as="div"
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                }}
              >
                <Controller
                  name={`gifts[${index}].offerImage`}
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <FileUploaderMultiple
                      name={"fileUpload"}
                      value={value}
                      onChange={onChange}
                      errors={errors}
                    />
                  )}
                />
                {errors.gifts && errors.gifts[index]?.offerImage && (
                  <Typography
                    variant="caption"
                    color="error"
                    sx={{
                      fontSize: "0.875rem",
                    }}
                  >
                    {errors.gifts[index]?.offerImage.message}
                  </Typography>
                )}
              </Box>

              <Controller
                name={`gifts[${index}].productName`}
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    onChange={onChange}
                    placeholder="Product Name"
                    error={Boolean(errors?.gifts?.[index]?.productName)}
                    helperText={errors?.gifts?.[index]?.productName?.message}
                  />
                )}
              />
              <Controller
                name={`gifts[${index}].description`}
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    rows={5}
                    fullWidth
                    multiline
                    value={value}
                    onChange={onChange}
                    placeholder="Product Description"
                    error={Boolean(errors?.gifts?.[index]?.description)}
                    helperText={errors?.gifts?.[index]?.description?.message}
                  />
                )}
              />
              <Controller
                name={`gifts[${index}].productLink`}
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    onChange={onChange}
                    placeholder="Product Link"
                    error={Boolean(errors?.gifts?.[index]?.productLink)}
                    helperText={errors?.gifts?.[index]?.productLink?.message}
                  />
                )}
              />
              {/* <Controller
                name={`gifts[${index}].unitsPerCreator`}
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    onChange={onChange}
                    placeholder="Units per creator"
                    error={Boolean(errors?.gifts?.[index]?.unitsPerCreator)}
                    helperText={
                      errors?.gifts?.[index]?.unitsPerCreator?.message
                    }
                  />
                )}
              /> */}

              <Box
                as="div"
                sx={{
                  backgroundColor: "#FEFAED",
                  padding: "0.6rem",
                  borderRadius: "0.6rem",
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  gap: "0.6rem",
                  alignItems: "center",
                }}
              >
                <Controller
                  name={`gifts[${index}].variantType`}
                  control={control}
                  render={({ field, fieldState }) => (
                    <MuiChipsInput
                      {...field}
                      helperText={
                        field.value?.length === 4
                          ? "Max 04 Tags"
                          : "" || errors?.gifts?.[index]?.variantType?.message
                      }
                      error={fieldState.invalid}
                      validate={(chipValue) => {
                        const allChipValues = field.value;
                        const isUnique = isValueUnique(
                          chipValue,
                          allChipValues
                        );
                        return {
                          isError: !isUnique,
                          textError: "Value must be unique",
                        };
                      }}
                      addOnBlur
                      className="custom-chip-input"
                      size="small"
                      inputProps={{
                        maxLength: 12,
                        style: {
                          display: field.value?.length === 4 ? "none" : "block",
                        },
                      }}
                      placeholder="Variants Type"
                    />
                  )}
                />

                <Controller
                  name={`gifts[${index}].variantDes`}
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      rows={5}
                      fullWidth
                      multiline
                      value={value}
                      onChange={onChange}
                      placeholder="Variant Description"
                      error={Boolean(errors?.gifts?.[index]?.variantDes)}
                      helperText={errors?.gifts?.[index]?.variantDes?.message}
                    />
                  )}
                />
              </Box>
            </Box>
          ))}
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
            onClick={() => {
              handleTab(1);
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
      </form>
    </>
  );
};

export default GiftPage;
