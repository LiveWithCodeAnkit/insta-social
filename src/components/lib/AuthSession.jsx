"use client";

import { SessionProvider } from "next-auth/react";
import React from "react";

export default function AuthSession({ children }) {
  return <SessionProvider>{children}</SessionProvider>;
}
