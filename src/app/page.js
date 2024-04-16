"use client";
import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Login from "@/components/Auth/login/Login";
import Loading from "@/components/common/loader/Loading";

export default function Home() {
  const router = useRouter();
  const { data: session, status, update } = useSession();
  if (typeof window !== "undefined") {
    console.log("login:-");
  }
  useEffect(() => {
    if (status === "authenticated") {
      const redirectPath =
        session.role === "BRAND" ? "/brief-builder" : "/creator";
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
