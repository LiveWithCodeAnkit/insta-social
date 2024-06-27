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
import TrackingModal from "../modal/TrackingModal";
import { postExportCSVShipping } from "../../../../../store/brief_builder/campaign/campaign.slice";

const Ship = ({ fetchCampaignStatistics }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selected, setSelected] = useState([]);
  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState({});

  const dispatch = useDispatch();
  const params = useParams();
  const shipmentData = useSelector(
    (state) => state.CampaignRequest.campaignRequest.campaignRequestData
  );
  const { Success, Warn, Error } = useToastMessages();
  console.log(shipmentData, "shipmentData");

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
  function createData(id, handle, address, product, tracking) {
    return {
      id,
      handle,
      address,
      product,
      tracking,
    };
  }

  const rows = shipmentData?.data?.map((item) => {
    return createData(
      item._id,
      item.creatorId?.firstName + " " + item.creatorId?.lastName,
      item.creatorId?.address1 + "," + item.creatorId?.address2,
      item.selectedOfferVariants
        ?.filter((data) => data?.offerId?.offerType === "GIFT")
        ?.map(
          (data) =>
            `${data?.offerId?.productName || "-"}${
              `(${data?.variant})` || data?.variant
            }`
        )
        .join(", ") || "-",
      item.trackingNumber
    );
  });

  const updatingFunction = () => {
    dispatch(
      getCampaignRequest({
        campaignId: params.campaignId,
        requestStatus: ["Awaiting_Shipment"],
        page: page + 1,
        pageSize: rowsPerPage,
      })
    );
    fetchCampaignStatistics();
  };

  const shouldShowButton = shipmentData?.data && shipmentData.data.length > 0;
  const shouldEnableButton =
    shouldShowButton &&
    shipmentData.data[0].campaignId.campaignDetails.joinedCretors >=
      shipmentData.data[0].campaignId.campaignDetails.minNumberOfCreator;
  console.log(shouldEnableButton, "shouldEnableButton");

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
      renderCell: (item, index) => {
        return (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              height: "36px",
              width: "150px",
            }}
          >
            <Typography variant="body1">{item.product}</Typography>
          </Box>
        );
      },
    },
    {
      id: "tracking",
      numeric: true,
      disablePadding: false,
      label: "Tracking",
      renderCell: (item, index) => {
        return (
          <>
            {item?.tracking === null ? (
              <Button
                variant="outlined"
                type="button"
                onClick={(e) => handleOpen(e, item)}
                sx={{
                  border: "none !important",
                  color: "#212121",
                  borderRadius: "50px",
                  fontSize: "14px",
                  fontWeight: 500,
                  textTransform: "none",
                  color: "secondary.main",
                  opacity: "0.7",
                  whiteSpace: "nowrap",
                }}
              >
                + &nbsp;Add Tracking
              </Button>
            ) : (
              <Button
                variant="outlined"
                type="button"
                onClick={(e) => handleOpen(e, item)}
                sx={{
                  border: "none !important",
                  color: "#212121",
                  borderRadius: "50px",
                  fontSize: "14px",
                  fontWeight: 500,
                  textTransform: "none",
                  // color: "secondary.main",
                  opacity: "0.7",
                  whiteSpace: "nowrap",
                  "&:hover ": {
                    textDecoration: "underline",
                  },
                }}
              >
                {item?.tracking}
              </Button>
            )}
          </>
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
            onClick={(e) => orderShippedinBulk([item.id], e)}
            disabled={!shouldEnableButton}
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

  const handleOpen = (e, item) => {
    setOpen(true);
    setModalData(item);
  };
  const handleClose = () => setOpen(false);

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

  const orderShippedinBulk = (selectedItems) => {
    if (selectedItems.length === 0) {
      Warn("Please select atleast one item");
      return;
    }
    dispatch(
      allOrderShippedinBulk({
        campaignRequestIds: selectedItems,
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
      fetchCampaignStatistics();
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

  const handleSelectAllClick = (event) => {
    event.stopPropagation();
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };
  const handleClickOnCheckbox = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  //api call
  const handleCSVFIle = async () => {
    const res = await dispatch(postExportCSVShipping(params.campaignId));

    if (res.payload) {
      const url = window.URL.createObjectURL(new Blob([res.payload]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "shippingInfo.csv");
      document.body.appendChild(link);
      link.click();
      link.remove();
    }
  };

  //
  return (
    <Box>
      {rows?.length > 0 && (
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
              onClick={handleCSVFIle}
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
              onClick={() => orderShippedinBulk(selected)}
              disabled={!shouldEnableButton}
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
      )}

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
            selected={selected}
            handleSelectAllClick={handleSelectAllClick}
            handleClickOnCheckbox={handleClickOnCheckbox}
          />
        </Box>
      )}
      {
        <TrackingModal
          open={open}
          handleClose={handleClose}
          modalData={modalData}
          updatingFunction={updatingFunction}
        />
      }
    </Box>
  );
};

export default Ship;
