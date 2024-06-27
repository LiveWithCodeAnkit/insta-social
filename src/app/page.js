"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Login from "@/components/Auth/login/Login";
import Loading from "@/components/common/loader/Loading";
import { useDispatch, useSelector } from "react-redux";
import { connectToSocket } from "../../store/chat_scoket/appSlice";

export default function Home() {
  const router = useRouter();
  const { data: session, status, update } = useSession();
  const [token, setToken] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    if (typeof window !== "undefined") {
      console.log("login:-");

      const fetchToken = async () => {
        const token = await new Promise((resolve) => {
          const checkToken = () => {
            const token = localStorage.getItem("adminToken");
            if (token) {
              resolve(token);
            } else {
              setTimeout(checkToken, 100);
            }
          };
          checkToken();
        });
        setToken(token);
      };

      fetchToken();
    }
  }, []);

  useEffect(() => {
    if (status === "authenticated") {
      dispatch(connectToSocket(session?.jwt));
      const redirectPath =
        session.role === "BRAND" ? "/brief_builder" : "/creator";
      router.push(redirectPath);
    } else if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, session, router]);

  const connectionStatus = useSelector((state) => state.connection?.status);

  useEffect(() => {
    if (connectionStatus === "connected") {
      socketInstance.socket.on("disconnect", () => {
        //console.log("Socket disconnected");
        dispatch(connectToSocket(token));
      });
    }
  }, [connectionStatus, dispatch, token]);
  return (
    <>
      {status === "loading" && (
        <div>
          <Loading />
        </div>
      )}
      {status === "unauthenticated" && (
        <Login
          title="Brands"
          pathLoc="/creator"
          linkTitle="Creators"
          role="BRAND"
          signupUrl="/signup"
        />
      )}
    </>
  );
}
