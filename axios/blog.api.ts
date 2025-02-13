/** @format */

import { filterAndSetParams } from "@/helpers/utilities/general.utilites";
import { privateInstance } from "./instance";
import { BlogApiType } from "@/types/api/blogs.types";
import { FetchBlogType } from "@/types/components/blogs.types";

const blogApi: BlogApiType = {
  createBlog: async (payload) => await privateInstance.post("/blogs", payload),

  // fetchBlogs: async ({ ...queryParams }) => {
  //   const params = new URLSearchParams(queryParams);
  //   filterAndSetParams({ params, queryParams });
  //   return await privateInstance.get(`/blogs?${params.toString()}`);
  // },
  fetchBlogs: async (queryParams: FetchBlogType) => {
    const params = new URLSearchParams();

    // Preprocess queryParams to convert all values to strings
    const processedParams: Record<string, string> = Object.fromEntries(
      Object.entries(queryParams).map(([key, value]) => [
        key,
        value != null ? String(value) : "",
      ])
    );

    // Use filterAndSetParams to set valid parameters
    filterAndSetParams({ params, queryParams: processedParams });

    return await privateInstance.get(`/blogs?${params.toString()}`);
  },

  fetchBlogById: async (id) => await privateInstance.get(`/blogs/${id}`),

  updateBlog: async ({ id, payload }) =>
    await privateInstance.patch(`/blogs/${id}`, payload),

  deleteBlog: async (id) => await privateInstance.delete(`/blogs/${id}`),
};

export default blogApi;
