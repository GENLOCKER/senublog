import { CommentApiType } from "@/types/api/comments.types";
import { privateInstance } from "./instance";

const commentApi: CommentApiType = {
  createComment: (payload) => privateInstance.post("/comments", payload),

  getComments: (params) => {
    const queryParams = new URLSearchParams({
      // blogId: params.blogId || "", // Ensure blogId is included
      page: params.page?.toString() || "1", // Default to page 1
      limit: params.limit?.toString() || "10", // Default to 10 comments per page
    }).toString();
    return privateInstance.get(`/comments?${queryParams}`);
  },

  updateComment: ({ id, payload }) =>
    privateInstance.patch(`/comments/${id}`, { body: payload.body }),

  deleteComment: (id) => privateInstance.delete(`/comments/${id}`),
};

export default commentApi;
