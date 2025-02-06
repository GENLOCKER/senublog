/** @format */

/* eslint-disable */
import { AxiosResponse } from "axios";

export type authApiType = {
  login: (payload: LoginType) => Promise<AxiosResponse>;
  signup: (payload: SignupType) => Promise<AxiosResponse>;
  verifyEmail: (payload: VerifyType) => Promise<AxiosResponse>;
  resendOtp: (payload: Pick<LoginType, "email">) => Promise<AxiosResponse>;
  forgotPassword: (payload: Pick<LoginType, "email">) => Promise<AxiosResponse>;
  changePassword: (payload: ChangePasswordType) => Promise<AxiosResponse>;
  resetPassword: (payload: ResetPasswordType) => Promise<AxiosResponse>;
};

export type LoginType = {
  email: string;
  password: string;
};

export type VerifyType = {
  email: string;
  verificationCode: string;
};

export type SignupType = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
};

export type ResetPasswordType = {
  password: string;
  encryptedCode: string;
  email?: string;
};

export type ChangePasswordType = {
  oldPassword: string;
  newPassword: string;
};
