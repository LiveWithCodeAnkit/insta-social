import {
  Box,
  Button,
  FormControl,
  Grid,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import React, { useEffect, useState } from "react";
import ViewCampaignCreator from "../modal/ViewCampaignCreator";
import CampaignCard from "../Cards/CampaignCard";
import { getCampaignRequestByCreator } from "../../../../../store/campaign_request/campaignRequest.slice";
import { useDispatch, useSelector } from "react-redux";

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

const AllPage = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);

  const dispatch = useDispatch();

  const onRowClickHandler = (item) => {
    handleOpen();
    setSelectedItem(item);
  };

  const campaignByCreator = useSelector(
    (state) =>
      state.CampaignRequest?.campaignRequestByCreator
        ?.campaignRequestByCreatorData
  );

  const loading = useSelector(
    (state) => state.CampaignRequest?.campaignRequestByCreator?.loading
  );

  console.log(loading, "loading");

  // console.log("selectedItem", selectedItem);
  // console.log("campaignByCreator", campaignByCreator);

  useEffect(() => {
    dispatch(
      getCampaignRequestByCreator({
        page: page + 1,
        pageSize: rowsPerPage,
        requestStatus: [],
      })
    );
  }, [page, rowsPerPage]);

  return (
    <Box
      sx={{
        backgroundColor: "background.paper",
        boxShadow: "0px 0px 30px 0px #0000000D",
        borderRadius: "30px",
        p: "30px",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: "20px" }}>
        <Stack direction={"row"} spacing={"30px"} sx={{ alignItems: "center" }}>
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
                sx={{ "& .MuiSelect-icon": { color: "#212121", opacity: 0.6 } }}
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
                sx={{ "& .MuiSelect-icon": { color: "#212121", opacity: 0.6 } }}
              >
                <MenuItem value={"new"}>New</MenuItem>
                <MenuItem value={"old"}>Old</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Stack>
      </Box>

      {loading ? (
        <>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        </>
      ) : campaignByCreator?.data?.length > 0 ? (
        <Grid
          container
          spacing={4}
          sx={{
            mt: "30px",
            overflowY: "auto",
            maxHeight: "400px",
            height: "400px",
            scrollbarWidth: "thin",
          }}
        >
          {campaignByCreator?.data?.map((item) => (
            <Grid item xs={3}>
              <CampaignCard
                item={item}
                onCardClickHandler={() => onRowClickHandler(item)}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="h4" sx={{ textAlign: "center", mt: "30px" }}>
          No data found
        </Typography>
      )}

      {campaignByCreator?.data?.length > 4 && (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            type="button"
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

      <ViewCampaignCreator
        open={open}
        handleClose={handleClose}
        imageSmallUrls={imageSmallUrls}
        campaignData={selectedItem}
      />
    </Box>
  );
};

export default AllPage;
