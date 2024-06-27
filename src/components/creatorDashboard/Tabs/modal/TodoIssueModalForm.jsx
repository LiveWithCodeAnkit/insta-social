"use client";
import {
  Box,
  Button,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Controller, useForm } from "react-hook-form";
import CustomTextField from "@/components/common/text-field";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTodoIssueForm } from "../../hook/useTodoIssueForm";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  // width: { xs: 500, md: 600, lg: 700 },
  // maxHeight: "100vh",
  overflow: "auto",
  bgcolor: "background.paper",
  // border: '2px solid #000',
  // boxShadow: 24,
  p: "30px",
  borderRadius: "50px",
};

const TodoIssueModalForm = ({
  open,
  allData,
  handleClose,
  updatingFunction,
}) => {
  const { initialValues, loading, schema, submit } = useTodoIssueForm({
    allData,
    handleClose,
    updatingFunction,
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

  useEffect(() => {
    if (allData) {
      reset({
        campaignsName: allData?.campaignsName,
      });
    }
  }, [allData]);

  // console.log(allData, "allData into todo");

  return (
    <Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <form onSubmit={handleSubmit(submit)}>
          <Box sx={style}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                  Add Issue
                </Typography>
              </Box>
              <CloseIcon sx={{ cursor: "pointer" }} onClick={handleClose} />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                mt: "0px",
              }}
            >
              <Box sx={{ my: "20px" }}>
                <Grid container spacing={4}>
                  <Grid item xs={6}>
                    <Controller
                      name="campaignsName"
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <CustomTextField
                          fullWidth
                          disabled
                          value={value}
                          label="Campaigns Name"
                          onChange={onChange}
                          placeholder="Campaigns Name"
                          error={Boolean(errors.campaignsName)}
                          {...(errors.campaignsName && {
                            helperText: errors.campaignsName.message,
                          })}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Controller
                      name="issueType"
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <CustomTextField
                          select
                          fullWidth
                          value={value}
                          defaultValue=" "
                          label="Select Issue Type"
                          onChange={onChange}
                          error={Boolean(errors.issueType)}
                          {...(errors.issueType && {
                            helperText: errors.issueType.message,
                          })}
                        >
                          <MenuItem value=" ">Select Issue Type</MenuItem>
                          <MenuItem
                            value="PRODUCT_ISSUE"
                            disabled={
                              allData?.reportIssue?.selectedOfferVariants
                                ?.giftOffers <= 0
                            }
                          >
                            Product Issue
                          </MenuItem>
                          <MenuItem
                            value="SHIPPING_ISSUE"
                            disabled={
                              allData?.reportIssue?.selectedOfferVariants
                                ?.giftOffers <= 0
                            }
                          >
                            Shipping Issue
                          </MenuItem>
                          <MenuItem value="OTHER_ISSUE">Other Issue</MenuItem>
                        </CustomTextField>
                      )}
                    />
                  </Grid>
                </Grid>

                <Grid
                  container
                  sx={{ display: "flex", flexDirection: "row", mt: 1, mb: 1 }}
                  spacing={2}
                  columns={{ xs: 4, sm: 8, md: 12, lg: 12 }}
                >
                  <Grid item xs={12}>
                    <InputLabel
                      htmlFor="issueInfo"
                      sx={{
                        mb: 1,
                        fontSize: "14px",
                        fontWeight: 600,
                        color: "#212121",
                      }}
                    >
                      Issue Info
                    </InputLabel>
                    <Controller
                      name="issueInfo"
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          fullWidth
                          value={value}
                          multiline
                          rows={4}
                          onChange={onChange}
                          placeholder="Issue info"
                          error={Boolean(errors.issueInfo)}
                          {...(errors.issueInfo && {
                            helperText: errors.issueInfo.message,
                          })}
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </Box>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                variant="contained"
                type="submit"
                sx={{
                  "&:hover": { background: "#FFCC33" },
                  background: "#FFCC33",
                  color: "#212121",
                  height: "50px",
                  width: "120px",
                  borderRadius: "50px",
                  fontWeight: 600,
                  textTransform: "none",
                  boxShadow: "0px 4px 20px 0px #FFD24B80",
                }}
                disabled={loading}
              >
                {loading ? "Loading..." : "Submit"}
              </Button>
            </Box>
          </Box>
        </form>
      </Modal>
    </Box>
  );
};

export default TodoIssueModalForm;
