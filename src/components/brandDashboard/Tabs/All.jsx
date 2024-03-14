import React, { useMemo, useState } from "react";
import { Box, Button, Paper, Typography } from "@mui/material";
import CommonTable from "../CommonTable";

const All = () => {
  function createData(id, campaignsName, deadline, campaignDetails, status) {
    return {
      id,
      campaignsName,
      deadline,
      campaignDetails,
      status,
    };
  }

  const rows = [
    createData(1, "Cupcake", 305, 3.7, 67),
    createData(2, "Donut", 452, 25.0, 51),
    createData(3, "Eclair", 262, 16.0, 24),
    createData(4, "Frozen yoghurt", 159, 6.0, 24),
    createData(5, "Gingerbread", 356, 16.0, 49),
    createData(6, "Honeycomb", 408, 3.2, 87),
    createData(7, "Ice cream sandwich", 237, 9.0, 37),
    createData(8, "Jelly Bean", 375, 0.0, 94),
    createData(9, "KitKat", 518, 26.0, 65),
    createData(10, "Lollipop", 392, 0.2, 98),
    createData(11, "Marshmallow", 318, 0, 81),
    createData(12, "Nougat", 360, 19.0, 9),
    createData(13, "Oreo", 437, 18.0, 63),
  ];

  const headCells = [
    {
      id: "campaignsName",
      numeric: false,
      disablePadding: true,
      label: "Campaigns Name",
    },
    {
      id: "deadline",
      numeric: true,
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
    <Box sx={{ width: "100%", display: "block" }}>
      <Paper
        sx={{
          width: "100%",
          mb: 2,
          borderRadius: "30px",
          boxShadow: "0px 0px 30px 0px #0000000D",
          padding: "30px 30px 00px 30px"
        }}
      >
        <CommonTable rows={rows} headCells={headCells} />
      </Paper>
    </Box>
  );
};

export default All;
