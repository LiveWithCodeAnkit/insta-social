"use client";
import React from "react";
import SubMenubar from "@/components/brief_builder/navbar/sub-menu/SubMenubar";
import { useSession } from "next-auth/react";

const BriefBuilderPage = () => {
  const { data: session, status, update } = useSession();
  if (typeof window !== "undefined") {
    if (session) {
      localStorage.setItem("adminToken", session?.jwt);
    } else {
      localStorage.removeItem("adminToken");
    }
  }
  return (
    <>
      <SubMenubar />
    </>
  );
};

export default BriefBuilderPage;
