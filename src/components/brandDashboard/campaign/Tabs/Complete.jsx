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
import React, { useEffect, useState } from "react";
import CampaignCard from "../Cards/CampaignCard";
import ViewCampaignBriefModal from "../modal/ViewCampaignBriefModal";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "next/navigation";
import {
  getUploadedContent,
  likeDislikeContent,
} from "../../../../../store/campaign_request/campaignRequest.slice";

const data = [
  {
    id: 1,
    handle: "neatandsocial",
    profilephoto: "/images/dummy/profilephoto.png",
    contentPhoto: "/images/dummy/neatandsocial.png",
    campaignName: "Tangerine & Citrus Blossom",
  },
  {
    id: 2,
    handle: "Our.littlehome",
    profilephoto: "/images/dummy/profilephoto.png",
    contentPhoto: "/images/dummy/Our.littlehome.png",
    campaignName: "Classic Pack",
  },
  {
    id: 3,
    handle: "Mamatoflowers",
    profilephoto: "/images/dummy/profilephoto.png",
    contentPhoto: "/images/dummy/Mamatoflowers.png",
    campaignName: "Tangerine & Citrus Blossom",
  },
  {
    id: 4,
    handle: "liveymonte",
    profilephoto: "/images/dummy/profilephoto.png",
    contentPhoto: "/images/dummy/liveymonte.png",
    campaignName: "Tangerine & Citrus Blossom",
  },
  {
    id: 5,
    handle: "Threebowsandablonde",
    profilephoto: "/images/dummy/profilephoto.png",
    contentPhoto: "/images/dummy/Threebowsandablonde.png",
    campaignName: "Tangerine & Citrus Blossom",
  },
  {
    id: 6,
    handle: "An.olive.grove",
    profilephoto: "/images/dummy/profilephoto.png",
    contentPhoto: "/images/dummy/An.olive.grove.png",
    campaignName: "Tangerine & Citrus Blossom",
  },
  {
    id: 7,
    handle: "melissafutagaki",
    profilephoto: "/images/dummy/profilephoto.png",
    contentPhoto: "/images/dummy/melissafutagaki.png",
    campaignName: "Tangerine & Citrus Blossom",
  },
  {
    id: 8,
    handle: "greeneclecticmama",
    profilephoto: "/images/dummy/profilephoto.png",
    contentPhoto: "/images/dummy/greeneclecticmama.png",
    campaignName: "Tangerine & Citrus Blossom",
  },
];

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

const Complete = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const dispatch = useDispatch();
  const params = useParams();
  const [open, setOpen] = useState(false);
  const completeData = useSelector(
    (state) => state.CampaignRequest.campaignRequest.campaignRequestData
  );
  console.log(completeData, "completeData");

  useEffect(() => {
    dispatch(
      getUploadedContent({
        campaignId: params.campaignId,
        requestStatus: ["POSTED"],
        page: page + 1,
        pageSize: rowsPerPage,
      })
    );
  }, [page, rowsPerPage]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onRowClickHandler = () => {
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
          requestStatus: ["POSTED"],
          page: page + 1,
          pageSize: rowsPerPage,
        })
      );
    });
  };

  return (
    <Box>
      {completeData.data.length > 0 && (
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: "20px" }}>
          <Stack
            direction={"row"}
            spacing={"30px"}
            sx={{ alignItems: "center" }}
          >
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
            <Button
              variant="outlined"
              type="button"
              size="large"
              sx={{
                border: "1px solid #212121",
                color: "#212121",
                // height: "50px",
                // width: "168px",
                borderRadius: "50px",
                fontSize: "14px",
                fontWeight: 600,
                textTransform: "none",
              }}
            >
              Download All
            </Button>
            <Button
              variant="contained"
              type="button"
              size="large"
              sx={{
                "&:hover": { background: "#FFCC33" },
                background: "#FFCC33",
                color: "#212121",
                // height: "50px",
                // width: "162px",
                borderRadius: "50px",
                fontSize: "14px",
                fontWeight: 600,
                textTransform: "none",
                boxShadow: "none",
              }}
            >
              View All
            </Button>
          </Stack>
        </Box>
      )}

      <Grid container spacing={"30px"}>
        {completeData.data.length > 0 &&
          completeData.data.map((item) => (
            <Grid item xs={3}>
              <CampaignCard
                item={item}
                status={"Completed"}
                onCardClickHandler={onRowClickHandler}
                likeDislikeChangeHandler={likeDislikeChangeHandler}
              />
            </Grid>
          ))}
      </Grid>

      {completeData.data.length > 0 && (
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

      <ViewCampaignBriefModal
        open={open}
        handleClose={handleClose}
        imageSmallUrls={imageSmallUrls}
      />
    </Box>
  );
};

export default Complete;
