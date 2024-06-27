import React, { useEffect, useMemo, useState } from "react";
import { Box, Button, Paper, Typography } from "@mui/material";
import CommonTable from "@/components/common/commonTable/CommonTable";
import { useDispatch, useSelector } from "react-redux";
import { getCampaignRequestByCreator } from "../../../../store/campaign_request/campaignRequest.slice";
import { useRouter } from "next/navigation";
import { statusColorMap } from "@/helper/fn";

const Complete = () => {
  const [open, setOpen] = useState({ showModal: false, id: "" });
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const router = useRouter();
  // const [filterStatus, setFilterStatus] = useState("To-Do");

  // console.log(activeTab, "activeTab");
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
        requestStatus: ["Completed"],
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

  const rows = campaignByCreator?.data?.map((data, index) => {
    return createData(
      data._id,
      data.campaignId?.campaignDetails?.campaignName,
      data?.campaignId?.brandDetails?.name,
      data?.campaignId?.campaignDetails?.readyToReviewDate
        ? new Date(
            data?.campaignId?.campaignDetails?.readyToReviewDate
          ).toLocaleDateString()
        : "-",
      data?.campaignId,
      data?.requestStatus
    );
  });

  const handleViewClick = (event, item) => {
    event.stopPropagation();
    // console.log("clicked", item.campaignId);
    router.push(`/creator/dashboard/my-campaign/${item?.campaignDetails?._id}`);
  };

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
        console.log(item, "item in complte");
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
        console.log("item", item);
        return (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "36px",
              width: "150px",
              backgroundColor:
                // item?.status === "Completed" ? "#A4E504" : "#FFCC33",
                statusColorMap[item?.status],
              borderRadius: "8px",
            }}
          >
            <Typography variant="body1">{item?.status}</Typography>
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
  return (
    <>
      <Box sx={{ width: "100%", display: "block" }}>
        <Paper
          sx={{
            width: "100%",
            mb: 2,
            borderRadius: "30px",
            "& .MuiTableContainer-root": { borderRadius: "10px" },
            boxShadow: "0px 0px 30px 0px #0000000D",
            padding: "30px 30px 00px 30px",
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
              pagination={campaignByCreator?.pagination}
              onChangePagePagination={handleChangePageForPagination}
            />
          )}
        </Paper>
      </Box>
    </>
  );
};

export default Complete;
