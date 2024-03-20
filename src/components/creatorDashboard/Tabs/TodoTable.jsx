import React, { useMemo, useState } from "react";
import { Box, Button, Paper, Typography } from "@mui/material";
import CommonTable from "@/components/common/commonTable/CommonTable";
import UploadContentModal from "../modal/UploadContentModal";

const TodoTable = () => {
  const [open, setOpen] = useState({ showModal: false, id: "" });
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
  function createData(
    id,
    campaignsName,
    brandName,
    deadline,
    campaignDetails,
    status
  ) {
    return {
      id,
      campaignsName,
      brandName,
      deadline,
      campaignDetails,
      status,
    };
  }

  const rows = [
    createData(1, "neatandsocial", "Tangerine & Citrus Blossom", "25/12/2023"),
    createData(
      2,
      "lovechaosandatkins",
      "Tangerine & Citrus Blossom",
      "24/12/2023"
    ),
    createData(
      3,
      "Threebowsandablonde",
      "Tangerine & Citrus Blossom",
      "21/12/2023"
    ),
    createData(
      4,
      "greeneclecticmama",
      "Tangerine & Citrus Blossom",
      "25/11/2023"
    ),
    createData(
      5,
      "Mumingfrom.itoz",
      "Tangerine & Citrus Blossom",
      "20/11/2023"
    ),
    createData(6, "neatandsocial", "Tangerine & Citrus Blossom", "18/11/2023"),
    createData(7, "neatandsocial", "Tangerine & Citrus Blossom", "17/11/2023"),
    createData(8, "neatandsocial", "Tangerine & Citrus Blossom", "30/10/2023"),
    createData(9, "neatandsocial", "Tangerine & Citrus Blossom", "29/10/2023"),
    createData(10, "neatandsocial", "Tangerine & Citrus Blossom", "28/10/2023"),
    createData(11, "NewSocial", "Tangerine & Citrus Blossom", "28/10/2023"),
    createData(12, "social", "Tangerine & Citrus Blossom", "28/10/2023"),
    createData(13, "datasocial", "Tangerine & Citrus Blossom", "28/10/2023"),
  ];

  const headCells = [
    {
      id: "campaignsName",
      numeric: false,
      disablePadding: true,
      label: "Campaigns Name",
    },
    {
      id: "brandName",
      numeric: false,
      disablePadding: false,
      label: "Brand Name",
    },
    {
      id: "deadline",
      numeric: false,
      disablePadding: false,
      label: "Deadline",
    },
    {
      id: "campaignDetails",
      numeric: true,
      disablePadding: false,
      label: "Campaign Details",
      renderCell: (item, index) => {
        return (
          <Button
            variant="outlined"
            type="button"
            sx={{
              border: "1px solid #212121",
              color: "#212121",
              // height: "35px",
              // width: "118px",
              borderRadius: "50px",
              fontWeight: 500,
              textTransform: "none",
            }}
          >
            View Brief
          </Button>
        );
      },
    },
    {
      id: "reportIssue",
      numeric: true,
      disablePadding: false,
      label: "Report Issue",
      renderCell: (item, index) => {
        return (
          <Button
            variant="outlined"
            type="button"
            sx={{
              border: "none",
              color: "#00B2F7",
              // height: "35px",
              // width: "118px",
              borderRadius: "50px",
              fontWeight: 500,
              textTransform: "none",
              "&:hover": {
                borderColor: "info.main",
                backgroundColor: "info.lighter",
              },
            }}
          >
            Report issue
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
            variant="contained"
            type="button"
            sx={{
              //   border: "1px solid #212121",
              "&:hover": { background: "#FFCC33" },
              background: "#FFCC33",
              boxShadow: "none",
              color: "#212121",
              // height: "35px",
              // width: "118px",
              borderRadius: "50px",
              fontWeight: 500,
              textTransform: "none",
            }}
            onClick={(e) => setOpen({ showModal: true, id: item.id })}
          >
            Upload Content
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
              width: "100px",
              backgroundColor: "#A4E504",
              borderRadius: "8px",
            }}
          >
            <Typography variant="body1">Complete</Typography>
          </Box>
        );
      },
    },
  ];

  return (
    <>
      <Box sx={{ width: "100%", display: "block" }}>
        <Paper
          sx={{
            width: "100%",
            mb: 2,
            borderRadius: "30px",
            boxShadow: "0px 0px 30px 0px #0000000D",
            padding: "30px 30px 00px 30px",
          }}
        >
          <CommonTable rows={rows} headCells={headCells} />
        </Paper>
      </Box>
      {/* <UploadContentModal
        open={open.showModal}
        handleClose={() => setOpen({ showModal: false, id: "" })}
        imageSmallUrls={imageSmallUrls}
      /> */}
    </>
  );
};

export default TodoTable;
