import ChatInputBox from "@/components/common/message-input/ChatInputBox";
import { Box, Typography } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import Image from "next/image";
import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import UserProfile from "../user-profile/UserProfile";
import Avatar from "react-avatar";
import SampleMessages from "./SampleMessages";

const ChatHistory = ({ selectedCardIndex, selectedChatData }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setDrawerOpen(open);
  };

  const anchor = "right";

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Box sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
          <Box
            sx={{
              height: "90px",
              marginTop: "0.1rem",
              border: "1px solid #E3E8E7",
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
              padding: "0.1rem",
            }}
          >
            <Box
              as="div"
              sx={{
                display: "flex",
                justifyContent: "start",
                alignItems: "center",
                gap: "0.6rem",
                cursor: "pointer",
                overflow: "hidden",
              }}
              onClick={toggleDrawer(true)}
            >
              <Avatar
                name={selectedChatData?.members[0]?.firstName ?? ""}
                maxInitials={1}
                round
                size={49}
              />
              <Typography variant="body" sx={{ fontWeight: "600" }}>
                {`${selectedChatData?.members[0]?.firstName ?? ""} ${
                  selectedChatData?.members[0]?.lastName ?? ""
                }`}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              background: "#FFFCF3",
              height: "calc(100vh - 92px)",
              flexGrow: 1,
              overflowY: "auto",
              padding: "1rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                height: "calc(100vh - 92px)",
                overflowY: "auto",
                scrollbarWidth: "thin",
                WebkitScrollbarWidth: "thin",
                scrollbarColor: "#888 #f1f1f1",
                borderRadius: "8px",
              }}
            >
              <SampleMessages
                selectedCardIndex={selectedCardIndex}
                selectedChatData={selectedChatData}
                sx={{ width: drawerOpen ? "calc(100% - 250px)" : "100%" }}
              />
            </div>
            <Box as="div" sx={{}}>
              <ChatInputBox
                selectedCardIndex={selectedCardIndex}
                selectedChatData={selectedChatData}
              />
            </Box>
          </Box>
        </Box>
        <Drawer
          anchor={anchor}
          open={drawerOpen}
          onClose={toggleDrawer(false)}
          sx={{
            width: drawerOpen ? 400 : 0,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: 400,
              boxSizing: "border-box",
            },
          }}
          variant="persistent"
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "end",
              marginTop: "1rem",
              marginRight: "1rem",
            }}
          >
            <IoClose
              onClick={toggleDrawer(false)}
              style={{
                fontSize: "28px",
                cursor: "pointer",
              }}
            />
          </Box>
          <UserProfile
            selectedChatData={selectedChatData}
            drawerOpen={drawerOpen}
          />
        </Drawer>
      </Box>
    </>
  );
};

export default ChatHistory;
