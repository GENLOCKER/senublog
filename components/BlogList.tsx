"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import blogApi from "@/axios/blog.api";
import { Blog } from "@/types/components/blogs.types";
import { toast } from "react-toastify";

export default function BlogList() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  const loadBlogs = async () => {
    try {
      setLoading(true);
      const response = await blogApi.fetchBlogs({ page: 1, limit: 10 });
      setBlogs(response.data.data);
    } catch (error) {
      console.error("Failed to fetch blogs", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  const handleDelete = async (blogId: string) => {
    if (confirm("Are you sure you want to delete this blog?")) {
      try {
        await blogApi.deleteBlog(blogId);
        toast.success("Blog deleted successfully");
        // Refresh the list after deletion
        await loadBlogs();
      } catch (error) {
        toast.error("Failed to delete blog");
      }
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Blog List</h1>
      {loading ? (
        <div className="animate-pulse space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-24 bg-gray-200 rounded-md"></div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="p-4 border rounded-lg relative group"
            >
              <Link
                href={`/blog/${blog._id}`}
                className="block hover:no-underline"
              >
                <h2 className="text-xl font-semibold mb-2 hover:text-blue-600">
                  {blog.title}
                </h2>
                <p className="text-gray-600">{blog.snippet}</p>
              </Link>

              <div className="mt-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => router.push(`/blog/${blog._id}/edit`)}
                  className="text-sm px-3 py-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(blog._id as string)}
                  className="text-sm px-3 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
