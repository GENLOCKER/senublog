// hooks/useUser.ts
import { useState } from "react";

type SimpleUser = {
  id: string;
  name: string;
};

export const useUser = () => {
  // For a single hardcoded user
  const [user] = useState<SimpleUser>({
    id: "user-123", // Hardcoded ID
    name: "Guest User", // Default name
  });

  return { user };
};
