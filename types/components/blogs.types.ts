/** @format */

export type Blog = {
  _id?: string;
  title: string;
  snippet: string;
  body: string;
  createdAt?: string;
  updatedAt?: string;
};

export type FetchBlogType = {
  page: number;
  limit: number;
};

export type BlogResponse = {
  currentPage: number;
  data: Blog[];
  total: number;
  totalPages: number;
};
