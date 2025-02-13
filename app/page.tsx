"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  // Redirect to /login immediately when the component mounts
  router.push("/login");

  return null; // Optional: You can return null since the user will be redirected
}
