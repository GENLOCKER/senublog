// context/AuthContext.tsx
"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { User } from "@/types/user.types";

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  error: string | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadUser() {
      try {
        // Replace with your actual auth check logic
        const response = await fetch("/api/auth/me");
        const data = await response.json();
        setUser(data.user);
      } catch (err) {
        setError("Failed to load user");
      } finally {
        setIsLoading(false);
      }
    }

    loadUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, error }}>
      {children}
    </AuthContext.Provider>
  );
}
