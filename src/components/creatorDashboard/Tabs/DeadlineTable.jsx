import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import CommonTable from "@/components/common/commonTable/CommonTable";
import { useDispatch, useSelector } from "react-redux";
import { getCampaignRequestByCreator } from "../../../../store/campaign_request/campaignRequest.slice";
import { useRouter } from "next/navigation";
import { statusColorMap, statusMap } from "@/helper/fn";
import TodoIssueModalForm from "./modal/TodoIssueModalForm";
import UploadContentModal from "./modal/UploadContentModal";
import PostLinkModalForm from "./modal/PostLinkModalForm";

const DeadlineTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState({ showModal: false, alldata: "" });
  const [issueOpen, setIssueOpen] = useState({
    showIssueModal: false,
    id: "",
    allData: "",
  });
  const [issueLinkOpen, setIssueLinkOpen] = useState({
    showIssueModal: false,
    id: "",
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

  // todoTable of todo-modal
  const updatingFunction = () => {
    dispatch(
      getCampaignRequestByCreator({
        page: page + 1,
        pageSize: rowsPerPage,
        requestStatus: ["Awaiting_Shipment", "Awaiting_Content"],
      })
    );
  };

  useEffect(() => {
    dispatch(
      getCampaignRequestByCreator({
        page: page + 1,
        pageSize: rowsPerPage,
        requestStatus: ["Past_Deadline"],
      })
    );
  }, [page, rowsPerPage]);

  function createData(
    id,
    campaignsName,
    brandName,
    campaignDetails,
    // issueDeadlines,
    postponedReason,
    status
  ) {
    return {
      id,
      campaignsName,
      brandName,
      campaignDetails,
      // issueDeadlines,
      postponedReason,
      status,
    };
  }

  const rows = campaignByCreator?.data?.map((data, index) => {
    // console.log("data into pendingpage",data);
    return createData(
      data._id,
      data?.campaignId?.campaignDetails?.campaignName,
      data?.campaignId?.brandDetails?.name || "-",
      // data?.campaignId?.campaignDetails?.readyToReviewDate
      //   ? new Date(
      //       data?.campaignId?.campaignDetails?.readyToReviewDate
      //     ).toLocaleDateString()
      //   : "-",
      data?.campaignId,
      data?.postponedReason,
      data?.requestStatus
    );
  });

  const handleViewClick = (event, item) => {
    event.stopPropagation();
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
    // {
    //   id: "deadline",
    //   numeric: false,
    //   disablePadding: false,
    //   label: "Deadline",
    // },
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
    // {
    //   id: "reportIssue",
    //   numeric: true,
    //   disablePadding: false,
    //   label: "Report Issue",
    //   renderCell: (item, index) => {
    //     return (
    //       <>
    //         {item?.status === "Awaiting_Content" ? (
    //           <Button
    //             variant="outlined"
    //             type="button"
    //             sx={{
    //               border: "none",
    //               color: "#00B2F7",
    //               // height: "35px",
    //               // width: "118px",
    //               borderRadius: "50px",
    //               fontWeight: 500,
    //               textTransform: "none",
    //               "&:hover": {
    //                 borderColor: "info.main",
    //                 backgroundColor: "info.lighter",
    //               },
    //             }}
    //             onClick={(e) =>
    //               setIssueOpen({
    //                 showIssueModal: true,
    //                 id: item?.id,
    //                 allData: item,
    //               })
    //             }
    //           >
    //             Report issue
    //           </Button>
    //         ) : (
    //           "-"
    //         )}
    //       </>
    //     );
    //   },
    // },
    // {
    //   id: "action",
    //   numeric: true,
    //   disablePadding: false,
    //   label: "Action",
    //   renderCell: (item, index) => {
    //     return (
    //       <>
    //         {item?.status === "Awaiting_Content_Approval" ||
    //         item?.status === "Content_Approved" ||
    //         item?.status === "Content_Rejected" ||
    //         item?.status === "Issue" ||
    //         item?.status === "Completed" ||
    //         item?.status === "Awaiting_Shipment" ||
    //         item?.status === "Cancelled" ||
    //         item?.status === "Request_Approved" ? (
    //           "-"
    //         ) : (
    //           <>
    //             {/* item?.campaignDetails?.campaignDetails?.permissionRequired ===
    //             true && */}
    //             {item.status === "Awaiting_Content" ? (
    //               <Button
    //                 variant="contained"
    //                 type="button"
    //                 sx={{
    //                   //   border: "1px solid #212121",
    //                   "&:hover": { background: "#FFCC33" },
    //                   background: "#FFCC33",
    //                   boxShadow: "none",
    //                   color: "#212121",
    //                   // height: "35px",
    //                   // width: "118px",
    //                   borderRadius: "50px",
    //                   fontWeight: 500,
    //                   textTransform: "none",
    //                 }}
    //                 onClick={(e) => setOpen({ showModal: true, alldata: item })}
    //               >
    //                 Upload Content
    //               </Button>
    //             ) : (
    //               "-"
    //             )}
    //           </>
    //         )}
    //       </>
    //     );
    //   },
    // },
    // {
    //   id: "postContent",
    //   numeric: true,
    //   disablePadding: false,
    //   label: "Post Content",
    //   renderCell: (item, index) => {
    //     return (
    //       <>
    //         {/* (item?.campaignDetails?.campaignDetails?.permissionRequired ===
    //         false && item.status === "Awaiting_Content") || */}
    //         {item?.status === "Content_Approved" ? (
    //           <Button
    //             variant="outlined"
    //             type="button"
    //             sx={{
    //               border: "none",
    //               color: "#00B2F7",
    //               // height: "35px",
    //               // width: "118px",
    //               borderRadius: "50px",
    //               fontWeight: 500,
    //               textTransform: "none",
    //               "&:hover": {
    //                 borderColor: "info.main",
    //                 backgroundColor: "info.lighter",
    //               },
    //             }}
    //             onClick={(e) =>
    //               setIssueLinkOpen({
    //                 showIssueModal: true,
    //                 id: item?.id,
    //                 allData: item,
    //               })
    //             }
    //           >
    //             Update Link
    //           </Button>
    //         ) : (
    //           "-"
    //         )}
    //       </>
    //     );
    //   },
    // },
    {
      id: "postponedReason",
      numeric: false,
      disablePadding: false,
      label: "Postponed Deadline",
      renderCell: (item, index) => {
        return (
          <List>
            {item.postponedReason?.map((i, index) => (
              // console.log(i)
              // <ListItem>
                <ListItemText key={index}>{i}</ListItemText>
              // </ListItem>
            ))}
          </List>
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
              width: "190px",
              // backgroundColor: "#FF474C",
              backgroundColor: statusColorMap[item?.status],
              borderRadius: "8px",
            }}
          >
            <Typography variant="body1">{statusMap[item?.status]}</Typography>
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
            boxShadow: "0px 0px 30px 0px #0000000D",
            padding: "30px 30px 00px 30px",
            borderRadius: "30px",
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
      <UploadContentModal
        open={open.showModal}
        allData={open.alldata}
        handleClose={() => setOpen({ showModal: false, alldata: "" })}
        updatingFunction={updatingFunction}
      />
      <TodoIssueModalForm
        open={issueOpen.showIssueModal}
        allData={issueOpen.allData}
        handleClose={() => setIssueOpen({ showIssueModal: false, id: "" })}
        updatingFunction={updatingFunction}
      />
      <PostLinkModalForm
        open={issueLinkOpen.showIssueModal}
        allData={issueLinkOpen.allData}
        handleClose={() => setIssueLinkOpen({ showIssueModal: false, id: "" })}
        updatingFunction={updatingFunction}
      />
    </>
  );
};

export default DeadlineTable;
