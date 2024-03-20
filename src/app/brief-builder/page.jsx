"use client";
import React from "react";
import SubMenubar from "@/components/brief_builder/navbar/sub-menu/SubMenubar";
import { useSession } from "next-auth/react";

const BriefBuilderPage = () => {
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
      <SubMenubar />
    </>
  );
};

export default BriefBuilderPage;
