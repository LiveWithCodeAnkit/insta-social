import {
  Avatar,
  Box,
  Button,
  Divider,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "next/navigation";
import CommonTable from "../../../common/commonTable/CommonTable";
import StarIcon from "@mui/icons-material/Star";
import HandleBriefModal from "../modal/HandleBriefModal";
import {
  campaignApproveReject,
  contentIsFavoritebyBrand,
  getCampaignRequest,
} from "../../../../../store/campaign_request/campaignRequest.slice";
import { useToastMessages } from "@/components/lib/messages/useToastMessages";

const imageSmallUrls = [
  "/images/dummy/small_pic_1.png",
  "/images/dummy/small_pic_2.png",
  "/images/dummy/small_pic_3.png",
  "/images/dummy/small_pic_4.png",
  "/images/dummy/small_pic_3.png",
];

const ApproveCreators = ({ fetchCampaignStatistics }) => {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [modalData, setModalData] = useState({});
  const [selected, setSelected] = useState([]);

  const dispatch = useDispatch();
  const params = useParams();
  const { Success, Warn, Error } = useToastMessages();
  const approveCreatorsData = useSelector(
    (state) => state.CampaignRequest.campaignRequest.campaignRequestData
  );
  console.log(approveCreatorsData, "approveCreatorsData");
  const getCampaignRequestList=useMemo(()=>(payload)=>{
    dispatch(
      getCampaignRequest({
        campaignId: payload?.campaignId||params?.campaignId,
        requestStatus: ["Request_Approved"],
        page: page + 1,
        pageSize: rowsPerPage,
      })
    );
  },[params.campaignId,page,rowsPerPage])


  useEffect(() => {
    // dispatch(
    //   getCampaignRequest({
    //     campaignId: params.campaignId,
    //     requestStatus: ["Request_Approved"],
    //     page: page + 1,
    //     pageSize: rowsPerPage,
    //   })
    // );
    getCampaignRequestList();
  }, [page, rowsPerPage]);

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

  const rows = approveCreatorsData?.data?.map((item, index) => {
    return createData(
      item._id,
      item.creatorId?.firstName + " " + item.creatorId?.lastName,
      item.isFavoriteByBrand,
      item.selectedOfferVariants
        ?.filter((data) => data?.offerId?.offerType === "GIFT")
        ?.map(
          (data) =>
            `${data?.offerId?.productName || "-"}${
              `(${data?.variant})` || data?.variant
            }`
        )
        .join(", ") || "-",
      item.action,
      item.status
    );
  });

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

  const onRowClickHandler = (item, id) => {
    setModalData(item);
    handleOpen();
  };

  const approveRejectHandler = (selectedItems, status, e) => {
    e.stopPropagation();

    if (selectedItems.length > 0) {
      dispatch(
        campaignApproveReject({
          campaignId: params.campaignId,
          campaignRequestIds: selectedItems,
          status: status,
        })
      ).then(() => {
        getCampaignRequestList();
        fetchCampaignStatistics();
      });
    } else {
      Warn("Please select atleast one item");
    }
  };

  const isFavoriteHandler = (item, e) => {
    e.stopPropagation();
    const newFavoriteStatus = !item.favorites;
    dispatch(
      contentIsFavoritebyBrand({
        campaignRequestId: item.id,
        isFavorite: newFavoriteStatus,
      })
    ).then(() => {
      dispatch(
        getCampaignRequest({
          campaignId: params.campaignId,
          requestStatus: ["Request_Approved"],
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

  const headCells = [
    {
      id: "handle",
      numeric: false,
      disablePadding: true,
      label: "Handle",
      renderCell: (item, index) => {
        return (
          <Button
            variant="text"
            type="button"
            onClick={(e) => onRowClickHandler(item, index)}
            sx={{
              color: "#212121",
              fontSize: "14px",
              fontWeight: 500,
              textTransform: "none",
            }}
          >
            {item.handle}
          </Button>
        );
      },
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
            onClick={(e) => isFavoriteHandler(item, e)}
            sx={{
              border: item.favorites ? "none" : "1px solid #212121",
              color: item.favorites ? "#fff" : "#212121",
              backgroundColor: item.favorites ? "#FFCC33" : "#fff",
              // height: "35px",
              width: "118px",
              borderRadius: "50px",
              fontSize: "14px",
              fontWeight: 500,
              textTransform: "none",
              ":hover": {
                background: item.favorites && "#fcbf09",
              },
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
      renderCell: (item, index, e) => {
        return (
          <Stack direction="row" spacing={{ xs: 1.5, sm: 2.5, md: 4 }}>
            <Button
              variant="contained"
              type="button"
              onClick={(e) => approveRejectHandler([item.id], "approve", e)}
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
              onClick={(e) => approveRejectHandler([item.id], "reject", e)}
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

  return (
    <Box>
      {rows?.length > 0 && (
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: "20px" }}>
          <Stack direction={"row"} spacing={"30px"}>
            <Button
              variant="contained"
              type="button"
              // size="large"
              onClick={(e) => approveRejectHandler(selected, "approve", e)}
              // disabled={selected.length === 0}
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
            pagination={approveCreatorsData.pagination}
            onChangePagePagination={handleChangePageForPagination}
            isCheckbox={true}
            selected={selected}
            handleSelectAllClick={handleSelectAllClick}
            handleClickOnCheckbox={handleClickOnCheckbox}
          />
        </Box>
      )}

      <HandleBriefModal
        imageSmallUrls={imageSmallUrls}
        open={open}
        handleClose={handleClose}
        data={modalData}
        campaignId={params.campaignId}
        page={page}
        rowsPerPage={rowsPerPage}
        fetchCampaignStatistics={fetchCampaignStatistics}
        getCampaignRequestList={getCampaignRequestList}
      />
    </Box>
  );
};

export default ApproveCreators;
