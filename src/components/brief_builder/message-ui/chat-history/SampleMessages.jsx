import { SocketContext } from "@/components/scoketProvider/socket";
import { useSession } from "next-auth/react";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getMessages,
  getUserLastSeen,
  getUserList,
  resetCurrentMessageData,
} from "../../../../../store/chat_scoket/chatSokcetSlice";
import ReceiverMessage from "./reciver-ui/ReceiverMessage";
import SenderMessage from "./sender-ui/SenderMessage";

export const formatTime = (createdAt) => {
  const date = new Date(createdAt);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
  const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
  return `${formattedHours}:${formattedMinutes} ${ampm}`;
};

const SampleMessages = ({ selectedCardIndex, selectedChatData }) => {
  const { socket } = useContext(SocketContext);
  const [messages, setMessages] = useState([]);
  const { data: session } = useSession();
  const [senders, setSenders] = useState([]);
  const dispatch = useDispatch();
  const [lastSeenMemberId, setLastSeenMemberId] = useState(null);

  const userChatMessages = useSelector(
    (state) => state.ChatRequest.chatUsersMeesages.userMessages
  );

  const messageCurrent = useSelector(
    (state) => state.ChatRequest.chatsendMessage.messageSend
  );

  const senderId = selectedChatData.members[0]._id;

  useEffect(() => {
    if (socket) {
      const fetchMessages = async () => {
        try {
          const resultAction = await dispatch(getMessages(selectedCardIndex));
          const messages = resultAction.payload.data;

          setMessages(messages);
        } catch (error) {
          console.error("Error fetching messages:", error);
        }
      };

      fetchMessages();
      const handleMessage = (newMessage) => {
        const jsonMessage = JSON.parse(newMessage);

        dispatch(getUserList());

        if (selectedCardIndex && selectedCardIndex == jsonMessage.chat) {
          setMessages((prevMessages) => [...prevMessages, jsonMessage]);
        }
      };

      socket.on("message", handleMessage);

      return () => {
        socket.off("message", handleMessage);
      };
    }
  }, [socket, dispatch, selectedCardIndex, messageCurrent]);

  useEffect(() => {
    if (socket && selectedCardIndex && selectedChatData) {
      const payload = {
        index: selectedCardIndex,
      };
      dispatch(getUserLastSeen(payload));
      dispatch(getUserList());
    }
  }, [socket, selectedCardIndex, selectedChatData]);

  useEffect(() => {
    if (messageCurrent && senders?.length > 0) {
      setMessages((prevMessages) => [...prevMessages, messageCurrent.data]);

      return () => {
        dispatch(resetCurrentMessageData());
      };
    }
  }, [messageCurrent, dispatch]);

  useEffect(() => {
    const updateLastSeenHandler = (chat) => {
      const newChatId = JSON.parse(chat);
      if (newChatId.chatId === selectedCardIndex && messages) {
        const memberId = selectedChatData.members[0]._id;
        setLastSeenMemberId(memberId);

        const updatedMessages = messages.map((message) => {
          const isMemberAlreadySeen = message.readBy.includes(memberId);
          if (!isMemberAlreadySeen) {
            return {
              ...message,
              readBy: [...message.readBy, memberId],
            };
          }
          return message;
        });
        setMessages(updatedMessages);
      }
    };

    if (socket) {
      socket.on("seen-messages", updateLastSeenHandler);
      return () => {
        socket.off("seen-messages", updateLastSeenHandler);
      };
    }
  }, [socket, selectedCardIndex, messages, selectedChatData]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      {messages?.map((message, index) => (
        <div key={message._id}>
          {session?.sessionId === message?.sender._id ? (
            <SenderMessage
              key={message._id}
              message={message}
              senderId={senderId}
              selectedCardIndex={selectedCardIndex}
              setMessages={setMessages}
            />
          ) : (
            <ReceiverMessage message={message} key={message._id} />
          )}
        </div>
      ))}
    </div>
  );
};

export default SampleMessages;
