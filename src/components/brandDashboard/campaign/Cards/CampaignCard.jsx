import Image from "next/image";
import React from "react";
import { Avatar, Box, Button, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";

const CampaignCard = ({ item, status, onCardClickHandler }) => {
  console.log(item, "item");
  return (
    <Box>
      <Box
        onClick={() => onCardClickHandler(item.id)}
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
              src={item.profilephoto}
              sx={{ width: "30px", height: "30px", mr: "10px" }}
            />
            <Typography variant="subtitle1">{item.handle}</Typography>
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
            src={item.contentPhoto}
            alt=""
            layout="responsive"
            width={330}
            height={330}
            // fill={true}
          />
        </Box>
        <Typography variant="body1">{item.campaignName}</Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mt: "10px",
            width: "100%",
          }}
        >
          <Button
            variant="outlined"
            type="button"
            startIcon={<FavoriteIcon />}
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
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "30px",
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
