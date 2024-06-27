"use client";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";

import AuthSession from "@/components/lib/AuthSession";
import ThemeProvider from "@/theme";
import { Inter } from "next/font/google";
import { Provider, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { store } from "../../store/store";
import SocketProvider from "@/components/scoketProvider/socket";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="description" content={"mini social"} />
        <title>{"Mini Social"}</title>
      </head>
      <Provider store={store}>
        <ThemeProvider>
          <AuthSession>
            <SocketProvider>
              <body className={inter.className}>
                <ToastContainer />
                {children}
              </body>
            </SocketProvider>
          </AuthSession>
        </ThemeProvider>
      </Provider>
    </html>
  );
}
