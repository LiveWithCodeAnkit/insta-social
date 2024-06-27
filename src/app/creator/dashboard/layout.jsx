"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { navConfigCreator } from "@/components/creatorDashboard/constants";
import Navbar from "@/components/creatorDashboard/navbar/Navbar";
import Sidebar from "@/components/common/sidebar/Sidebar";
import Loading from "@/components/common/loader/Loading";

const layout = (props) => {
  const router = useRouter();
  const { data: session, status, update } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      if (session?.role !== "CREATOR") {
        router.push("/404");
      }
    } else if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, session, router]);
  return (
    <>
      {status === "loading" && (
        <div>
          <Loading />
        </div>
      )}
      {status === "authenticated" && session?.role === "CREATOR" && (
        <Sidebar navConfig={navConfigCreator} NavbarComponent={Navbar}>
          {props.children}
        </Sidebar>
      )}
    </>
  );
};

export default layout;
