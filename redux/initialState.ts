import { User } from "@/types/components/general.types";

export const initialState = {
  auth: {
    user: null as User | null,
    isAuthenticated: false,
    token: null as string | null,
  },
};
