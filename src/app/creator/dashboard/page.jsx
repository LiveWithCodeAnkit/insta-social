"use client";
import CreatorDashboard from "@/components/creatorDashboard/CreatorDashboard";
import React from "react";
import { useSession } from "next-auth/react";
const CreatorPage = () => {
  const { data: session, status, update } = useSession();
  if (typeof window !== "undefined") {
    if (session) {
      console.log("session:-", session);
      localStorage.setItem("adminToken", session?.jwt);
      localStorage.setItem("sessionId", session?.sessionId);
    } else {
      localStorage.removeItem("adminToken");
      localStorage.removeItem("sessionId");
    }
  }
  return (
    <>
      <CreatorDashboard />
    </>
  );
};

export default CreatorPage;
