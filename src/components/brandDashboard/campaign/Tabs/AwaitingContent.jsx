import { Box, Button, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CommonTable from "../../../common/commonTable/CommonTable";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { useToastMessages } from "@/components/lib/messages/useToastMessages";
import { getCampaignRequest } from "../../../../../store/campaign_request/campaignRequest.slice";

const AwaitingContent = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const dispatch = useDispatch();
  const params = useParams();
  const awaitingContentData = useSelector(
    (state) => state.CampaignRequest.campaignRequest.campaignRequestData
  );
  const { Success, Warn, Error } = useToastMessages();
  console.log(awaitingContentData, "awaitingContentData");

  useEffect(() => {
    dispatch(
      getCampaignRequest({
        campaignId: params.campaignId,
        requestStatus: ["Awaiting_Content"],
        page: page + 1,
        pageSize: rowsPerPage,
      })
    );
  }, [page, rowsPerPage]);

  function createData(id, handle, campaignName, tracking, action, status) {
    return {
      id,
      handle,
      campaignName,
    };
  }

  const rows = awaitingContentData?.data?.map((item) => {
    return createData(
      item?._id,
      item.creatorId.firstName + " " + item.creatorId.lastName,
      item?.campaignId?.campaignDetails?.campaignName
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
      id: "campaignName",
      numeric: true,
      disablePadding: false,
      label: "Campign Name",
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
          <Button
            variant="outlined"
            type="button"
            sx={{
              border: "1px solid #212121",
              color: "#212121",
              // height: "40px",
              // width: "168px",
              borderRadius: "50px",
              fontSize: "14px",
              fontWeight: 500,
              textTransform: "none",
            }}
          >
            Message Creator
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
              width: "152px",
              backgroundColor: "#D9F4DA",
              borderRadius: "8px",
            }}
          >
            <Typography variant="body1">Awaiting Content</Typography>
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

  const onRowClickHandler = (item, id) => {
    handleOpen();
  };

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
              // width: "168px",
              borderRadius: "50px",
              fontSize: "14px",
              fontWeight: 600,
              textTransform: "none",
            }}
          >
            Upload Tracking
          </Button>
          <Button
            variant="outlined"
            type="button"
            size="large"
            sx={{
              border: "1px solid #212121",
              color: "#212121",
              // width: "168px",
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
              // width: "206px",
              borderRadius: "50px",
              fontSize: "14px",
              fontWeight: 600,
              textTransform: "none",
              boxShadow: "none",
            }}
          >
            Message All Creators
          </Button>
        </Stack>
      </Box>

      {rows && (
        <CommonTable
          rows={rows}
          headCells={headCells}
          // onclickHandler={onRowClickHandler}
          page={page}
          rowsPerPage={rowsPerPage}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
          pagination={awaitingContentData.pagination}
          onChangePagePagination={handleChangePageForPagination}
        />
      )}
    </Box>
  );
};

export default AwaitingContent;
