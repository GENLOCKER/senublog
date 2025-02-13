"use client";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import blogApi from "@/axios/blog.api";
import { Blog } from "@/types/components/blogs.types";

interface ApiError {
  response?: {
    status?: number;
    data?: {
      message?: string;
    };
  };
}

export default function CreateBlog() {
  const [title, setTitle] = useState("");
  const [snippet, setSnippet] = useState("");
  const [body, setBody] = useState("");
  const router = useRouter();

  // Define the mutation for creating a blog
  const createBlogMutation = useMutation({
    mutationFn: (payload: Blog) => blogApi.createBlog(payload), // Ensure payload matches Blog type
    onSuccess: () => {
      toast.success("Blog created successfully!");
      setTitle("");
      setSnippet("");
      setBody("");
      router.push("/blog");
    },
    onError: (error: ApiError) => {
      toast.error(
        `Failed to create blog: ${
          error.response?.data?.message || "An error occurred."
        }`
      );
    },
  });

  const handleCreateBlog = () => {
    if (!title || !snippet || !body) {
      toast.error("Please fill in all fields.");
      return;
    }

    const payload: Blog = {
      title,
      snippet,
      body,
    };

    createBlogMutation.mutate(payload); // Pass the constructed payload
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Create Blog</h1>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="p-2 border rounded w-full mb-2"
      />
      <input
        type="text"
        placeholder="Snippet"
        value={snippet}
        onChange={(e) => setSnippet(e.target.value)}
        className="p-2 border rounded w-full mb-2"
      />
      <textarea
        placeholder="Body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        className="p-2 border rounded w-full mb-2"
      />
      <button
        onClick={handleCreateBlog}
        className="p-2 bg-blue-500 text-white rounded"
        disabled={createBlogMutation.isPending}
      >
        {createBlogMutation.isPending ? "Creating..." : "Create Blog"}
      </button>
    </div>
  );
}
