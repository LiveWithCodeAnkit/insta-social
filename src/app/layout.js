"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/theme";
import { styled } from "@mui/material";
import AuthSession from "@/components/lib/AuthSession";
import { Provider } from "react-redux";
import { store } from "../../store/store";
// import store from "../../store";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <AuthSession>
          <html lang="en">
            <head>
              <meta charSet="UTF-8" />
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0"
              />
              <meta name="description" content={"mini social"} />
              <title>{"Mini Social"}</title>
            </head>
            <body className={inter.className}>{children}</body>
          </html>
        </AuthSession>
      </ThemeProvider>
    </Provider>
  );
}
