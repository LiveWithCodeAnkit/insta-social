import { Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import Avatar from "react-avatar";
import { formatTime } from "../SampleMessages";
import { RiDownloadCloudLine } from "react-icons/ri";

const ReceiverMessage = ({ message }) => {
  const handleDownload = (url, index) => {
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `media_${index}`;
    anchor.click();
  };
  return (
    <div style={{ display: "flex", gap: "0.7rem", width: "100%" }}>
      <Avatar
        name={message?.sender?.firstName ?? ""}
        maxInitials={1}
        round
        size={36}
        style={{ marginTop: "1.5rem" }}
        fgColor="#FFFFFF"
      />
      <div>
        <div
          style={{
            background: "#FFFFFF",
            borderRadius: "20px 20px 20px 0",
            padding: "0.5rem 1rem",
            maxWidth: "100%",
          }}
        >
          {/* {message.mediaContent &&
            message.mediaContent.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`media content ${index + 1}`}
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "10px",
                  marginBottom: "0.5rem", // Add some spacing between images
                }}
              />
            ))} */}
          {message?.mediaContent &&
            message?.mediaContent?.map((url, index) => {
              if (
                typeof url === "string" &&
                (url.startsWith("http://") || url.startsWith("https://")) &&
                /\.(mp4|webm)$/i.test(url)
              ) {
                return (
                  <div style={{ position: "relative" }}>
                    <video
                      key={index}
                      style={{
                        width: "150px",
                        aspectRatio: "auto 150 / 150",
                        height: "150px",
                        padding: "10px",
                      }}
                      controls
                    >
                      <source src={url} type="video/webm" />
                      Your browser does not support the video tag.
                    </video>
                    <RiDownloadCloudLine
                      style={{
                        position: "absolute",
                        fontSize: "22px",
                        color: "blue",
                        bottom: "9rem",
                        cursor: "pointer",
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
                        cursor: "pointer",
                      }}
                      onClick={() => handleDownload(url, index)}
                    />
                  </div>
                );
              }
            })}
          <Typography variant="body1">{message?.message}</Typography>
        </div>

        <Typography variant="caption">
          {message && formatTime(message?.createdAt)}
        </Typography>
      </div>
    </div>
  );
};
export default ReceiverMessage;
