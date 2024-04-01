import React, { useEffect, useMemo, useState } from "react";
import { Box, Button, Paper, Typography } from "@mui/material";
import CommonTable from "@/components/common/commonTable/CommonTable";
import UploadContentModal from "./modal/UploadContentModal";
import { useDispatch, useSelector } from "react-redux";
import { getCampaignRequestByCreator } from "../../../../store/campaign_request/campaignRequest.slice";
import { useRouter } from "next/navigation";
import TodoIssueModalForm from "./modal/TodoIssueModalForm";

const TodoTable = ({ activeTab }) => {
  const [open, setOpen] = useState({ showModal: false, id: "", alldata: "" });
  const [issueOpen, setIssueOpen] = useState({
    showIssueModal: false,
    id: "",
    allData: "",
  });
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  // const [filterStatus, setFilterStatus] = useState("To-Do");

  const router = useRouter();

  // console.log(activeTab, "activeTab");
  const campaignByCreator = useSelector(
    (state) =>
      state.CampaignRequest?.campaignRequestByCreator
        ?.campaignRequestByCreatorData
  );

  // console.log("campaignByCreator", campaignByCreator);

  useEffect(() => {
    dispatch(
      getCampaignRequestByCreator({
        page: page + 1,
        pageSize: rowsPerPage,
        requestStatus: ["Awaiting_Shipment", "Awaiting_Content"],
      })
    );
  }, [page, rowsPerPage]);

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

  const rows = campaignByCreator?.data?.map((item, index) => {
    return createData(
      item._id,
      item.campaignId?.campaignDetails?.campaignName,
      item?.campaignId?.brandDetails?.name,
      new Date(
        item?.campaignId?.campaignDetails?.readyToReviewDate
      ).toLocaleDateString(),
      item?.campaignId?._id,
      item?.requestStatus
    );
  });

  console.log("rows", rows);

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
            onClick={(event) => handleViewClick(event, item)}
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
            onClick={(e) =>
              setIssueOpen({
                showIssueModal: true,
                id: item?.id,
                allData: item,
              })
            }
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
        const isAwaitingContent = item.status === "Awaiting_Content";
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
            disabled={isAwaitingContent}
            onClick={(e) =>
              setOpen({ showModal: true, id: item.id, alldata: item })
            }
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
              width: "150px",
              backgroundColor:
                item?.status === "Awaiting_Shipment" ? "#FFCC33" : "#A4E504",
              borderRadius: "8px",
            }}
          >
            <Typography variant="body1">
              {item?.status === "Awaiting_Shipment"
                ? "Awaiting Shipment"
                : "Awaiting Content"}
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

  const handleViewClick = (event, item) => {
    event.stopPropagation();
    // console.log("clicked", item.campaignId);
    router.push(`/creator/dashboard/campaign/${item.campaignDetails}`);
  };

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
          {/* <CommonTable rows={rows} headCells={headCells} /> */}
          {rows && (
            <CommonTable
              rows={rows || []}
              headCells={headCells}
              page={page}
              rowsPerPage={rowsPerPage}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              pagination={campaignByCreator?.pagination}
              onChangePagePagination={handleChangePageForPagination}
            />
          )}
        </Paper>
      </Box>
      <UploadContentModal
        open={open.showModal}
        allData={open.alldata}
        handleClose={() => setOpen({ showModal: false, id: "" })}
        imageSmallUrls={imageSmallUrls}
      />
      <TodoIssueModalForm
        open={issueOpen.showIssueModal}
        allData={issueOpen.allData}
        handleClose={() => setIssueOpen({ showIssueModal: false, id: "" })}
      />
    </>
  );
};

export default TodoTable;
