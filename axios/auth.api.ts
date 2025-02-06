/** @format */
import { authApiType } from "@/types/api/auth.types";

import { privateInstance, publicInstance } from "./instance";

const authApi: authApiType = {
  login: async (payload) => await publicInstance.post("/auth/login", payload),
  signup: async (payload) => await publicInstance.post("/auth/signup", payload),
  verifyEmail: async (payload) =>
    await publicInstance.post("/auth/verify-email", payload),
  resendOtp: async (payload) =>
    await publicInstance.post("/auth/resend-otp", payload),
  forgotPassword: async (payload) =>
    await publicInstance.get(`/auth/forgot-password?email=${payload.email}`),
  resetPassword: async (payload) =>
    await publicInstance.post("/auth/reset-password", payload),
  changePassword: async (payload) =>
    await privateInstance.post("/auth/change-password", payload),
};

export default authApi;
