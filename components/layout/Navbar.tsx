"use client";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { logout } from "@/redux/features/auth.slice";
import Link from "next/link";

export default function Navbar() {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogout = () => {
    try {
      dispatch(logout());
      toast.success("Logged out successfully!");
      router.replace("/login");
      router.refresh();
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
    <nav className="sticky top-0 z-50 bg-white shadow-md p-4 w-full">
      <div className="container mx-auto flex justify-between items-center">
        {/* Blog Title or Logo */}
        <Link href="/blog" className="text-2xl font-bold text-gray-800">
          My Blog
        </Link>

        {/* Navigation Links */}
        <div className="flex gap-4 items-center">
          {/* Blog List Link */}
          <Link
            href="/blog"
            className="text-blue-600 hover:text-blue-800 transition-colors"
          >
            Blog
          </Link>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
