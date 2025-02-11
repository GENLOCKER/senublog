"use client";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import blogApi from "@/axios/blog.api";
import Cookies from "js-cookie";

export default function CreateBlog() {
  const [title, setTitle] = useState("");
  const [snippet, setSnippet] = useState("");
  const [body, setBody] = useState("");
  const router = useRouter();

  const token = Cookies.get("auth"); // Retrieve token from cookies

  // Define the mutation for creating a blog
  const createBlogMutation = useMutation({
    mutationFn: (payload) => blogApi.createBlog(payload, token), // Pass token dynamically
    onSuccess: () => {
      toast.success("Blog created successfully!");
      setTitle("");
      setSnippet("");
      setBody("");
      router.push("/blog");
    },
    onError: (error: any) => {
      if (error.response?.status === 401) {
        toast.error("Authentication failed. Please log in again.");
      } else {
        toast.error(
          `Failed to create blog: ${
            error.response?.data?.message || error.message
          }`
        );
      }
    },
  });

  const handleCreateBlog = () => {
    if (!token) {
      toast.error("Authentication required. Please log in.");
      return;
    }
    createBlogMutation.mutate({ title, snippet, body }); // Trigger the mutation
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
