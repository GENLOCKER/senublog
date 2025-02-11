/** @format */
import { AxiosResponse } from "axios";

export type Comment = {
  _id: string;
  body: string; // Changed from `content` to `body`
  blog: string; // Changed from `blogId` to `blog`
  author: string; // Changed from `authorId` to `author`
  authorName: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateCommentPayload = {
  body: string; // Changed from `content` to `body`
  blog: string; // Changed from `blogId` to `blog`
  author: string; // Changed from `authorId` to `author`
};
export type UpdateCommentPayload = {
  body: string;
};

export type GetCommentsParams = {
  page?: number;
  limit?: number;
  // blogId?: string;
};

export type CommentsResponse = {
  data: Comment[];
  total: number;
  page: number;
  totalPages: number;
};

export type CommentApiType = {
  createComment: (
    payload: CreateCommentPayload
  ) => Promise<AxiosResponse<Comment>>;

  getComments: (
    params: GetCommentsParams
  ) => Promise<AxiosResponse<CommentsResponse>>;

  updateComment: (params: {
    id: string;
    payload: UpdateCommentPayload;
  }) => Promise<AxiosResponse<Comment>>;

  deleteComment: (id: string) => Promise<AxiosResponse<{ message: string }>>;
};
