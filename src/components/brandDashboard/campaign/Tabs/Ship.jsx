import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Stack, Typography } from "@mui/material";
import NorthEastIcon from "@mui/icons-material/NorthEast";
import CommonTable from "../../../common/commonTable/CommonTable";
import {
  allOrderShippedinBulk,
  getCampaignRequest,
  oneOrderShipped,
} from "../../../../../store/campaign_request/campaignRequest.slice";
import { useToastMessages } from "@/components/lib/messages/useToastMessages";

const Ship = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const dispatch = useDispatch();
  const params = useParams();
  const shipmentData = useSelector(
    (state) => state.CampaignRequest.campaignRequest.campaignRequestData
  );
  const { Success, Warn, Error } = useToastMessages();

  useEffect(() => {
    dispatch(
      getCampaignRequest({
        campaignId: params.campaignId,
        requestStatus: ["Awaiting_Shipment"],
        page: page + 1,
        pageSize: rowsPerPage,
      })
    );
  }, [page, rowsPerPage]);
  function createData(id, handle, address, product) {
    return {
      id,
      handle,
      address,
      product,
    };
  }

  const rows = shipmentData?.data?.map((item) => {
    return createData(
      item._id,
      item.creatorId?.firstName + " " + item.creatorId?.lastName,
      item.creatorId?.address1 + "," + item.creatorId?.address2,
      item.product
    );
  });

  // const rows = [
  //   createData(
  //     1,
  //     "neatandsocial",
  //     "John Doe, 1216 Broadway, Fl 2, New York, NY 10001 United States",
  //     "Tangerine & Citrus Blossom"
  //   ),
  //   createData(
  //     2,
  //     "Our.littlehome",
  //     "John Doe, 1216 Broadway, Fl 2, New York, NY 10001 United States",
  //     "Classic Pack"
  //   ),
  //   createData(
  //     3,
  //     "Mamatoflowers",
  //     "John Doe, 1216 Broadway, Fl 2, New York, NY 10001 United States",
  //     "Plastic Free Pack"
  //   ),
  //   createData(
  //     4,
  //     "liveymonte",
  //     "John Doe, 1216 Broadway, Fl 2, New York, NY 10001 United States",
  //     "Plastic Free Pack"
  //   ),
  //   createData(
  //     5,
  //     "Threebowsandablonde",
  //     "John Doe, 1216 Broadway, Fl 2, New York, NY 10001 United States",
  //     "Classic Pack"
  //   ),
  //   createData(
  //     6,
  //     "Mumingfrom.ito.z",
  //     "John Doe, 1216 Broadway, Fl 2, New York, NY 10001 United States",
  //     "Herbal Pack"
  //   ),
  //   createData(7, "Ice cream sandwich", "", 237, 9.0, 37),
  //   createData(8, "Jelly Bean", 375, 0.0, 94),
  //   createData(9, "KitKat", 518, 26.0, 65),
  //   createData(10, "Lollipop", 392, 0.2, 98),
  //   createData(11, "Marshmallow", 318, 0, 81),
  //   createData(12, "Nougat", 360, 19.0, 9),
  //   createData(13, "Oreo", 437, 18.0, 63),
  // ];

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
            onClick={(e) => orderShippedIndividually(item, e)}
            sx={{
              // "&:hover": { background: "#FFCC33" },
              background: "#FFCC33",
              color: "#212121",
              // height: "35px",
              width: "150px",
              borderRadius: "50px",
              fontSize: "14px",
              fontWeight: 500,
              textTransform: "none",
              boxShadow: "none",
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangePageForPagination = (event, newPage) => {
    setPage(newPage - 1);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const orderShippedinBulk = () => {
    dispatch(
      allOrderShippedinBulk({
        campaignId: params.campaignId,
      })
    ).then(() => {
      dispatch(
        getCampaignRequest({
          campaignId: params.campaignId,
          requestStatus: ["Awaiting_Shipment"],
          page: page + 1,
          pageSize: rowsPerPage,
        })
      );
    });
  };

  const orderShippedIndividually = (item, e) => {
    e.stopPropagation();
    dispatch(
      oneOrderShipped({
        campaignRequestId: item.id,
      })
    ).then(() => {
      dispatch(
        getCampaignRequest({
          campaignId: params.campaignId,
          requestStatus: ["Awaiting_Shipment"],
          page: page + 1,
          pageSize: rowsPerPage,
        })
      );
    });
  };

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
            sx={{
              border: "1px solid #212121",
              color: "#212121",
              height: "40px",
              width: "150px",
              borderRadius: "50px",
              fontSize: "14px",
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
              fontSize: "14px",
              fontWeight: 600,
              textTransform: "none",
            }}
          >
            Message All Creators
          </Button>
          <Button
            variant="contained"
            type="button"
            onClick={() => orderShippedinBulk()}
            sx={{
              background: "#FFCC33",
              color: "#212121",
              height: "40px",
              width: "160px",
              borderRadius: "50px",
              fontSize: "14px",
              fontWeight: 600,
              textTransform: "none",
              boxShadow: "none",
            }}
          >
            All Orders Shipped
          </Button>
        </Stack>
      </Box>

      {rows && (
        <Box sx={{ "& .MuiTableContainer-root": { borderRadius: "10px" } }}>
          <CommonTable
            rows={rows}
            headCells={headCells}
            page={page}
            rowsPerPage={rowsPerPage}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            pagination={shipmentData.pagination}
            onChangePagePagination={handleChangePageForPagination}
            isCheckbox={true}
          />
        </Box>
      )}
    </Box>
  );
};

export default Ship;
