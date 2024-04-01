import CommonTable from "@/components/common/commonTable/CommonTable";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import IssueModalForm from "./modal/TodoIssueModalForm";
import { useDispatch, useSelector } from "react-redux";
import {
  getCampaignRequestByCreator,
  getCreatorIssuesbyId,
} from "../../../../store/campaign_request/campaignRequest.slice";
// import AwaitingContentModal from "../modal/AwaitingContentModal";

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

const Issue = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const dispatch = useDispatch();

  const campaignIssueByCreator = useSelector(
    (state) =>
      state.CampaignRequest?.campaignIssueByCreator?.campaignIssueByCreatorData
  );

  // console.log("campaignIssueByCreator", campaignIssueByCreator);

  useEffect(() => {
    dispatch(
      getCreatorIssuesbyId({
        page: page + 1,
        pageSize: rowsPerPage,
      })
    );
  }, [page, rowsPerPage]);

  function createData(id, campaignsName, issueType, issueḬnfo, status) {
    return {
      id,
      campaignsName,
      issueType,
      issueḬnfo,
      status,
    };
  }

  const rows = campaignIssueByCreator?.data?.map((data, index) => {
    // console.log("data into IssuePage", data);
    return createData(
      data._id,
      data?.campaignId?.campaignDetails?.campaignName,
      data?.issueType,
      data?.issueInfo,
      data?.issueStatus
    );
  });

  const headCells = [
    {
      id: "campaignsName",
      numeric: true,
      disablePadding: false,
      label: "Campaigns Name",
    },
    {
      id: "issueType",
      numeric: true,
      disablePadding: false,
      label: "Issue Type",
    },
    {
      id: "issueḬnfo",
      numeric: true,
      disablePadding: false,
      label: "Issue Info",
    },
    {
      id: "status",
      numeric: true,
      disablePadding: false,
      label: "Issue Status",
      renderCell: (item, index) => {
        return (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "36px",
              width: "152px",
              //   backgroundColor: "#D9F4DA",
              backgroundColor:
                item?.status === "PENDING" ? "#FFCC33" : "#A4E504",
              borderRadius: "8px",
            }}
          >
            <Typography variant="body1">
              {item?.status === "PENDING" ? "Pending" : ""}
            </Typography>
          </Box>
        );
      },
    },
  ];

  const handleChangePage = (event, newPage) => {
    // console.log("newPage", newPage);
    setPage(newPage);
  };

  const handleChangePageForPagination = (event, newPage) => {
    // console.log("newPage", newPage);
    setPage(newPage - 1);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box>
      <Box sx={{ display: "flex" }}>
        <Paper
          sx={{
            width: "100%",
            mb: 2,
            borderRadius: "30px",
            boxShadow: "0px 0px 30px 0px #0000000D",
            padding: "30px 30px 00px 30px",
          }}
        >
          {/* <Stack
            direction={"row"}
            spacing={"30px"}
            justifyContent={"flex-end"}
            sx={{ mb: "20px" }}
          >
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
                boxShadow: "none",
              }}
              onClick={handleOpen}
            >
              Add Issue
            </Button>
          </Stack> */}

          {rows && (
            <CommonTable
              rows={rows || []}
              headCells={headCells}
              page={page}
              rowsPerPage={rowsPerPage}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              pagination={campaignIssueByCreator.pagination}
              onChangePagePagination={handleChangePageForPagination}
            />
          )}
        </Paper>
      </Box>
      {/* <IssueModalForm open={open} handleClose={handleClose} /> */}
    </Box>
  );
};

export default Issue;
