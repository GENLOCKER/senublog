"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import blogApi from "@/axios/blog.api";
import { Blog } from "@/types/components/blogs.types";

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  snippet: Yup.string().required("Snippet is required"),
  body: Yup.string().required("Body is required"),
});

export default function EditBlogPage() {
  const router = useRouter();
  const params = useParams();
  const [initialBlog, setInitialBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: initialBlog?.title || "",
      snippet: initialBlog?.snippet || "",
      body: initialBlog?.body || "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await blogApi.updateBlog({
          id: params.id as string,
          payload: values,
        });
        toast.success("Blog updated successfully");
        router.push(`/blog/${params.id}`);
      } catch (error) {
        console.error("Failed to update blog:", error);
        toast.error("Failed to update blog");
      }
    },
  });

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await blogApi.fetchBlogById(params.id as string);
        setInitialBlog(response.data.data);
        formik.setValues({
          title: response.data.data.title,
          snippet: response.data.data.snippet,
          body: response.data.data.body,
        });
      } catch (error) {
        console.error("Failed to load blog:", error);
        toast.error("Failed to load blog");
        router.push("/blog");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [params.id, router, formik]);

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-40 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Edit Blog Post</h1>

      <form onSubmit={formik.handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            className={`w-full p-2 border rounded ${
              formik.errors.title ? "border-red-500" : "border-gray-300"
            }`}
          />
          {formik.errors.title && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.title}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Snippet</label>
          <textarea
            name="snippet"
            value={formik.values.snippet}
            onChange={formik.handleChange}
            className={`w-full p-2 border rounded ${
              formik.errors.snippet ? "border-red-500" : "border-gray-300"
            }`}
            rows={3}
          />
          {formik.errors.snippet && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.snippet}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Content</label>
          <textarea
            name="body"
            value={formik.values.body}
            onChange={formik.handleChange}
            className={`w-full p-2 border rounded ${
              formik.errors.body ? "border-red-500" : "border-gray-300"
            }`}
            rows={8}
          />
          {formik.errors.body && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.body}</p>
          )}
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Save Changes
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
