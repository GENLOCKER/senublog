/** @format */
import { _handleError } from "@/lib/errorHandler";
import axios from "axios";
import Cookies from "js-cookie";

export const BASEURL = process.env.NEXT_PUBLIC_BASEURL;

const publicInstance = axios.create({
  baseURL: BASEURL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

const privateInstance = axios.create({
  baseURL: BASEURL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

const formDataInstance = axios.create({
  baseURL: BASEURL,
  headers: {
    Accept: "*/*",
    "Content-Type":
      "multipart/form-data;boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW",
  },
});

// Update both interceptors to use the same logic
privateInstance.interceptors.request.use((config: any) => {
  const authCookie = Cookies.get("auth");
  let token = "";

  if (authCookie) {
    try {
      token = JSON.parse(authCookie).accessToken || authCookie;
    } catch (error) {
      token = authCookie;
    }
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

formDataInstance.interceptors.request.use((config: any) => {
  const authCookie = Cookies.get("auth");
  let token = "";

  if (authCookie) {
    try {
      token = JSON.parse(authCookie).accessToken || authCookie;
    } catch (error) {
      token = authCookie;
    }
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

//response interceptors
publicInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    _handleError(error);
    throw error;
  }
);

privateInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    _handleError(error);
    throw error;
  }
);

formDataInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    _handleError(error);
    throw error;
  }
);

export { publicInstance, privateInstance, formDataInstance };
