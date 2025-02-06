"use client";

import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { logout } from "@/redux/features/auth.slice";
import BlogList from "@/components/BlogList";
import CreateBlog from "@/components/CreateBlog";
import Cookies from "js-cookie";

export default function BlogPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const handleLogout = () => {
    try {
      // Clear all auth-related data first
      dispatch(logout());
      Cookies.remove("auth");
      localStorage.removeItem("persist:root");

      // Show feedback
      toast.success("Logged out successfully!");

      // Force client-side navigation
      router.replace("/login");
      router.refresh(); // Clear client-side cache

      // Optional: Force hard refresh if still not redirecting
      setTimeout(() => {
        if (window.location.pathname !== "/login") {
          window.location.href = "/login";
        }
      }, 500);
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to logout properly");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      {/* Header Section */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome to the Blog
        </h1>
        <button
          onClick={handleLogout}
          className="mt-4 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
        >
          Logout
        </button>
      </div>

      {/* Blog Creation */}
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6 mb-6">
        <CreateBlog />
      </div>

      {/* Blog List */}
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-6">
        <BlogList />
      </div>
    </div>
  );
}
