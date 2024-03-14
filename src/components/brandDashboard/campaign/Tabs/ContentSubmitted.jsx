import React from "react";
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

const ContentSubmitted = () => {
  return (
    <Box>
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

      <Grid container spacing={"30px"}>
        {data.map((item) => (
          <Grid item xs={3}>
            <CampaignCard item={item} status={"Pending Approval"} />
          </Grid>
        ))}
      </Grid>

      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button
          variant="contained"
          type="button"
          // size="large"
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
    </Box>
  );
};

export default ContentSubmitted;
