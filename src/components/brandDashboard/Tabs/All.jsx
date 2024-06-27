import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  LinearProgress,
  Paper,
  Typography,
} from "@mui/material";
import CommonTable from "../../common/commonTable/CommonTable";
import { useDispatch, useSelector } from "react-redux";
import { getCampaignsData } from "../../../../store/brief_builder/campaign/campaign.slice";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";

const All = ({ activeTab }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const dispatch = useDispatch();
  const router = useRouter();
  const capmpaignsData = useSelector((state) => state.Campaign.getCampaigns);

  // console.log("capmpaignsData", capmpaignsData.campaigns);

  useEffect(() => {
    const statusForFilter =
      activeTab === "All"
        ? ""
        : activeTab === "Active"
        ? "In Progress"
        : activeTab === "Previous"
        ? "Complete"
        : "Draft";
    dispatch(
      getCampaignsData({
        page: page + 1,
        pageSize: rowsPerPage,
        status: statusForFilter,
      })
    );
  }, [page, rowsPerPage, activeTab]);

  function createData(id, campaignsName, deadline, campaignDetails, status) {
    return {
      id,
      campaignsName,
      deadline,
      campaignDetails,
      status,
    };
  }

  const rows = capmpaignsData?.campaigns?.data?.map((data, index) => {
    const readyToReviewDate = data.campaignDetails.readyToReviewDate
      ? dayjs(data.campaignDetails.readyToReviewDate).format("DD/MM/YYYY")
      : "----";

    return createData(
      data._id,
      data.campaignDetails.campaignName,
      readyToReviewDate,
      "",
      data.campaignDetails.campaignStatus
    );
  });

  // const rows = [
  //   createData(1, "Cupcake", 305, 3.7, 67),
  //   createData(2, "Donut", 452, 25.0, 51),
  //   createData(3, "Eclair", 262, 16.0, 24),
  //   createData(4, "Frozen yoghurt", 159, 6.0, 24),
  //   createData(5, "Gingerbread", 356, 16.0, 49),
  //   createData(6, "Honeycomb", 408, 3.2, 87),
  //   createData(7, "Ice cream sandwich", 237, 9.0, 37),
  //   createData(8, "Jelly Bean", 375, 0.0, 94),
  //   createData(9, "KitKat", 518, 26.0, 65),
  //   createData(10, "Lollipop", 392, 0.2, 98),
  //   createData(11, "Marshmallow", 318, 0, 81),
  //   createData(12, "Nougat", 360, 19.0, 9),
  //   createData(13, "Oreo", 437, 18.0, 63),
  // ];
  console.log(rows, "rows");

  const headCells = [
    {
      id: "campaignsName",
      numeric: false,
      disablePadding: true,
      label: "Campaigns Name",
    },
    {
      id: "deadline",
      numeric: true,
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
            onClick={(e) => onClickBrief(e, item)}
            sx={{
              border: "1px solid #212121",
              color: "#212121",
              // height: "35px",
              // width: "118px",
              borderRadius: "50px",
              fontWeight: 500,
              textTransform: "none",
            }}
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
            onClick={(e) => item.status === "Draft" && onClickDraft(e, item)}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "36px",
              width: "100px",
              backgroundColor:
                item.status === "Complete"
                  ? "#A4E504"
                  : item.status === "Draft"
                  ? "#F2424C"
                  : "#FFCC33",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            <Typography variant="body1">{item.status}</Typography>
          </Box>
        );
      },
    },
  ];

  const handleChangePage = (event, newPage) => {
    console.log("newPage", newPage);
    setPage(newPage);
  };
  const handleChangePageForPagination = (event, newPage) => {
    console.log("newPage", newPage);
    setPage(newPage - 1);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const onClickBrief = (e, item) => {
    e.stopPropagation();

    router.push(`/brand/dashboard/view-brief/${item.id}`);
  };

  const onClickDraft = (e, item) => {
    e.stopPropagation();
    router.push(`/brief_builder/${item.id}`);
  };

  const onclickHandler = (item) => {
    router.push(`/brand/dashboard/${item.id}`);
  };
  return (
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
        {/* {capmpaignsData.loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              pb:"30px"
            }}
          >
            <CircularProgress  color="primary" variant="indeterminate" />
          </Box>
        ) : ( */}
        {rows && (
          <CommonTable
            rows={rows || []}
            headCells={headCells}
            page={page}
            rowsPerPage={rowsPerPage}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            pagination={capmpaignsData.campaigns.pagination}
            onChangePagePagination={handleChangePageForPagination}
            isCheckbox={false}
            onclickHandler={onclickHandler}
          />
        )}
        {/* )} */}
      </Paper>
    </Box>
  );
};

export default All;
