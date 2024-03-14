import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Button, Modal, TextField } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: 500, md: 600, lg: 700 },
  maxHeight: "100vh",
  overflow: "auto",
  bgcolor: "background.paper",
  p: "40px 50px",
  borderRadius: "50px",
};

const FeedbackFormModal = ({ open, handleClose }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <CloseIcon sx={{ cursor: "pointer", mb:"40px" }} onClick={handleClose} />
        </Box>
        <TextField
          id="outlined-multiline-flexible"
          //   label="Multiline"
          fullWidth
          multiline
          rows={4}
          //   value={}
        />
        <Button
          variant="outlined"
          type="button"
          sx={{
            border: "1px solid #212121",
            color: "#212121",
            height: "50px",
            width: "100%",
            borderRadius: "50px",
            fontSize: "16px",
            fontWeight: 600,
            textTransform: "none",
            mt: "40px",
          }}
        >
          Share Feedback and Decline
        </Button>
      </Box>
    </Modal>
  );
};

export default FeedbackFormModal;
