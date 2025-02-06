import { createContext, useContext, useEffect } from "react";

import { LoginType, SignupType } from "@/types/api/auth.types";
import { useAppDispatch, useAppSelector } from "../hooks";
import { loginUser, logout, signupUser } from "./auth.slice";

type AuthContextType = {
  user: any;
  isAuthenticated: boolean;
  login: (payload: LoginType) => void;
  signup: (payload: SignupType) => void;
  logoutUser: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);

  const login = (payload: LoginType) => dispatch(loginUser(payload));
  const signup = (payload: SignupType) => dispatch(signupUser(payload));
  const logoutUser = () => dispatch(logout());

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, signup, logoutUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
