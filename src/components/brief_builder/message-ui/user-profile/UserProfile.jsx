"use client";
import React, { useContext, useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Image from "next/image";
import Switch from "@mui/material/Switch";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import { SocketContext } from "@/components/scoketProvider/socket";
import Avatar from "react-avatar";
import { useDispatch } from "react-redux";
import { getProfileInfo } from "../../../../../store/chat_scoket/chatSokcetSlice";

const UserProfile = ({ selectedChatData, drawerOpen }) => {
  const { socket } = useContext(SocketContext);
  const [userProfileInfo, setUserProfileInfo] = useState();
  const dispatch = useDispatch();
  const maxItemsToShow = 5;

  useEffect(() => {
    const fetchUserProfileInfo = async () => {
      if (socket && drawerOpen && selectedChatData?.members[0]?._id) {
        try {
          const payload = {
            userId: selectedChatData.members[0]?._id,
            chatId: selectedChatData?.chatId,
          };
          const actionResult = await dispatch(getProfileInfo(payload));
          const profileInfo = actionResult?.payload?.data;
          setUserProfileInfo(profileInfo);
        } catch (error) {
          console.error("Error fetching user profile info:", error);
        }
      }
    };

    fetchUserProfileInfo();

    // Cleanup function
    return () => {
      // Any cleanup code here, if needed
    };
  }, [socket, drawerOpen, selectedChatData, dispatch]);

  return (
    <>
      <Box
        as="div"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "2.1rem",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              position: "relative",
              borderRadius: "50%",
              overflow: "hidden",
              width: 136,
              height: 136,
              border: "6px solid #FFCC33",
            }}
          >
            {/* <Image
              src={"/images/Ellipse1.png"}
              width={136}
              height={136}
              alt="profile pic"
              style={{ position: "absolute", top: 0, left: 0 }}
            /> */}

            <Avatar
              name={selectedChatData?.members[0]?.firstName ?? ""}
              maxInitials={1}
              round
              size={130}
              style={{ position: "absolute", top: 0, left: 0 }}
            />
          </Box>
          <Box
            as="div"
            sx={{
              display: "flex",
              flexDirection: "column",
              alignContent: "center",
              alignItems: "center",
            }}
          >
            <Typography sx={{ fontWeight: "600", fontSize: "28px" }}>
              {`${selectedChatData?.members[0]?.firstName ?? ""} ${
                selectedChatData?.members[0]?.lastName ?? ""
              }`}
            </Typography>
            <Typography
              sx={{ fontWeight: "400", fontSize: "16px", color: "#777777" }}
            >
              {userProfileInfo?.user?.email}
            </Typography>
          </Box>
        </Box>
        <Box
          as="div"
          sx={{
            width: "350px",
            border: "1px solid #C8C6C6",
          }}
        >
          <Typography
            variant="h5"
            sx={{ fontSize: "16px", fontWeight: 700, paddingLeft: "0.5rem" }}
          >
            Campaign Tags
          </Typography>
          <Divider />
          <Box sx={{ p: 2 }}>
            <Box
              as="div"
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: "0.5rem",
              }}
            >
              {userProfileInfo?.campaigns?.map((campaign, index) => (
                <Chip
                  key={index}
                  label={campaign}
                  size="small"
                  sx={{ fontSize: "12px", fontWeight: 600 }}
                />
              ))}
            </Box>
          </Box>
        </Box>

        <Box as="div" sx={{ width: "350px" }}>
          <Divider />
          <Box
            as="div"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h5" sx={{ fontSize: "16px", fontWeight: 600 }}>
              Notifications
            </Typography>
            <Switch defaultChecked />
          </Box>
          <Divider />
        </Box>
        <Box as="div" sx={{ width: "350px" }}>
          <Box
            as="div"
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h5" sx={{ fontSize: "14px", fontWeight: 600 }}>
              {` Images & Video (${userProfileInfo?.content?.length || 0})`}
            </Typography>
            <MdOutlineKeyboardArrowUp
              style={{ fontSize: "22px", color: "#FFCC33" }}
            />
          </Box>
          <Box
            as="div"
            sx={{
              display: "flex",
              justifyContent: "start",
              flexWrap: "wrap",
              gap: "12px",
              padding: "0.5rem",
            }}
          >
            {/* {userProfileInfo?.content &&
              Array.isArray(userProfileInfo.content) &&
              userProfileInfo.content.map((src, index) => (
                <Image
                  key={index}
                  src={src}
                  width={100}
                  height={100}
                  alt="profile pic"
                  style={{ borderRadius: "20px" }}
                />
              ))} */}
            {userProfileInfo?.content.map((src, index) => {
              if (
                typeof src === "string" &&
                (src.startsWith("http://") || src.startsWith("https://")) &&
                /\.(mp4|webm)$/i.test(src)
              ) {
                return (
                  <video
                    key={index}
                    style={{
                      width: "100px",
                      aspectRatio: "auto 100 / 100",
                      height: "100px",
                      // padding: "10px",
                    }}
                    controls
                  >
                    <source src={src} type="video/webm" />
                    Your browser does not support the video tag.
                  </video>
                );
              } else {
                return (
                  <Image
                    key={index}
                    src={src}
                    width={100}
                    height={100}
                    alt="profile pic"
                    style={{ borderRadius: "20px" }}
                  />
                );
              }
            })}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default UserProfile;
