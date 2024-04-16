import Image from "next/image";
import React from "react";
import { Avatar, Box, Button, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { getUploadedContent, likeDislikeContent } from "../../../../../store/campaign_request/campaignRequest.slice";
import { useDispatch } from "react-redux";

const CampaignCard = ({ item, status, onCardClickHandler,likeDislikeChangeHandler }) => {
  const dispatch = useDispatch();
  console.log(item, "item");
  // const likeDislikeChangeHandler = (itemId, e) => {
  //   e.stopPropagation();
  //   dispatch(
  //     likeDislikeContent({
  //       contentId: itemId,
  //     })
  //   ).then(() => {
  //     dispatch(
  //       getUploadedContent({
  //         campaignId: params.campaignId,
  //         requestStatus: ["POSTED"],
  //         page: page + 1,
  //         pageSize: rowsPerPage,
  //       })
  //     );
  //   });
  // };

  return (
    <Box>
      <Box
        onClick={() => onCardClickHandler(item)}
        sx={{
          p: "10px 15px 15px 15px",
          backgroundColor: "#F2F6FC",
          borderRadius: "15px",
          cursor: "pointer",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Avatar
              alt="Remy Sharp"
              src={item?.profilephoto}
              sx={{ width: "30px", height: "30px", mr: "10px" }}
            />
            <Typography variant="subtitle1">
              {item?.creatorId?.firstName + " " + item?.creatorId?.lastName}
            </Typography>
          </Box>
          <Box sx={{ cursor: "pointer" }}>
            <Image
              src="/images/download_img.png"
              alt="download"
              width={30}
              height={30}
            />
          </Box>
        </Box>
        <Box
          sx={{
            borderRadius: "15px",
            my: "10px",
            // height: "200px",
            // width: "300px",
          }}
        >
          <Image
            src={item?.uploadedContent?.[0]?.content}
            alt=""
            layout="responsive"
            width={330}
            height={330}
            // fill={true}
          />
        </Box>
        <Typography variant="body1">{item?.caption}</Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mt: "10px",
            width: "100%",
          }}
        >
          {!item?.isLikedByBrand && (
            <Button
              variant="outlined"
              type="button"
              startIcon={<FavoriteIcon />}
              onClick={(e) => likeDislikeChangeHandler(item?._id, e)}
              sx={{
                "&:hover": {
                  border: "1px solid #F00E0E",
                  backgroundColor: "#eabdbd",
                },
                border: "1px solid #F00E0E",
                color: "#F00E0E",
                height: "30px",
                width: "77px",
                borderRadius: "8px",
                fontSize: "14px",
                fontWeight: 500,
              }}
            >
              Like
            </Button>
          )}
          {item?.isLikedByBrand && (
            <Button
              variant="outlined"
              type="button"
              startIcon={<FavoriteIcon />}
              onClick={(e) => likeDislikeChangeHandler(item?._id, e)}
              sx={{
                "&:hover": {
                  border: "1px solid #F00E0E",
                  backgroundColor: "#eabdbd",
                },
                backgroundColor: "#F00E0E",
                color: "#fff",
                height: "30px",
                width: "77px",
                borderRadius: "8px",
                fontSize: "14px",
                fontWeight: 500,
              }}
            >
              Like
            </Button>
          )}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "30px",
              width: status === "Pending Approval" ? "138px" : "100px",
              backgroundColor:
                status === "Pending Approval" ? "#00B2F7" : "#5ADA5F",
              borderRadius: "8px",
              color: "#fff",
            }}
          >
            <Typography variant="body1">{status}</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CampaignCard;
