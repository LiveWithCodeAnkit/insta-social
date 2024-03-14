import React from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import NorthEastIcon from "@mui/icons-material/NorthEast";
import CommonTable from "../../CommonTable";

const Ship = () => {
  function createData(
    id,
    handle,
    address,
    product,
    tracking,
    messageCreator,
    orderShipped,
    status
  ) {
    return {
      id,
      handle,
      address,
      product,
      tracking,
      messageCreator,
      orderShipped,
      status,
    };
  }

  const rows = [
    createData(
      1,
      "neatandsocial",
      "John Doe, 1216 Broadway, Fl 2, New York, NY 10001 United States",
      "Tangerine & Citrus Blossom"
    ),
    createData(
      2,
      "Our.littlehome",
      "John Doe, 1216 Broadway, Fl 2, New York, NY 10001 United States",
      "Classic Pack"
    ),
    createData(
      3,
      "Mamatoflowers",
      "John Doe, 1216 Broadway, Fl 2, New York, NY 10001 United States",
      "Plastic Free Pack"
    ),
    createData(
      4,
      "liveymonte",
      "John Doe, 1216 Broadway, Fl 2, New York, NY 10001 United States",
      "Plastic Free Pack"
    ),
    createData(
      5,
      "Threebowsandablonde",
      "John Doe, 1216 Broadway, Fl 2, New York, NY 10001 United States",
      "Classic Pack"
    ),
    createData(
      6,
      "Mumingfrom.ito.z",
      "John Doe, 1216 Broadway, Fl 2, New York, NY 10001 United States",
      "Herbal Pack"
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
      id: "address",
      numeric: false,
      disablePadding: true,
      label: "Address",
    },
    {
      id: "product",
      numeric: true,
      disablePadding: false,
      label: "Product",
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
              fontSize:"14px",
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
      id: "messageCreator",
      numeric: true,
      disablePadding: false,
      label: "Message Creator",
      renderCell: (item, index) => {
        return (
          <Button
            variant="outlined"
            type="button"
            sx={{
              border: "1px solid #212121",
              color: "#212121",
              // height: "35px",
              width: "150px",
              borderRadius: "50px",
              fontSize:"14px",
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
      id: "orderShipped",
      numeric: true,
      disablePadding: false,
      label: "Order Shipped",
      renderCell: (item, index) => {
        return (
          <Button
            variant="contained"
            type="button"
            endIcon={<NorthEastIcon />}
            sx={{
              // "&:hover": { background: "#FFCC33" },
              background: "#FFCC33",
              color: "#212121",
              // height: "35px",
              width: "150px",
              borderRadius: "50px",
              fontSize:"14px",
              fontWeight: 500,
              textTransform: "none",
              boxShadow:"none"
            }}
          >
            Order Shipped
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
              width: "150px",
              backgroundColor: "#EEEEEE",
              borderRadius: "8px",
            }}
          >
            <Typography variant="body1">Awaiting Shipment</Typography>
          </Box>
        );
      },
    },
  ];
  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: "20px" }}>
        <Stack direction={"row"} spacing={"30px"}>
          <Button
            variant="outlined"
            type="button"
            sx={{
              border: "1px solid #212121",
              color: "#212121",
              height: "40px",
              width: "150px",
              borderRadius: "50px",
              fontSize:"14px",
              fontWeight: 600,
              textTransform: "none",
            }}
          >
            Upload Tracking
          </Button>
          <Button
            variant="outlined"
            type="button"
            sx={{
              border: "1px solid #212121",
              color: "#212121",
              height: "40px",
              width: "150px",
              borderRadius: "50px",
              fontSize:"14px",
              fontWeight: 600,
              textTransform: "none",
            }}
          >
            Shipping Export
          </Button>
          <Button
            variant="outlined"
            type="button"
            sx={{
              border: "1px solid #212121",
              color: "#212121",
              height: "40px",
              width: "180px",
              borderRadius: "50px",
              fontSize:"14px",
              fontWeight: 600,
              textTransform: "none",
            }}
          >
            Message All Creators
          </Button>
          <Button
            variant="contained"
            type="button"
            sx={{
              background: "#FFCC33",
              color: "#212121",
              height: "40px",
              width: "160px",
              borderRadius: "50px",
              fontSize:"14px",
              fontWeight: 600,
              textTransform: "none",
              boxShadow:"none"
            }}
          >
            All Orders Shipped
          </Button>
        </Stack>
      </Box>

      <CommonTable rows={rows} headCells={headCells} />
    </Box>
  );
};

export default Ship;
