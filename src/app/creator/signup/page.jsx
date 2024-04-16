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
    //console.log("status:-");
  }
  useEffect(() => {
    if (status === "authenticated") {
      const redirectPath =
        session.role === "CREATOR" ? "/creator/dashboard" : "/404";
      router.push(redirectPath);
    } else if (status === "unauthenticated") {
      router.push("/creator/signup");
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
        <SignUp tittle="Sign Up Creator" loginLink="/creator" role="CREATOR" />
      )}
    </>
  );
};

export default page;
