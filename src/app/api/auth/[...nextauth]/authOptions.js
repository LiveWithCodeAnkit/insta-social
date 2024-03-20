import CredentialsProvider from "next-auth/providers/credentials";
import { NextResponse } from "next/server";

const API_ENDPOINT =
  process.env.NEXT_PUBLIC_API_ENDPOINT ||
  "http://192.168.1.2:3000/api/auth/login";

export const authOptions = {
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.jwt = token.jwt;
        session.sessionId = token.sessionId;
      }

      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          jwt: user.jwt,
          sessionId: user.sessionId,
        };
      }

      return token;
    },
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      async authorize(credentials, request) {
        const { email, password, role } = credentials;

        try {
          const response = await fetch(API_ENDPOINT, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password, role }),
          });

          if (!response.ok) {
            if (response.status === 401) {
              return NextResponse.redirect(new URL("/", request.url));
            } else {
              console.error(`Authentication error: ${response.status}`);
              return null;
            }
          }

          const user = await response.json();
          const jwt = user.token;
          const sessionId = user?.data?._id;

          return {
            ...credentials,
            jwt,
            sessionId,
            user,
          };
        } catch (error) {
          console.error("Error during authentication:", error);
          return null;
        }
      },
    }),
  ],
};
