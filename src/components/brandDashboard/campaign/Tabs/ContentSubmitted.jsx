import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  Avatar,
  Box,
  Button,
  FormControl,
  Grid,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CampaignCard from "../Cards/CampaignCard";
import ContentSubmittedModal from "../modal/ContentSubmittedModal";
import { getUploadedContent, likeDislikeContent } from "../../../../../store/campaign_request/campaignRequest.slice";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "next/navigation";

const ContentSubmitted = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const dispatch = useDispatch();
  const params = useParams();
  const contentSubmittedData = useSelector(
    (state) => state.CampaignRequest.campaignRequest.campaignRequestData
  );
  console.log(contentSubmittedData, "contentSubmittedData");

  useEffect(() => {
    dispatch(
      getUploadedContent({
        campaignId: params.campaignId,
        requestStatus: ["APPROVED", "REJECTED", "PENDING"],
        page: page + 1,
        pageSize: rowsPerPage,
      })
    );
  }, [page, rowsPerPage]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onRowClickHandler = (item, id) => {
    setModalData(item);
    handleOpen();
  };

  const likeDislikeChangeHandler = (itemId, e) => {
    e.stopPropagation();
    dispatch(
      likeDislikeContent({
        contentId: itemId,
      })
    ).then(() => {
      dispatch(
        getUploadedContent({
          campaignId: params.campaignId,
          requestStatus: ["APPROVED", "REJECTED", "PENDING"],
          page: page + 1,
          pageSize: rowsPerPage,
        })
      );
      handleClose();
    });
  };

  return (
    <Box>
      {contentSubmittedData?.data?.length > 0 && (
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: "20px" }}>
          <Stack direction={"row"} spacing={"30px"}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography variant="subtitle1">View</Typography>
              <FormControl
                sx={{
                  m: 1,
                  minWidth: 160,
                  "& .MuiInputBase-input": {
                    p: "12px 10px",
                  },
                }}
              >
                <Select
                  //   value={age}
                  //   onChange={handleChange}
                  defaultValue={"card"}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  sx={{
                    "& .MuiSelect-icon": { color: "#212121", opacity: 0.6 },
                  }}
                >
                  <MenuItem value={"card"}>Card</MenuItem>
                  <MenuItem value={"table"}>Table</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography variant="subtitle1">Sort by</Typography>
              <FormControl
                sx={{
                  m: 1,
                  minWidth: 160,
                  "& .MuiInputBase-input": {
                    p: "12px 10px",
                  },
                }}
              >
                <Select
                  //   value={age}
                  //   onChange={handleChange}
                  defaultValue={"new"}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  sx={{
                    "& .MuiSelect-icon": { color: "#212121", opacity: 0.6 },
                  }}
                >
                  <MenuItem value={"new"}>New</MenuItem>
                  <MenuItem value={"old"}>Old</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Stack>
        </Box>
      )}

      <Grid container spacing={"30px"}>
        {contentSubmittedData?.data?.length > 0 &&
          contentSubmittedData.data.map((item) => (
            <Grid item xs={3}>
              <CampaignCard
                item={item}
                status={item.contentApprovalStatus}
                onCardClickHandler={onRowClickHandler}
                likeDislikeChangeHandler={likeDislikeChangeHandler}
              />
            </Grid>
          ))}
      </Grid>

      {contentSubmittedData?.data?.length > 0 && (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            type="button"
            // size="large"
            onClick={() => setRowsPerPage(rowsPerPage + 4)}
            sx={{
              background: "#FFCC33",
              color: "#212121",
              height: "50px",
              width: "123px",
              borderRadius: "50px",
              fontSize: "14px",
              fontWeight: 600,
              textTransform: "none",
              boxShadow: "none",
              mt: "30px",
            }}
          >
            Load More
          </Button>
        </Box>
      )}
      <ContentSubmittedModal
        open={open}
        handleClose={handleClose}
        infoModel={modalData}
        page={page}
        rowsPerPage={rowsPerPage}
        campaignId={params.campaignId}
        likeDislikeChangeHandler={likeDislikeChangeHandler}
      />
    </Box>
  );
};

export default ContentSubmitted;
