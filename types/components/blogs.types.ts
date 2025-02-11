/** @format */

export type Blog = {
  _id?: string;
  title: string;
  snippet: string;
  body: string;
  createdAt?: string;
  updatedAt?: string;
  author?: { _id: string; name: string };
  comments?: { _id: string; content: string; createdAt: string }[];
};

export type FetchBlogType = {
  page: number;
  limit: number;
  populate?: string;
};

export type BlogResponse = {
  currentPage: number;
  data: Blog[];
  total: number;
  totalPages: number;
};
