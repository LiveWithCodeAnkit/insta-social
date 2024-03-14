import { Box, Button, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import CommonTable from "../../CommonTable";
import AwaitingContentModal from "../modal/AwaitingContentModal";

const imageSmallUrls = [
  "/images/dummy/small_pic_1.png",
  "/images/dummy/small_pic_2.png",
  "/images/dummy/small_pic_5.png",
  "/images/dummy/small_pic_3.png",
  "/images/dummy/small_pic_4.png",
  "/images/dummy/small_pic_2.png",
  "/images/dummy/small_pic_3.png",
  "/images/dummy/small_pic_4.png",
  "/images/dummy/small_pic_2.png",
  "/images/dummy/small_pic_3.png",
  "/images/dummy/small_pic_4.png",
  "/images/dummy/small_pic_2.png",
  "/images/dummy/small_pic_3.png",
  "/images/dummy/small_pic_4.png",
];

const AwaitingContent = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function createData(id, handle, campaignName, tracking, action, status) {
    return {
      id,
      handle,
      campaignName,
      tracking,
      action,
      status,
    };
  }

  const rows = [
    createData(
      1,
      "neatandsocial",
      "Tangerine & Citrus Blossom"
    ),
    createData(
      2,
      "Our.littlehome",
      "Classic Pack"
    ),
    createData(
      3,
      "Mamatoflowers",
      "Plastic Free Pack"
    ),
    createData(
      4,
      "liveymonte",
      "Plastic Free Pack"
    ),
    createData(
      5,
      "Threebowsandablonde",
      "Classic Pack"
    ),
    createData(
      6,
      "Mumingfrom.ito.z",
      "Plastic Free Pack"
    ),
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
      id: "campaignName",
      numeric: true,
      disablePadding: false,
      label: "Campign Name",
    },
    {
      id: "tracking",
      numeric: true,
      disablePadding: false,
      label: "Tracking",
      renderCell: (item, index) => {
        return (
          <Button
            variant="outlined"
            type="button"
            sx={{
              border: "none !important",
              color: "#212121",
              // height: "40px",
              // width: "118px",
              borderRadius: "50px",
              fontSize: "14px",
              fontWeight: 500,
              textTransform: "none",
              color: "secondary.main",
              opacity: "0.7",
              whiteSpace: "nowrap",
              // p:0
            }}
          >
            + &nbsp;Add Tracking
          </Button>
        );
      },
    },
    {
      id: "action",
      numeric: true,
      disablePadding: false,
      label: "Action",
      renderCell: (item, index) => {
        return (
          <Button
            variant="outlined"
            type="button"
            sx={{
              border: "1px solid #212121",
              color: "#212121",
              // height: "40px",
              // width: "168px",
              borderRadius: "50px",
              fontSize: "14px",
              fontWeight: 500,
              textTransform: "none",
            }}
          >
            Message Creator
          </Button>
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
              height: "36px",
              width: "152px",
              backgroundColor: "#D9F4DA",
              borderRadius: "8px",
            }}
          >
            <Typography variant="body1">Awaiting Content</Typography>
          </Box>
        );
      },
    },
  ];

  const onRowClickHandler = (item, id) => {
    handleOpen()
  }
  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: "20px" }}>
        <Stack direction={"row"} spacing={"30px"}>
          <Button
            variant="outlined"
            type="button"
            size="large"
            sx={{
              border: "1px solid #212121",
              color: "#212121",
              // width: "168px",
              borderRadius: "50px",
              fontSize: "14px",
              fontWeight: 600,
              textTransform: "none",
            }}
          >
            Upload Tracking
          </Button>
          <Button
            variant="outlined"
            type="button"
            size="large"
            sx={{
              border: "1px solid #212121",
              color: "#212121",
              // width: "168px",
              borderRadius: "50px",
              fontSize: "14px",
              fontWeight: 600,
              textTransform: "none",
            }}
          >
            Shipping Export
          </Button>
          <Button
            variant="contained"
            type="button"
            size="large"
            sx={{
              background: "#FFCC33",
              color: "#212121",
              // width: "206px",
              borderRadius: "50px",
              fontSize: "14px",
              fontWeight: 600,
              textTransform: "none",
              boxShadow:"none"
            }}
          >
            Message All Creators
          </Button>
        </Stack>
      </Box>

      <CommonTable rows={rows} headCells={headCells} onclickHandler={onRowClickHandler} />

      <AwaitingContentModal open={open} handleClose={handleClose} imageSmallUrls={imageSmallUrls} />
    </Box>
  );
};

export default AwaitingContent;
