"use client";
import { SocketContext } from "@/components/scoketProvider/socket";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Button,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import Avatar from "react-avatar";
import { FiPlus } from "react-icons/fi";
import { GiReturnArrow } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import {
  addChat,
  fetchUserList,
  getUserLastSeen,
  getUserList,
} from "../../../../store/chat_scoket/chatSokcetSlice";
import { useSession } from "next-auth/react";
import ChatHistory from "./chat-history/ChatHistory";

const UsersList = () => {
  const [selectedCardIndex, setSelectedCardIndex] = useState(null);
  const [selectedChatData, setSelectedChatData] = useState(null);
  const { socket } = useContext(SocketContext);
  const [showNewUsers, setShowNewUsers] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const connectionStatus = useSelector(
    (state) => state.AppRequest.connectionStatus
  );
  const newUserChat = useSelector((state) => state.ChatRequest.usersList.list);

  const userChat = useSelector(
    (state) => state.ChatRequest.chatUsersList.usersList
  );

  useEffect(() => {
    const fetchUserList = async () => {
      if (connectionStatus === "CONNECTED") {
        try {
          await dispatch(getUserList());
        } catch (error) {
          console.error("Error fetching user list:", error);
        }
      }
    };

    fetchUserList();

    if (connectionStatus === "CONNECTED") {
      const handleMessage = () => {
        fetchUserList();
      };

      socket.on("message", handleMessage);

      return () => {
        socket.off("message", handleMessage);
      };
    }
  }, [dispatch, connectionStatus]);

  const handleCardClick = async (index, chatData) => {
    setSelectedCardIndex(index);
    setSelectedChatData(chatData);
    const UserId = chatData?.members[0]?._id;
    const payload = {
      index,
    };

    dispatch(getUserLastSeen(payload)).then(() => {
      dispatch(getUserList());
    });
  };

  const onStartNewHandler = () => {
    // console.log(newUserChat, "newUserChat");
    dispatch(fetchUserList());
    setShowNewUsers(true);
  };

  const handleNewUserCardClick = async (user) => {
    const payload = {
      members: [user],
      latestMessage: null,
      isPrivate: true,
      chatName: "",
    };
    dispatch(addChat(payload)).then((res) => {
      // console.log(res, "response");
      if (res.payload.success === true) {
        dispatch(getUserList()).then((res) => {
          if (res.payload.length > 0) {
            handleCardClick(res.payload[0].chatId, res.payload[0]);
          }
        });
      }
    });
    setShowNewUsers(false);
  };
  const { data: session } = useSession();
  const handleBackPath = () => {
    if (session?.role === "BRAND") {
      router.push("/brand/dashboard");
    } else {
      router.push("/creator/dashboard/my-campaign");
    }
  };

  return (
    <Grid container sx={{ height: "100vh" }}>
      <Grid item sx={{ width: "300px", flexShrink: 0 }}>
        <Box
          sx={{
            padding: "1rem",
            display: "flex",
            flexDirection: "column",
            gap: "30px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h3">Messages</Typography>
            <GiReturnArrow
              style={{ fontSize: "22px", color: "#FFCC33", cursor: "pointer" }}
              onClick={() => {
                handleBackPath();
              }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              gap: "0.7rem",
            }}
          >
            <TextField
              placeholder="Search..."
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              sx={{
                height: "48px",
                borderRadius: "52px",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "52px",
                },
              }}
            />
            <Button
              variant="contained"
              startIcon={<FiPlus style={{ color: "#212121" }} />}
              onClick={onStartNewHandler}
              sx={{
                color: "#212121",
                borderRadius: "52px",
              }}
              disabled={showNewUsers}
            >
              Start New Message
            </Button>
          </Box>

          <SimpleBar
            forceVisible="y"
            autoHide={true}
            style={{
              maxHeight: "716px",
              paddingRight: "1.2rem",
            }}
          >
            {showNewUsers
              ? newUserChat?.map((user, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "23px",
                      padding: "0.5rem",
                      cursor: "pointer",
                    }}
                    onClick={() => handleNewUserCardClick(user)}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "0.6rem",
                      }}
                    >
                      {
                        <Avatar
                          name={user?.firstName}
                          maxInitials={1}
                          round
                          size={49}
                        />
                      }
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                        }}
                      >
                        {
                          <Typography variant="body" sx={{ fontWeight: "600" }}>
                            {`${user?.firstName} ${user?.lastName}`}
                          </Typography>
                        }
                      </Box>
                    </Box>
                  </Box>
                ))
              : userChat?.map((user, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "23px",
                      backgroundColor:
                        user.chatId === selectedCardIndex
                          ? "#FFF9E5"
                          : "transparent",
                      padding: "0.5rem",
                      cursor: "pointer",
                    }}
                    onClick={() => handleCardClick(user.chatId, user)}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "0.6rem",
                      }}
                    >
                      {user?.members?.map((member, indexr) => (
                        <Avatar
                          name={member?.firstName}
                          maxInitials={1}
                          round
                          size={49}
                          key={indexr}
                        />
                      ))}
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                        }}
                      >
                        {/* {user?.members?.map((member, indexr) => (
                      <Typography
                        key={indexr}
                        variant="body"
                        sx={{ fontWeight: "600" }}
                      >
                        {`${member.firstName} ${member.lastName}`}
                      </Typography>
                    ))} */}
                        {user?.members?.map((member, indexr) => (
                          <Typography
                            key={indexr}
                            variant="body1"
                            sx={{ fontWeight: "600" }}
                          >
                            {`${member?.firstName} ${member?.lastName}`}
                          </Typography>
                        ))}

                        {user.latestMessage && (
                          <Typography variant="body">
                            {user.latestMessage.mediaContent &&
                            user.latestMessage.mediaContent.length === 1
                              ? "Photo 🖼️"
                              : user.latestMessage.message.length > 10
                              ? user.latestMessage.message.substring(0, 10) +
                                "..."
                              : user.latestMessage.message}
                          </Typography>
                        )}
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: "5px",
                      }}
                    >
                      <Typography variant="body">{""}</Typography>
                      {user.unreadMessageCount ? (
                        <>
                          <Typography
                            variant="body"
                            sx={{
                              background: "#DD0000",
                              borderRadius: "20px",
                              width: "24px",
                              height: "24px",
                              textAlign: "center",
                              color: "white",
                            }}
                          >
                            {user.unreadMessageCount}
                          </Typography>
                        </>
                      ) : (
                        <></>
                      )}

                      {user.msgSeen && (
                        <>
                          {user.msgSeen === "true" ? (
                            <Image
                              src={"/images/VectorSeen.png"}
                              width={22}
                              height={9}
                              alt="np pic"
                            />
                          ) : (
                            <Image
                              src={"/images/VectorUnSeen.png"}
                              width={22}
                              height={9}
                              alt="np pic"
                            />
                          )}
                        </>
                      )}
                    </Box>
                  </Box>
                ))}
          </SimpleBar>
        </Box>
      </Grid>
      <Grid item sx={{ flexGrow: 1 }}>
        {selectedCardIndex && selectedChatData ? (
          <ChatHistory
            selectedCardIndex={selectedCardIndex}
            selectedChatData={selectedChatData}
          />
        ) : (
          <Box
            as="div"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              justifyItems: "center",
              background: "#FFFCF3",
              height: "100vh",
            }}
          >
            <label>No chat data available</label>
          </Box>
        )}
      </Grid>
    </Grid>
  );
};

export default UsersList;
