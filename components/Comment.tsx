"use client";
import { useState } from "react";
import commentApi from "@/axios/comment.api";
import { Comment } from "@/types/api/comments.types";
import { format } from "date-fns";

export default function CommentItem({
  comment,
  onDelete,
  onUpdate,
}: {
  comment: Comment;
  onDelete: (id: string) => void;
  onUpdate: (id: string, content: string) => void;
}) {
  // Single user configuration
  const currentUserId = "user-123"; // Hardcoded single user ID
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(comment.content);

  const handleUpdate = async () => {
    try {
      await commentApi.updateComment({ id: comment._id, payload: { content } });
      onUpdate(comment._id, content);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update comment:", error);
    }
  };

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this comment?")) {
      try {
        await commentApi.deleteComment(comment._id);
        onDelete(comment._id);
      } catch (error) {
        console.error("Failed to delete comment:", error);
      }
    }
  };

  return (
    <div className="p-4 border rounded-lg mb-4 bg-white shadow-sm">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h4 className="font-medium text-gray-800">{comment.authorName}</h4>
          <p className="text-sm text-gray-500">
            {format(new Date(comment.createdAt), "MMM d, yyyy 'at' HH:mm")}
          </p>
        </div>

        {/* Always show controls for single user system */}
        <div className="flex gap-2">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            {isEditing ? "Cancel" : "Edit"}
          </button>
          <button
            onClick={handleDelete}
            className="text-sm text-red-600 hover:text-red-800"
          >
            Delete
          </button>
        </div>
      </div>

      {isEditing ? (
        <div className="space-y-2">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows={3}
          />
          <button
            onClick={handleUpdate}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Save Changes
          </button>
        </div>
      ) : (
        <p className="text-gray-700 whitespace-pre-wrap">{comment.content}</p>
      )}
    </div>
  );
}
