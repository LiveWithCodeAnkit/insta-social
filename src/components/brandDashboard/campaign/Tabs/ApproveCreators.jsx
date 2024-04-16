import {
  Avatar,
  Box,
  Button,
  Divider,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
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

const imageSmallUrls = [
  "/images/dummy/small_pic_1.png",
  "/images/dummy/small_pic_2.png",
  "/images/dummy/small_pic_3.png",
  "/images/dummy/small_pic_4.png",
  "/images/dummy/small_pic_3.png",
];

const ApproveCreators = () => {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [modalData, setModalData] = useState({});
  const dispatch = useDispatch();
  const params = useParams();
  const approveCreatorsData = useSelector(
    (state) => state.CampaignRequest.campaignRequest.campaignRequestData
  );
  console.log(approveCreatorsData, "approveCreatorsData");

  useEffect(() => {
    dispatch(
      getCampaignRequest({
        campaignId: params.campaignId,
        requestStatus: ["Request_Approved"],
        page: page + 1,
        pageSize: rowsPerPage,
      })
    );
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
      item.product,
      item.action,
      item.status
    );
  });

  // const rows = [
  //   createData(1, "neatandsocial", "", "Tangerine & Citrus Blossom"),
  //   createData(2, "Our.littlehome", "", "Classic Pack"),
  //   createData(3, "Mamatoflowers", "", "Plastic Free Pack"),
  //   createData(4, "liveymonte", "", "Plastic Free Pack"),
  //   createData(5, "Threebowsandablonde", "", "Classic Pack"),
  //   createData(6, "Mumingfrom.ito.z", "", "Herbal Pack"),
  //   createData(7, "Ice cream sandwich", "", 237, 9.0, 37),
  //   createData(8, "Jelly Bean", 375, 0.0, 94),
  //   createData(9, "KitKat", 518, 26.0, 65),
  //   createData(10, "Lollipop", 392, 0.2, 98),
  //   createData(11, "Marshmallow", 318, 0, 81),
  //   createData(12, "Nougat", 360, 19.0, 9),
  //   createData(13, "Oreo", 437, 18.0, 63),
  // ];

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

  const approveRejectHandler = (item, status, e) => {
    e.stopPropagation();
    dispatch(
      campaignApproveReject({ campaignId: item.id, status: status })
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

  const isFavoriteHandler = (item, e) => {
    e.stopPropagation();
    console.log(item, "item");
    const newFavoriteStatus = !item.favorites;
    console.log(item, "item");
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
            onClick={(e) => isFavoriteHandler(item, e)}
            sx={{
              border: item.favorites ? "none" : "1px solid #212121",
              color: item.favorites === true ? "#fff" : "#212121",
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
              onClick={(e) => approveRejectHandler(item, "approve", e)}
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
              onClick={(e) => approveRejectHandler(item, "reject", e)}
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

      {rows && (
        <Box sx={{ "& .MuiTableContainer-root": { borderRadius: "10px" } }}>
          <CommonTable
            rows={rows}
            headCells={headCells}
            onclickHandler={onRowClickHandler}
            page={page}
            rowsPerPage={rowsPerPage}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            pagination={approveCreatorsData.pagination}
            onChangePagePagination={handleChangePageForPagination}
            isCheckbox={true}
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
      />
    </Box>
  );
};

export default ApproveCreators;
