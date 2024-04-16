import React, { useEffect, useMemo, useState } from "react";
import { Box, Button, Paper, Typography } from "@mui/material";
import CommonTable from "@/components/common/commonTable/CommonTable";
import { useDispatch, useSelector } from "react-redux";
import { getCampaignRequestByCreator } from "../../../../store/campaign_request/campaignRequest.slice";
import { useRouter } from "next/navigation";
import IssueModalForm from "./modal/IssueModalForm";

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

const ContentSubmitted = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [issueLinkOpen, setIssueLinkOpen] = useState({
    showIssueModal: false,
    allData: "",
  });
  const dispatch = useDispatch();
  const router = useRouter();

  const campaignByCreator = useSelector(
    (state) =>
      state.CampaignRequest?.campaignRequestByCreator
        ?.campaignRequestByCreatorData
  );

  // console.log("campaignByCreator", campaignByCreator);

  const updatingFunction = () => {
    dispatch(
      getCampaignRequestByCreator({
        page: page + 1,
        pageSize: rowsPerPage,
        requestStatus: [
          "Awaiting_Content_Approval",
          "Content_Rejected",
          "Content_Approved",
        ],
      })
    );
  };

  useEffect(() => {
    dispatch(
      getCampaignRequestByCreator({
        page: page + 1,
        pageSize: rowsPerPage,
        requestStatus: [
          "Awaiting_Content_Approval",
          "Content_Rejected",
          "Content_Approved",
        ],
      })
    );
  }, [page, rowsPerPage]);
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

  const rows = campaignByCreator?.data?.map((data, index) => {
    // console.log("data into pendingpage", data);
    return createData(
      data._id,
      data?.campaignId?.campaignDetails?.campaignName,
      data?.campaignId?.brandDetails?.name,
      new Date(
        data?.campaignId?.campaignDetails?.readyToReviewDate
      ).toLocaleDateString(),
      data?.campaignId,
      data?.requestStatus
    );
  });

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
      id: "postContent",
      numeric: true,
      disablePadding: false,
      label: "Post Content",
      renderCell: (item, index) => {
        console.log("item in postcontent", item);
        return (
          <>
            {item?.status === "Content_Approved" ? (
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
                  setIssueLinkOpen({
                    showIssueModal: true,
                    allData: item,
                  })
                }
              >
                Update Link
              </Button>
            ) : (
              "-"
            )}
          </>
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
              width: "12rem",
              backgroundColor:
                item?.status === "Awaiting_Content_Approval"
                  ? "#FFCC33"
                  : "#A4E504",
              borderRadius: "8px",
            }}
          >
            <Typography variant="body1">
              {item?.status === "Awaiting_Content_Approval"
                ? "Awaiting Content Approval"
                : item?.status === "Content_Approved"
                ? "Content Approved"
                : item?.status === "Content_Rejected"
                ? "Content Rejected"
                : ""}
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
    router.push(`/creator/dashboard/my-campaign/${item.campaignDetails}`);
  };

  return (
    <>
      <Box sx={{ width: "100%", display: "block" }}>
        <Paper
          sx={{
            width: "100%",
            mb: 2,
            boxShadow: "0px 0px 30px 0px #0000000D",
            padding: "30px 30px 00px 30px",
            "& .MuiTableContainer-root": { borderRadius: "10px" },
          }}
        >
          {rows && (
            <CommonTable
              rows={rows || []}
              headCells={headCells}
              page={page}
              rowsPerPage={rowsPerPage}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              pagination={campaignByCreator.pagination}
              onChangePagePagination={handleChangePageForPagination}
            />
          )}
        </Paper>
      </Box>
      <IssueModalForm
        open={issueLinkOpen.showIssueModal}
        allData={issueLinkOpen.allData}
        handleClose={() =>
          setIssueLinkOpen({ showIssueModal: false, allData: "" })
        }
        imageSmallUrls={imageSmallUrls}
        updatingFunction={updatingFunction}
      />
    </>
  );
};

export default ContentSubmitted;
