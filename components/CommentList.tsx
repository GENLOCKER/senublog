"use client";
import { useState, useEffect } from "react";
import commentApi from "@/axios/comment.api";
import { Comment } from "@/types/api/comments.types";
import { format } from "date-fns";

// Helper function to validate and format the date
const formatDate = (dateString: string) => {
  if (!dateString) return "Just now"; // Fallback for missing date
  const date = new Date(dateString);
  return isNaN(date.getTime())
    ? "Just now"
    : format(date, "MMM d, yyyy 'at' h:mm a");
};

export default function CommentList({ blogId }: { blogId: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Hardcoded author ID for single user system
  const authorId = "64f1a2b3c4d5e6f7a8b9c0d1"; // Replace with actual user ID

  // Fetch comments for the blog
  useEffect(() => {
    const loadComments = async () => {
      try {
        const response = await commentApi.getComments({});
        setComments(response.data.data);
      } catch (err) {
        console.error("Failed to load comments:", err);
        setError("Failed to load comments");
      } finally {
        setLoading(false);
      }
    };
    loadComments();
  }, [blogId]);

  // Handle new comment submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    try {
      const response = await commentApi.createComment({
        body: newComment,
        blog: blogId,
        author: authorId,
      });
      const newCommentWithDate = {
        ...response.data,
        createdAt: response.data.createdAt || new Date().toISOString(),
      };
      setComments([newCommentWithDate, ...comments]); // Add new comment to the top
      setNewComment("");
    } catch (err) {
      console.error("Failed to post comment:", err);
      setError("Failed to post comment");
    }
  };

  // Handle comment deletion
  const handleDelete = async (commentId: string) => {
    if (confirm("Are you sure you want to delete this comment?")) {
      try {
        await commentApi.deleteComment(commentId);
        setComments(comments.filter((comment) => comment._id !== commentId)); // Remove deleted comment
      } catch (err) {
        console.error("Failed to delete comment:", err);
        setError("Failed to delete comment");
      }
    }
  };

  if (loading) return <div>Loading comments...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6">Comments</h2>
      {/* Comment Form */}
      <form onSubmit={handleSubmit} className="mb-8">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write your comment..."
          className="w-full p-4 border rounded-lg mb-4 focus:ring-2 focus:ring-blue-500"
          rows={4}
        />
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Post Comment
        </button>
      </form>
      {/* Comments List */}
      <div className="space-y-6">
        {comments?.map((comment) => (
          <div
            key={comment._id}
            className="p-6 border rounded-lg bg-white shadow-sm"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-sm text-gray-500 mt-1">
                  {formatDate(comment.createdAt)}
                </p>
              </div>
              <button
                onClick={() => handleDelete(comment._id)}
                className="text-sm text-red-600 hover:text-red-800"
              >
                Delete
              </button>
            </div>
            <p className="text-gray-700 whitespace-pre-wrap">{comment.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
