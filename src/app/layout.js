"use client";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";

import { Inter } from "next/font/google";
import ThemeProvider from "@/theme";
import AuthSession from "@/components/lib/AuthSession";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import { store } from "../../store/store";

// import store from "../../store";
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
            <body className={inter.className}>
              <ToastContainer />
              {children}
            </body>
          </AuthSession>
        </ThemeProvider>
      </Provider>
    </html>
  );
}
