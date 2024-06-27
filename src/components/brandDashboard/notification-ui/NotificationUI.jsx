import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RxDotFilled } from "react-icons/rx";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Stack,
  Toolbar,
  Popover,
  Typography,
  Badge,
} from "@mui/material";
import { readAllNotification } from "../../../../store/chat_scoket/chatSokcetSlice";

const NotificationUI = ({ anchorEl, handleClose, handleReadtification }) => {
  const dispatch = useDispatch();
  const open = Boolean(anchorEl);

  const notificationInfo = useSelector(
    (state) => state.ChatRequest.userNotifications.notificationInfo
  );

  const latestFiveNotifications = notificationInfo?.data;

  const timeAgo = (timestamp) => {
    const currentTime = new Date();
    const notificationTime = new Date(timestamp);
    const timeDifference = currentTime - notificationTime;
    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    if (hours > 0) {
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    }
    const minutes = Math.floor(timeDifference / (1000 * 60));
    if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    }
    return "Just now";
  };
  return (
    <>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        sx={{
          top: "19px",
          left: "-2rem !important",
        }}
      >
        <Box sx={{ width: "500px", height: "300px", padding: "0.5rem" }}>
          <Box
            as="div"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignContent: "center",
              background: "#f1c40f",
              padding: "0.5rem",
              position: "sticky",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Notifications
            </Typography>
            <Button
              variant="contained"
              onClick={() => {
                handleReadtification();
              }}
            >
              All Read
            </Button>
          </Box>
          {latestFiveNotifications && latestFiveNotifications.length > 0 ? (
            latestFiveNotifications.map((notification, index) => (
              <Box
                key={index}
                as="div"
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "0.5rem",
                  padding: "0.5rem",
                  borderBottom: "1px solid red",
                }}
              >
                <Typography>{notification.message}</Typography>
                <Box
                  as="div"
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignContent: "center",
                  }}
                >
                  <Typography color="text.secondary">
                    {timeAgo(notification.createdAt)}
                  </Typography>
                  {!notification.isReaded ? (
                    <RxDotFilled style={{ color: "blue", fontSize: "18px" }} />
                  ) : (
                    ""
                  )}
                </Box>
              </Box>
            ))
          ) : (
            <Typography>No notifications</Typography>
          )}
        </Box>
      </Popover>
    </>
  );
};

export default NotificationUI;
