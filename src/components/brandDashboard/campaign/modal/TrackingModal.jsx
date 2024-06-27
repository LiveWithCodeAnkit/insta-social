import React, { useEffect } from "react";
import { Box, Button, Modal, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Controller, useForm } from "react-hook-form";
import CustomTextField from "@/components/common/text-field";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { trackingDetails } from "../../../../../store/campaign_request/campaignRequest.slice";
import { useTrackingForm } from "@/components/creatorDashboard/hook";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  maxHeight: "90vh",
  bgcolor: "background.paper",
  // border: '2px solid #000',
  // boxShadow: 24,
  p: "30px",
  borderRadius: "50px",
  overflow: "auto",
};

const initialValues = {
  trackingNumber: "",
};

const TrackingModal = ({ open, handleClose, modalData, updatingFunction }) => {
  const dispatch = useDispatch();
  const { initialValues, schema, submit } = useTrackingForm({
    modalData,
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
    if (modalData) {
      reset({
        trackingNumber: modalData?.tracking,
      });
    }
  }, [modalData]);

  console.log(modalData, "modalData");

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
              <Typography variant="h3">Add Tracking</Typography>
              <CloseIcon sx={{ cursor: "pointer" }} onClick={handleClose} />
            </Box>
            <Box
              sx={{ width: "auto", mt: "10px", display: "flex", gap: "1.8rem" }}
            >
              <Controller
                name="trackingNumber"
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    label="Tracking Number"
                    onChange={onChange}
                    placeholder="Enter Tracking Number"
                    error={Boolean(errors.trackingNumber)}
                    {...(errors.trackingNumber && {
                      helperText: errors.trackingNumber.message,
                    })}
                  />
                )}
              />
            </Box>
            <Box
              sx={{
                mt: "20px",
              }}
            >
              <Button
                variant="contained"
                type="submit"
                // onClick={(e) => approveRejectHandler("approve", e)}
                sx={{
                  "&:hover": { background: "#FFCC33" },
                  background: "#FFCC33",
                  color: "#212121",
                  // height: "40px",
                  width: "118px",
                  borderRadius: "50px",
                  fontSize: "14px",
                  fontWeight: 500,
                  textTransform: "none",
                  boxShadow: "none",
                }}
              >
                Save
              </Button>
              <Button
                variant="outlined"
                type="button"
                onClick={handleClose}
                sx={{
                  border: "1px solid #212121",
                  color: "#212121",
                  // height: "40px",
                  width: "118px",
                  borderRadius: "50px",
                  fontSize: "14px",
                  fontWeight: 500,
                  textTransform: "none",
                  ml: "20px",
                }}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </form>
      </Modal>
    </Box>
  );
};

export default TrackingModal;
