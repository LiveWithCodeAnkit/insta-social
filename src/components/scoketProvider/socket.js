"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import SocketClient from "@/services/socket"; // Update with the correct path
import { connectToSocket } from "../../../store/chat_scoket/appSlice";

export const SocketContext = React.createContext(null);

const SocketProvider = ({ children }) => {
  const { data: session } = useSession();
  const [token, setToken] = useState(null);
  const dispatch = useDispatch();
  const socketInstance = new SocketClient();

  useEffect(() => {
    const initializeSocket = async () => {
      if (session) {
        const token = localStorage.getItem("adminToken");
        if (token) {
          setToken(token);
          try {
            dispatch(connectToSocket(token));
          } catch (error) {
            console.error("Error connecting to socket:", error);
          }
        } else {
          console.error("Token not found in local storage.");
        }
      }
    };

    initializeSocket();

    return () => {
      socketInstance.disconnect();
    };
  }, [session]);

  return (
    <SocketContext.Provider value={socketInstance}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
