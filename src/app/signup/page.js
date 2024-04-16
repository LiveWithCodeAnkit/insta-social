"use client";
import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import SignUp from "@/components/Auth/signup/Signup";
import Loading from "@/components/common/loader/Loading";

const page = () => {
  const router = useRouter();
  const { data: session, status, update } = useSession();
  if (typeof window !== "undefined") {
    // console.log("signup:-", session);
  }
  useEffect(() => {
    if (status === "authenticated") {
      const redirectPath = session.role === "BRAND" ? "/brief-builder" : "/404";
      router.push(redirectPath);
    } else if (status === "unauthenticated") {
      router.push("/signup");
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
        <SignUp tittle="Sign Up Brand" loginLink="/" role="BRAND" />
      )}
    </>
  );
};

export default page;
