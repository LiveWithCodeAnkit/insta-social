import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import React from "react";
import Avatar from "react-avatar";
import { MdDeleteOutline } from "react-icons/md";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import {
  deleteMessage,
  getMessages,
  getUserList,
} from "../../../../../../store/chat_scoket/chatSokcetSlice";
import { formatTime } from "../SampleMessages";
//

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { RiDownloadCloudLine } from "react-icons/ri";
import { RiEyeCloseFill } from "react-icons/ri";
import { RiEyeFill } from "react-icons/ri";
//

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.7rem;
  width: 100%;

  position: relative;
`;

const MessageContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  width: 100%;
  align-items: flex-end;
  cursor: pointer;
`;

const Bubble = styled.div`
  background: #ffcc33;
  border-radius: 20px 20px 0px 20px;
  padding: 0.5rem 1rem;
  max-width: 250px; /* Adjust as needed */
  word-wrap: break-word; /* Ensures long words break and wrap to the next line */
  overflow-wrap: break-word; /* Adds additional support for word breaking */
`;

const Media = styled.video`
  width: 150px;
  aspect-ratio: auto 150 / 150;
  height: 150px;
  padding: 10px;
`;

const Footer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
`;

// const StyledIconButton = styled(IconButton)`
//   position: absolute;
//   right: 5px;
//   bottom: 1rem;
//   color: gray;
//   opacity: ${({ visible }) => (visible ? "1" : "0")};
//   transition: opacity 0.3s ease; /* Add transition effect */
// `;

const SenderMessage = ({
  message,
  senderId,
  selectedCardIndex,
  setMessages,
}) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const [timeoutId, setTimeoutId] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const handleMouseEnter = () => {
    setIsHovered(true);
    clearTimeout(timeoutId);
  };

  const handleMouseLeave = () => {
    const id = setTimeout(() => setIsHovered(false), 1000);
    setTimeoutId(id);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = async (message) => {
    try {
      setOpen(false); // Close the dialog immediately

      const payload = { messageId: message?._id };
      await dispatch(deleteMessage(payload)); // Delete the message first

      // Fetch updated messages and user list asynchronously
      const [resultAction] = await Promise.all([
        dispatch(getMessages(selectedCardIndex)),
        dispatch(getUserList()),
      ]);

      const messages = resultAction.payload.data;
      setMessages(messages);
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  const handleDownload = (url, index) => {
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `media_${index}`;
    anchor.click();
  };
  return (
    <>
      <Container>
        <MessageContent>
          <Bubble
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {message?.mediaContent &&
              message?.mediaContent.map((url, index) => {
                if (
                  typeof url === "string" &&
                  (url.startsWith("http://") || url.startsWith("https://")) &&
                  /\.(mp4|webm)$/i.test(url)
                ) {
                  return (
                    <div style={{ position: "relative" }}>
                      <Media key={index} controls>
                        <source src={url} type="video/webm" />
                        Your browser does not support the video tag.
                      </Media>
                      <RiDownloadCloudLine
                        style={{
                          position: "absolute",
                          fontSize: "22px",
                          color: "blue",
                          bottom: "9rem",
                        }}
                        onClick={() => {
                          handleDownload(url);
                        }}
                      />
                    </div>
                  );
                } else {
                  return (
                    <div style={{ position: "relative" }}>
                      <Image
                        key={index}
                        src={url}
                        width={100}
                        height={100}
                        alt={`media content ${index + 1}`}
                        style={{ borderRadius: "20px" }}
                      />
                      <RiDownloadCloudLine
                        style={{
                          position: "absolute",
                          fontSize: "22px",
                          color: "blue",
                          bottom: "6rem",
                        }}
                        onClick={() => handleDownload(url, index)}
                      />
                    </div>
                  );
                }
              })}

            <Typography
              variant="body1"
              sx={{ wordWrap: "break-word", overflowWrap: "break-word" }}
            >
              {message?.message}
            </Typography>
          </Bubble>
          <Footer>
            {message?.readBy?.includes(senderId) ? (
              <>
                <Image
                  src="/images/VectorSeen.png"
                  width={22}
                  height={9}
                  alt="seen"
                />
                <RiEyeFill />
              </>
            ) : (
              <>
                <Image
                  src="/images/VectorUnSeen.png"
                  width={22}
                  height={9}
                  alt="unseen"
                />
                <RiEyeCloseFill />
              </>
            )}

            <Typography variant="caption">
              {message && formatTime(message?.createdAt)}
            </Typography>
          </Footer>
        </MessageContent>

        <MdDeleteOutline
          style={{
            visibility: isHovered ? "visible" : "hidden",
            position: "absolute",
            right: "26px",
            bottom: "2rem",
            color: "red",
            fontSize: "24px",
            opacity: isHovered ? "1" : "0",
            overflow: "hidden",
            cursor: "pointer",
            transition: "opacity 0.3s ease, visibility 0.3s ease",
          }}
          onClick={handleClickOpen}
        />

        <Avatar
          name={message?.sender?.firstName ?? ""}
          maxInitials={1}
          round
          size={36}
          style={{ marginTop: "1.5rem" }}
          color="#FFCC33"
        />
      </Container>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete this message?"}
        </DialogTitle>

        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Disagree
          </Button>
          <Button
            onClick={() => {
              handleClick(message);
            }}
            color="primary"
            autoFocus
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SenderMessage;
