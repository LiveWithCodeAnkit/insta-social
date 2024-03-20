import axios from "axios";
import AxiosCreator from "./httpServices";

const baseURL = "http://192.168.1.2:3000/api/";

export const GET = async (url, options) => {
  try {
    const res = await AxiosCreator.get(url, {
      ...options,
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const POST = async (url, payload) => {
  try {
    const res = await AxiosCreator.post(url, payload);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const FORM_DATA_POST = async (url, payload) => {
  try {
    const res = await AxiosCreator({
      method: "post",
      url: `${baseURL}${url}`,
      data: payload,
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const PUT = async (url, payload) => {
  try {
    const res = await AxiosCreator.put(url, payload);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const DELETE = async (url) => {
  try {
    const res = await AxiosCreator.delete(url);
    return res.data;
  } catch (error) {
    throw error;
  }
};
