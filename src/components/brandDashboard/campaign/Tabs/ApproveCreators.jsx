import {
  Avatar,
  Box,
  Button,
  Divider,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import CommonTable from "../../CommonTable";
import StarIcon from "@mui/icons-material/Star";
import HandleBriefModal from "../modal/HandleBriefModal";

const imageSmallUrls = [
  "/images/dummy/small_pic_1.png",
  "/images/dummy/small_pic_2.png",
  "/images/dummy/small_pic_3.png",
  "/images/dummy/small_pic_4.png",
  "/images/dummy/small_pic_3.png",
];

const ApproveCreators = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  function createData(id, handle, favorites, product, action, status) {
    return {
      id,
      handle,
      favorites,
      product,
      action,
      status,
    };
  }

  const rows = [
    createData(1, "neatandsocial", "", "Tangerine & Citrus Blossom"),
    createData(2, "Our.littlehome", "", "Classic Pack"),
    createData(3, "Mamatoflowers", "", "Plastic Free Pack"),
    createData(4, "liveymonte", "", "Plastic Free Pack"),
    createData(5, "Threebowsandablonde", "", "Classic Pack"),
    createData(6, "Mumingfrom.ito.z", "", "Herbal Pack"),
    createData(7, "Ice cream sandwich", "", 237, 9.0, 37),
    createData(8, "Jelly Bean", 375, 0.0, 94),
    createData(9, "KitKat", 518, 26.0, 65),
    createData(10, "Lollipop", 392, 0.2, 98),
    createData(11, "Marshmallow", 318, 0, 81),
    createData(12, "Nougat", 360, 19.0, 9),
    createData(13, "Oreo", 437, 18.0, 63),
  ];

  const headCells = [
    {
      id: "handle",
      numeric: false,
      disablePadding: true,
      label: "Handle",
    },
    {
      id: "favorites",
      numeric: true,
      disablePadding: false,
      label: "Favorites",
      renderCell: (item, index) => {
        return (
          <Button
            variant="outlined"
            type="button"
            startIcon={<StarIcon />}
            sx={{
              border: "1px solid #212121",
              color: "#212121",
              // height: "35px",
              width: "118px",
              borderRadius: "50px",
              fontSize: "14px",
              fontWeight: 500,
              textTransform: "none",
            }}
          >
            Favorite
          </Button>
        );
      },
    },
    {
      id: "product",
      numeric: true,
      disablePadding: false,
      label: "Product",
    },
    {
      id: "action",
      numeric: true,
      disablePadding: false,
      label: "Action",
      renderCell: (item, index) => {
        return (
          <Stack direction="row" spacing={{ xs: 1.5, sm: 2.5, md: 4 }}>
            <Button
              variant="contained"
              type="button"
              sx={{
                "&:hover": { background: "#FFCC33" },
                background: "#FFCC33",
                color: "#212121",
                // height: "35px",
                width: "90px",
                borderRadius: "50px",
                fontSize: "14px",
                fontWeight: 500,
                textTransform: "none",
                boxShadow: "none",
              }}
            >
              Approve
            </Button>
            <Button
              variant="outlined"
              type="button"
              sx={{
                "&:hover": {
                  borderColor: "info.main",
                  backgroundColor: "info.lighter",
                },
                border: "none",
                color: "#00B2F7",
                // height: "35px",
                width: "90px",
                borderRadius: "50px",
                fontSize: "14px",
                fontWeight: 500,
                textTransform: "none",
              }}
            >
              Reject
            </Button>
          </Stack>
        );
      },
    },
    {
      id: "status",
      numeric: true,
      disablePadding: false,
      label: "Status",
      renderCell: (item, index) => {
        return (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "35px",
              width: "150px",
              backgroundColor: "#EEEEEE",
              borderRadius: "8px",
            }}
          >
            <Typography variant="body1">Awaiting Approval</Typography>
          </Box>
        );
      },
    },
  ];

  const onRowClickHandler = (item, id) => {
    handleOpen();
  };

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: "20px" }}>
        <Stack direction={"row"} spacing={"30px"}>
          <Button
            variant="contained"
            type="button"
            // size="large"
            sx={{
              "&:hover": { background: "#FFCC33" },
              background: "#FFCC33",
              color: "#212121",
              height: "40px",
              width: "130px",
              borderRadius: "50px",
              fontSize: "14px",
              fontWeight: 600,
              textTransform: "none",
              boxShadow: "none",
            }}
          >
            Approve All
          </Button>
        </Stack>
      </Box>

      <CommonTable
        rows={rows}
        headCells={headCells}
        onclickHandler={onRowClickHandler}
      />

      <HandleBriefModal
        imageSmallUrls={imageSmallUrls}
        open={open}
        handleClose={handleClose}
      />
    </Box>
  );
};

export default ApproveCreators;
