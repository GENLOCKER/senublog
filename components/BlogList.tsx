"use client";
import { useQuery } from "@tanstack/react-query";
import blogApi from "@/axios/blog.api";
import { BlogResponse } from "@/types/components/blogs.types";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Link from "next/link";

export default function BlogList() {
  const router = useRouter();

  // Fetch the list of blogs using React Query with 'populate' parameter
  const { data, isLoading, isError, refetch } = useQuery<BlogResponse>({
    queryKey: ["blogs", { page: 1, limit: 10, populate: "author,comments" }], // Include populate in queryKey
    queryFn: () =>
      blogApi
        .fetchBlogs({ page: 1, limit: 10, populate: "author,comments" }) // Add populate parameter
        .then((response) => response.data),
    enabled: true, // Ensure the query runs when the component mounts
  });

  const handleDelete = async (blogId: string) => {
    if (confirm("Are you sure you want to delete this blog?")) {
      try {
        await blogApi.deleteBlog(blogId);
        toast.success("Blog deleted successfully");
        await refetch(); // Refresh the list after deletion
      } catch (error) {
        toast.error("Failed to delete blog");
      }
    }
  };

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-24 bg-gray-200 rounded-md"></div>
        ))}
      </div>
    );
  }

  if (isError) {
    return <p className="text-red-500">Failed to load blogs.</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Blog List</h1>
      <div className="space-y-4">
        {data?.data.map((blog) => (
          <div key={blog._id} className="p-4 border rounded-lg relative group">
            <Link
              href={`/blog/${blog._id}`}
              className="block hover:no-underline"
            >
              <h2 className="text-xl font-semibold mb-2 hover:text-blue-600">
                {blog.title}
              </h2>
              <p className="text-gray-600">{blog.snippet}</p>
            </Link>
            {/* Display populated fields */}
            <div className="mt-2 text-sm text-gray-500">
              <span>Author: {blog.author?.name || "Unknown"}</span>
              <br />
              <span>Comments: {blog.comments?.length || 0}</span>
            </div>
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
    </div>
  );
}
