import React, { useEffect, useMemo, useState } from "react";
import { Box, Button, Paper, Typography } from "@mui/material";
import CommonTable from "@/components/common/commonTable/CommonTable";
import { useRouter } from "next/navigation";
import ReviewPage from "../review/ReviewPage";
import { useDispatch, useSelector } from "react-redux";
import { getCampaignRequestByCreator } from "../../../../../store/campaign_request/campaignRequest.slice";

const PendingPage = () => {
  const [open, setOpen] = useState({ showModal: false, id: "" });
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const dispatch = useDispatch();

  const campaignByCreator = useSelector(
    (state) =>
      state.CampaignRequest?.campaignRequestByCreator
        ?.campaignRequestByCreatorData
  );

  console.log("campaignByCreator", campaignByCreator);

  useEffect(() => {
    dispatch(
      getCampaignRequestByCreator({
        page: page + 1,
        pageSize: rowsPerPage,
        requestStatus: ["Awaiting_Approval"],
      })
    );
  }, [page, rowsPerPage]);

  const router = useRouter();

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
      data?.campaignId?._id,
      data?.requestStatus
    );
  });

  // console.log("rows", rows);

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
              width: "130px",
              backgroundColor:
                item.status === "Pending"
                  ? "#FFCC33"
                  : item.status === "Awaiting_Approval"
                  ? "#EEEEEE"
                  : "#FFCC33",
              borderRadius: "8px",
            }}
          >
            <Typography variant="body1">
              {item.status === "Awaiting_Approval" ? "Awaiting Approval" : ""}
            </Typography>
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

  const handleViewClick = (event, item) => {
    event.stopPropagation();
    // console.log("clicked", item.campaignId);
    // router.push(`/creator/campaign/${item.campaignDetails}`);
    router.push(
      `/creator/dashboard/campaign/${item.campaignDetails}?data=${item.id}`
      // query: { data: item },
    );
  };

  return (
    <>
      <Box sx={{ width: "100%", display: "block" }}>
        <Paper
          sx={{
            width: "100%",
            mt: 5,
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
    </>
  );
};

export default PendingPage;
