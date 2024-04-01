import { Box, Button, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CommonTable from "../../../common/commonTable/CommonTable";
import IssueBriefModal from "../modal/IssueBriefModal";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "next/navigation";
import {
  getCampaignIssuesbyId,
  getCampaignRequest,
} from "../../../../../store/campaign_request/campaignRequest.slice";
import { useToastMessages } from "@/components/lib/messages/useToastMessages";

const imageSmallUrls = [
  "/images/dummy/small_pic_1.png",
  "/images/dummy/small_pic_2.png",
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

const Issue = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const dispatch = useDispatch();
  const params = useParams();
  const [open, setOpen] = useState(false);
  const issueData = useSelector(
    (state) => state.CampaignRequest.campaignRequest.campaignRequestData
  );
  const { Success, Warn, Error } = useToastMessages();
  console.log(issueData, "issueData");

  useEffect(() => {
    dispatch(
      getCampaignIssuesbyId({
        campaignId: params.campaignId,
        page: page + 1,
        pageSize: rowsPerPage,
      })
    );
  }, [page, rowsPerPage]);

  const handleOpen = () => setOpen(true);
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

  const onRowClickHandler = () => {
    handleOpen();
  };

  function createData(id, handle, product, tracking, action, notes, status) {
    return {
      id,
      handle,
      product,
      tracking,
      action,
      notes,
      status,
    };
  }

  const rows = issueData?.data?.map((item) => {
    return createData(
      item._id,
      item.creatorId.firstName + " " + item.creatorId.lastName,
      item.product,
      "",
      "",
      item.issueInfo,
      item.issueType
    );
  });

  const headCells = [
    {
      id: "handle",
      numeric: false,
      disablePadding: true,
      label: "Handle",
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
      id: "action",
      numeric: true,
      disablePadding: false,
      label: "Action",
      renderCell: (item, index) => {
        return (
          <Stack direction="row" spacing={{ xs: 1, sm: 1.5, md: 2 }}>
            <Button
              variant="outlined"
              type="button"
              sx={{
                border: "1px solid #212121",
                color: "#212121",
                // height: "40px",
                width: "150px",
                borderRadius: "50px",
                fontSize: "14px",
                fontWeight: 500,
                textTransform: "none",
              }}
            >
              Message Creator
            </Button>
            <Button
              variant="contained"
              type="button"
              sx={{
                background: "#FFCC33",
                color: "#212121",
                // height: "40px",
                width: "72px",
                borderRadius: "50px",
                fontSize: "14px",
                fontWeight: 500,
                textTransform: "none",
                boxShadow: "none",
              }}
            >
              Reship
            </Button>
            <Button
              variant="outlined"
              type="button"
              sx={{
                "&:hover": {
                  backgroundColor: "info.lighter",
                },
                border: "none !important",
                color: "#00B2F7",
                // height: "40px",
                // width: "105px",
                borderRadius: "50px",
                fontSize: "14px",
                fontWeight: 500,
                textTransform: "none",
              }}
            >
              Close
            </Button>
          </Stack>
        );
      },
    },
    {
      id: "notes",
      numeric: true,
      disablePadding: false,
      label: "Notes",
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
              width: "127px",
              backgroundColor:
                item.status === "PRODUCT_ISSUE" ? "#D9F4DA" : "#D8F4FF",
              borderRadius: "8px",
            }}
          >
            <Typography variant="body1">
              {item.status === "PRODUCT_ISSUE"
                ? "Product Issue"
                : "Shipping Issue"}
            </Typography>
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
            size="large"
            sx={{
              border: "1px solid #212121",
              color: "#212121",
              // width: "150px",
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
              // width: "117px",
              borderRadius: "50px",
              fontSize: "14px",
              fontWeight: 600,
              textTransform: "none",
              boxShadow: "none",
            }}
          >
            Reship All
          </Button>
        </Stack>
      </Box>

      {rows && (
        <CommonTable
          rows={rows}
          headCells={headCells}
          onclickHandler={onRowClickHandler}
          page={page}
          rowsPerPage={rowsPerPage}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
          pagination={issueData.pagination}
          onChangePagePagination={handleChangePageForPagination}
        />
      )}

      <IssueBriefModal
        imageSmallUrls={imageSmallUrls}
        open={open}
        handleClose={handleClose}
      />
    </Box>
  );
};

export default Issue;
