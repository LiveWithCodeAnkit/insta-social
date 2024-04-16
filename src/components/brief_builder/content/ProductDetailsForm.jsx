import React, { useState } from "react";
import { Box, Typography, Card } from "@mui/material";
import Button from "@mui/material/Button";
import { BiPlus } from "react-icons/bi";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { RiDeleteBin6Fill } from "react-icons/ri";
import CustomTextField from "@/components/common/text-field";
import FileUpload from "@/components/common/fileupload/FileUpload";

import { CgArrowLongRight, CgArrowLongLeft } from "react-icons/cg";
import { useProductsForm } from "../hook";
import QuillMinimal from "@/components/common/editer/Editor";

const ProductDetailsForm = ({ handleTab }) => {
  const [files, setFiles] = useState([]);
  const { initialValues, loading, schema, submit } = useProductsForm({
    handleTab,
  });

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
    name: "products",
  });

  const handleAddProductCard = () => {
    append({
      description: "",
    });
  };

  const handleRemoveExternalLink = (ExternalLinkIndex) => {
    remove(ExternalLinkIndex);
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
            onClick={() => handleAddProductCard()}
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
                height: "100%",
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
                    onClick={() => handleRemoveExternalLink(index)}
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
                {" "}
                <Box
                  sx={{
                    border: "2px dashed #FFCC33",
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
                    name={`products[${index}].productImage`}
                    control={control}
                    render={({ field: { onChange } }) => (
                      <FileUpload
                        iconName="img"
                        maxSize={12582912}
                        errorText="File size is too large, please upload file size within (12MB)"
                        onChange={(file) => {
                          onChange(file);
                        }}
                      />
                    )}
                  />
                </Box>
                {errors.products && errors.products[index]?.productImage && (
                  <Typography
                    variant="caption"
                    color="error"
                    sx={{
                      fontSize: "0.875rem",
                    }}
                  >
                    {errors.products[index]?.productImage.message}
                  </Typography>
                )}
              </Box>

              <Box
                as="div"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "start",
                  gap: "0.5rem",
                  height: "100%",
                  width: "100%",
                }}
              >
                <Typography
                  variant="label"
                  sx={{
                    fontSize: "14px",
                    fontWeight: "700",
                  }}
                >
                  Description
                </Typography>
                <Controller
                  name={`products[${index}].description`}
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <>
                      <QuillMinimal
                        value={value}
                        onChange={onChange}
                        label="Description"
                      />
                    </>
                  )}
                />

                {errors?.products?.[index]?.description && (
                  <Typography variant="caption" color="error">
                    {errors?.products?.[index]?.description?.message}
                  </Typography>
                )}
              </Box>
            </Box>
          ))}
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "end",
            gap: "0.5rem",
            mt: "2rem",
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
            disabled={loading}
          >
            {loading ? "Loading..." : "Next"}
          </Button>
        </Box>
      </form>
    </>
  );
};

export default ProductDetailsForm;
