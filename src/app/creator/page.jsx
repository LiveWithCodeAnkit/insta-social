"use client";
import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import Login from "@/components/Auth/login/Login";
import { useRouter } from "next/navigation";
import Loading from "@/components/common/loader/Loading";

const Page = () => {
  const router = useRouter();
  const { data: session, status, update } = useSession();
  if (typeof window !== "undefined") {
    if (session) {
      localStorage.setItem("adminToken", session?.jwt);
    } else {
      localStorage.removeItem("adminToken");
    }
  }

  useEffect(() => {
    if (status === "authenticated") {
      if (session.role === "CREATOR") {
        if (session?.profileCompleted) {
          router.push("/creator/dashboard/my-campaign");
        } else {
          router.push("/creator/dashboard/settings");
        }
      } else {
        router.push("/404");
      }
    } else if (status === "unauthenticated") {
      router.push("/creator");
    }
  }, [status, session, router]);

  return (
    <>
      {status === "loading" && (
        <div>
          <Loading />
        </div>
      )}
      {status === "unauthenticated" && (
        <Login
          title="Creators"
          pathLoc="/"
          linkTitle="Brand"
          role="CREATOR"
          signupUrl="/creator/signup"
        />
      )}
    </>
  );
};

export default Page;
