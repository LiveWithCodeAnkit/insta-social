"use client";
import React, { useEffect } from "react";
import Sidebar from "@/components/common/sidebar/Sidebar";
import Navbar from "@/components/brief_builder/navbar/Navbar";
import { navConfigBriefBuilder } from "@/components/brief_builder/constants";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Loading from "@/components/common/loader/Loading";

const Layout = (props) => {
  const router = useRouter();
  const { data: session, status, update } = useSession();
  if (typeof window !== "undefined") {
    console.log("status:-");
  }
  useEffect(() => {
    if (status === "authenticated") {
      const redirectPath =
        session?.role === "BRAND" ? "/brief-builder" : "/404";
      router.push(redirectPath);
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
      {status === "authenticated" && session?.role === "BRAND" && (
        <Sidebar navConfig={navConfigBriefBuilder} NavbarComponent={Navbar}>
          {props.children}
        </Sidebar>
      )}
    </>
  );
};

export default Layout;
