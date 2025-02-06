/** @format */

import { filterAndSetParams } from "@/helpers/utilities/general.utilites";
import { privateInstance } from "./instance";
import { BlogApiType } from "@/types/api/blogs.types";

const blogApi: BlogApiType = {
  createBlog: async (payload) => await privateInstance.post("/blogs", payload),

  fetchBlogs: async ({ ...queryParams }) => {
    const params = new URLSearchParams(queryParams as any);
    filterAndSetParams({ params, queryParams });
    return await privateInstance.get(`/blogs?${params.toString()}`);
  },

  fetchBlogById: async (id) => await privateInstance.get(`/blogs/${id}`),

  updateBlog: async ({ id, payload }) =>
    await privateInstance.patch(`/blogs/${id}`, payload),

  deleteBlog: async (id) => await privateInstance.delete(`/blogs/${id}`),
};

export default blogApi;
