"use client";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
// material
import { alpha, styled } from "@mui/material/styles";
import {
  Box,
  Stack,
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Badge,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import NotificationUI from "@/components/brandDashboard/notification-ui/NotificationUI";
import { useDispatch, useSelector } from "react-redux";
import {
  getnotification,
  readAllNotification,
  resetNotificationData,
} from "../../../../store/chat_scoket/chatSokcetSlice";
import SocketClient from "@/services/socket";
import { SocketContext } from "@/components/scoketProvider/socket";
// components

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;
const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 92;

const RootStyle = styled(AppBar)(({ theme }) => ({
  boxShadow: "none",
  color: "black",
  backdropFilter: "blur(6px)",
  WebkitBackdropFilter: "blur(6px)", // Fix on Mobile
  backgroundColor: "transparent",
  [theme.breakpoints.up("lg")]: {
    width: `calc(100% - ${DRAWER_WIDTH}px)`,
    // width: DRAWER_WIDTH
  },
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  minHeight: APPBAR_MOBILE,
  [theme.breakpoints.up("lg")]: {
    minHeight: APPBAR_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

const Navbar = ({ onOpenSidebar }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const socketInstance = new SocketClient();
  const { socket } = useContext(SocketContext);
  const [notificationCount, setNotificationCount] = useState(0);
  const router = useRouter();
  const dispatch = useDispatch();

  const connectionStatus = useSelector(
    (state) => state.AppRequest.connectionStatus
  );

  const handleOpen = (event) => {
    dispatch(getnotification());
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    dispatch(resetNotificationData());
  };

  const handleReadtification = () => {
    dispatch(readAllNotification());
  };

  useEffect(() => {
    const handleNotification = (newMessage) => {
      try {
        const parsedMessage = JSON.parse(newMessage);
        setNotificationCount(parsedMessage.count || 0);
      } catch (error) {
        console.error("Failed to parse notification message:", error);
      }
    };

    if (socket) {
      socket.on("notification", handleNotification);

      return () => {
        socket.off("notification", handleNotification);
      };
    }
  }, [socket, connectionStatus, socketInstance, dispatch]);

  return (
    <>
      <RootStyle>
        <ToolbarStyle>
          <IconButton
            onClick={onOpenSidebar}
            sx={{ mr: 1, color: "text.primary", display: { lg: "none" } }}
          >
            {/* <Iconify icon="eva:menu-2-fill" /> */}hjh
          </IconButton>

          <Box sx={{ flexGrow: 1 }} />

          <Stack
            direction="row"
            alignItems="center"
            spacing={{ xs: 0.5, sm: 1.5, md: 2.5 }}
          >
            <Button
              variant="contained"
              type="button"
              sx={{
                "&:hover": { background: "#FFCC33" },
                background: "#FFCC33",
                color: "#212121",
                height: "50px",
                width: "157px",
                borderRadius: "50px",
                fontWeight: 600,
                textTransform: "none",
                boxShadow: "0px 4px 20px 0px #FFD24B80",
              }}
              onClick={() => {
                router.push("/creator/message-creator");
              }}
            >
              Messages
            </Button>
            <Box
              sx={{
                cursor: "pointer",
                height: "50px",
                width: "50px",
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "background.paper",
              }}
              onClick={handleOpen}
            >
              <Badge badgeContent={notificationCount} color="success">
                <NotificationsIcon sx={{ color: "#212121" }} />
              </Badge>
            </Box>
          </Stack>
        </ToolbarStyle>
      </RootStyle>
      <NotificationUI
        anchorEl={anchorEl}
        handleClose={handleClose}
        handleReadtification={handleReadtification}
      />
    </>
  );
};

export default Navbar;
