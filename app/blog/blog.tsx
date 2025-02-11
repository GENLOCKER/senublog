"use client";

import BlogList from "@/components/BlogList";
import CreateBlog from "@/components/CreateBlog";

export default function BlogPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
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
