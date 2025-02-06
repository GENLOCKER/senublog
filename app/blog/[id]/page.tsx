"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import blogApi from "@/axios/blog.api";
import { Blog } from "@/types/components/blogs.types";
import CommentList from "@/components/CommentList";

export default function BlogPage() {
  const params = useParams();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await blogApi.fetchBlogById(params.id as string);
        setBlog(response.data.data);
      } catch (err) {
        setError("Failed to load blog");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [params.id]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-40 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="max-w-4xl mx-auto p-6 text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Blog Content */}
      <article className="mb-12">
        <h1 className="text-3xl font-bold mb-4">{blog?.title}</h1>
        <div className="text-gray-500 text-sm mb-6">
          {blog?.createdAt && new Date(blog.createdAt).toLocaleDateString()}
        </div>
        <div className="prose max-w-none">
          {blog?.body.split("\n").map((paragraph, index) => (
            <p key={index} className="mb-4">
              {paragraph}
            </p>
          ))}
        </div>
      </article>

      {/* Comment Section */}
      <CommentList blogId={params.id as string} />
    </div>
  );
}
