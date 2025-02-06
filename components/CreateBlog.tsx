/** @format */
"use client";
import blogApi from "@/axios/blog.api";
import { useState } from "react";
import { toast } from "react-toastify";

export default function CreateBlog() {
  const [title, setTitle] = useState("");
  const [snippet, setSnippet] = useState("");
  const [body, setBody] = useState("");

  const handleCreateBlog = async () => {
    try {
      await blogApi.createBlog({ title, snippet, body });
      toast.success("Blog created successfully!");
      setTitle("");
      setSnippet("");
      setBody("");
    } catch (error: any) {
      toast.error(
        `Failed to create blog: ${
          error.response?.data?.message || error.message
        }`
      );
    }
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
      >
        Create Blog
      </button>
    </div>
  );
}
