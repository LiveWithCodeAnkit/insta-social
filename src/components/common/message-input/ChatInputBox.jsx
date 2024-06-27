"use client";
import React, { useContext, useState, useCallback } from "react";
import { Box, IconButton, TextField, CircularProgress } from "@mui/material";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SendIcon from "@mui/icons-material/Send";
import { useSession } from "next-auth/react";
import { useDropzone } from "react-dropzone";
import { useDispatch } from "react-redux";
import Image from "next/image";
import { MdDeleteForever } from "react-icons/md";
import { SocketContext } from "@/components/scoketProvider/socket";
import {
  addFileChat,
  deleteFile,
} from "../../../../store/brief_builder/campaign/campaign.slice";
import {
  getUserLastSeen,
  getUserList,
  sendMessage,
} from "../../../../store/chat_scoket/chatSokcetSlice";

const ChatInputBox = ({ selectedCardIndex, selectedChatData }) => {
  const [message, setMessage] = useState("");
  const { socket } = useContext(SocketContext);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newImages, setNewImages] = useState([]);
  const { data: session, status, update } = useSession();
  const dispatch = useDispatch();

  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  };

  const debouncedApiCall = useCallback(
    debounce(async (formData) => {
      setLoading(true);
      const res = await dispatch(addFileChat(formData)).unwrap();
      setNewImages(res.file);
      setFiles([]);
      setLoading(false);
    }, 300),
    [dispatch]
  );

  const onDrop = async (acceptedFiles) => {
    setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
    const formData = new FormData();
    acceptedFiles.forEach((file) => formData.append("file", file));
    debouncedApiCall(formData);
  };

  const handleSendMessage = async () => {
    if (message.trim() || newImages.length > 0) {
      if (socket) {
        const payload = {
          room: `private-${selectedChatData.members[0]._id}`,
          chatId: selectedCardIndex,
          message,
          mediaContent: newImages,
        };

        // Clear the input field immediately
        setMessage("");
        setNewImages([]);

        await dispatch(sendMessage(payload)).unwrap();
        await dispatch(getUserLastSeen({ index: selectedCardIndex })).unwrap();
        await dispatch(getUserList()).unwrap();
      }
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleDeleteFile = (item) => {
    setNewImages((prevImages) => prevImages.filter((image) => image !== item));
    dispatch(deleteFile([item]));
  };

  return (
    <Box
      sx={{
        Height: "100%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: "80%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: "#FFFFFF",
          padding: "0.5rem",
          borderRadius: "20px",
          gap: "0.3rem",
        }}
      >
        <IconButton
          onClick={() => {
            /* Handle emoji click */
          }}
        >
          <SentimentVerySatisfiedIcon />
        </IconButton>
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          <IconButton>
            <AttachFileIcon />
          </IconButton>
        </div>
        <Box
          sx={{
            width: "100%",
            padding: "0.2rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: "1.2rem",
              alignItems: "center",
            }}
          >
            {loading ? (
              <CircularProgress />
            ) : (
              newImages.length > 0 &&
              newImages.map((url, index) => (
                <Box key={index} sx={{ position: "relative" }}>
                  {url.match(/\.(mp4|webm)$/i) ? (
                    <video
                      style={{
                        width: "150px",
                        height: "150px",
                        padding: "10px",
                      }}
                      controls
                    >
                      <source src={url} type="video/webm" />
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <Image
                      src={url}
                      width={100}
                      height={100}
                      alt={`Image ${index + 1}`}
                      style={{ borderRadius: "20px" }}
                    />
                  )}
                  <MdDeleteForever
                    style={{
                      position: "absolute",
                      color: "red",
                      fontSize: "22px",
                      cursor: "pointer",
                    }}
                    onClick={() => handleDeleteFile(url)}
                  />
                </Box>
              ))
            )}
          </Box>
          <TextField
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            multiline
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                handleSendMessage();
              }
            }}
            maxRows={5}
            variant="outlined"
            fullWidth
            placeholder="Enter text"
            autoFocus
            InputProps={{
              style: { border: "none", boxShadow: "none", caretColor: "black" },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": { border: "none" },
                "&:hover fieldset": { border: "none" },
                "&.Mui-focused fieldset": { border: "none" },
              },
            }}
          />
        </Box>
        <IconButton onClick={handleSendMessage}>
          <SendIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default ChatInputBox;
