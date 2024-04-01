"use client";
import axios from "axios";

export const baseUrl = process.env.NEXT_PUBLIC_API_URL;
let AxiosCreator;

if (typeof window !== "undefined") {
  AxiosCreator = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
  });

  AxiosCreator.interceptors.request.use((config) => {
    config.headers["Authorization"] =
      "Bearer " + localStorage?.getItem("adminToken") || "";
    return config;
  });

  AxiosCreator.interceptors.response.use(
    (res) => {
      return res;
    },
    (err) => {
      if (err?.response?.status === 401) {
        console.log("401 err : ", err);
        window.location.href = "/";
      }

      throw err?.response;
    }
  );
}

export default AxiosCreator;
