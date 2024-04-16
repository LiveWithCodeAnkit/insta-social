"use client";
import React, { useEffect } from "react";
import Sidebar from "@/components/common/sidebar/Sidebar";
import navConfigBrand from "@/components/common/sidebar/NavConfig";
import Navbar from "@/components/brandDashboard/Navbar";
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
      if (session?.role !== "BRAND") {
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
      {status === "authenticated" && session?.role === "BRAND" && (
        <Sidebar navConfig={navConfigBrand} NavbarComponent={Navbar}>
          {props.children}
        </Sidebar>
      )}
    </>
  );
};

export default Layout;
