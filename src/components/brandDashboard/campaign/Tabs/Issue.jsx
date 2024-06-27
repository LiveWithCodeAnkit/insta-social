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
import { statusMap } from "@/helper/fn";

const Issue = ({ fetchCampaignStatistics }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const dispatch = useDispatch();
  const params = useParams();
  const [open, setOpen] = useState(false);
  const [viewIssue, setViewIssue] = useState({
    showIssueModal: false,
    allData: "",
  });
  const issueData = useSelector(
    (state) => state.CampaignRequest.campaignRequest.campaignRequestData
  );
  const { Success, Warn, Error } = useToastMessages();
  console.log(issueData, "issueData");
  console.log(viewIssue, "viewIssue");

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

  // const onRowClickHandler = (item) => {
  //   handleOpen();
  //   setModalData(item);
  // };

  function createData(
    id,
    handle,
    product,
    // tracking,
    action,
    notes,
    viewIssue,
    issueType,
    status
  ) {
    return {
      id,
      handle,
      product,
      // tracking,
      action,
      notes,
      viewIssue,
      issueType,
      status,
    };
  }

  const rows = issueData?.data?.map((item) => {
    // console.log(item, "item into issuePage");
    return createData(
      item._id,
      item.creatorId?.firstName + " " + item.creatorId?.lastName,
      item.campaignRequestId?.selectedOfferVariants
        ?.filter((data) => data?.offerId?.offerType === "GIFT")
        ?.map(
          (data) =>
            `${data?.offerId?.productName || "-"}${
              `(${data?.variant})` || data?.variant
            }`
        )
        .join(", ") || "-",
      "",
      item.issueInfo,
      item,
      item.issueType,
      item.issueStatus
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
      id: "action",
      numeric: true,
      disablePadding: false,
      label: "Action",
      renderCell: (item, index) => {
        // console.log(item, "item into action");
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
            {item?.status === "RESHIPPED" || item?.status === "CLOSED" ? (
              ""
            ) : (
              <>
                {item?.status === "PENDING" && item?.product !== "-" && (
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
                )}
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
              </>
            )}
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
      id: "viewIssue",
      numeric: true,
      disablePadding: false,
      label: "View Issue",
      renderCell: (item, index) => {
        console.log(item, "item into clicked");
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
            onClick={(e) =>
              setViewIssue({
                showIssueModal: true,
                allData: item,
              })
            }
          >
            View Issue
          </Button>
        );
      },
    },
    {
      id: "issueType",
      numeric: true,
      disablePadding: false,
      label: "Type",
      renderCell: (item, index) => {
        console.log(item, "item into issue type");
        return (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "36px",
              width: "127px",
              borderRadius: "8px",
              backgroundColor: "#FFCC33",
            }}
          >
            <Typography variant="body1">
              {statusMap[item?.issueType]}
            </Typography>
          </Box>
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
              width: "127px",
              backgroundColor:
                item.status === "PENDING" ? "#D9F4DA" : "#D8F4FF",
              borderRadius: "8px",
            }}
          >
            <Typography variant="body1">{item.status}</Typography>
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
      )}

      {rows && (
        <Box sx={{ "& .MuiTableContainer-root": { borderRadius: "10px" } }}>
          <CommonTable
            rows={rows}
            headCells={headCells}
            // onclickHandler={onRowClickHandler}
            page={page}
            rowsPerPage={rowsPerPage}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            pagination={issueData.pagination}
            onChangePagePagination={handleChangePageForPagination}
            isCheckbox={true}
          />
        </Box>
      )}

      <IssueBriefModal
        open={viewIssue.showIssueModal}
        allData={viewIssue.allData}
        handleClose={() => setViewIssue({ showIssueModal: false, allData: "" })}
      />
    </Box>
  );
};

export default Issue;
