/** @format */

import { AxiosResponse } from "axios";

import { Blog, FetchBlogType } from "@/types/components/blogs.types";

export type BlogApiType = {
  createBlog: (payload: Blog) => Promise<AxiosResponse>;
  fetchBlogs: (payload: FetchBlogType) => Promise<AxiosResponse>;
  fetchBlogById: (id: string) => Promise<AxiosResponse>;
  updateBlog: ({
    id,
    payload,
  }: {
    id: string;
    payload: Partial<Blog>;
  }) => Promise<AxiosResponse>;
  deleteBlog: (id: string) => Promise<AxiosResponse>;
};
