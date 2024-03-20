"use client";
import { Box } from "@mui/material";
import React, { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { useOfferForm } from "../../hook";
import CustomTextField from "@/components/common/text-field";
import FileUpload from "@/components/common/fileupload/FileUpload";
import Variant from "./Variant";
import Button from "@mui/material/Button";
import { BiPlus } from "react-icons/bi";
import { CgArrowLongRight, CgArrowLongLeft } from "react-icons/cg";

const GiftPage = ({ handleTab }) => {
  const { initialValues, schema, submit } = useOfferForm({ handleTab });

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
    name: "gifts",
  });

  const handleAddGiftCard = () => {
    append({
      productName: "",
      description: "",
      productLink: "",
      unitsPerCreator: "0",
      variants: [
        {
          variantType: "",
          variantDes: "",
        },
      ],
    });
  };

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
              }}
              key={index}
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
                  name={`gifts[${index}].offerImage`}
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
              <Controller
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
              />

              <Variant index={index} control={control} errors={errors} />
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
    </>
  );
};

export default GiftPage;
