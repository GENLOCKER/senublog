"use client";

import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { setAuth } from "@/redux/features/auth.slice";
import authApi from "@/axios/auth.api";

// Validation Schema
const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  rememberMe: Yup.boolean().optional(),
});

export default function LoginForm() {
  const router = useRouter();
  const dispatch = useDispatch();

  const { mutate: login, isPending } = useMutation({
    mutationFn: (credentials: { email: string; password: string }) =>
      authApi.login(credentials),
    onSuccess: (response) => {
      if (!response?.data?.data) {
        toast.error("Invalid response from server");
        return;
      }

      const { user, token } = response.data.data;
      const rememberMe = formik.values.rememberMe;

      // Dispatch to Redux with rememberMe
      dispatch(setAuth({ user, token, rememberMe }));

      // Set cookie with accessToken
      try {
        Cookies.set(
          "auth",
          JSON.stringify({
            accessToken: token,
            user,
          }),
          {
            secure: process.env.NODE_ENV === "production",
            expires: rememberMe ? 14 : undefined,
          }
        );
      } catch (error) {
        console.error("Cookie storage failed:", error);
        toast.error("Failed to save login session");
        return;
      }

      toast.success(`Welcome back, ${user.firstName}!`);
      setTimeout(() => {
        router.push("/blog");
        router.refresh();
      }, 100);
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || "Login failed. Please try again."
      );
      console.error("Login Error:", error);
    },
  });

  // Formik setup
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      login({
        email: values.email.trim(),
        password: values.password.trim(),
      });
    },
  });

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>

      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`
              mt-1 block w-full px-3 py-2 
              border rounded-md shadow-sm 
              ${
                formik.touched.email && formik.errors.email
                  ? "border-red-500"
                  : "border-gray-300"
              }
            `}
            placeholder="Enter your email"
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-red-500 text-xs mt-1">{formik.errors.email}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`
              mt-1 block w-full px-3 py-2 
              border rounded-md shadow-sm 
              ${
                formik.touched.password && formik.errors.password
                  ? "border-red-500"
                  : "border-gray-300"
              }
            `}
            placeholder="Enter your password"
          />
          {formik.touched.password && formik.errors.password && (
            <p className="text-red-500 text-xs mt-1">
              {formik.errors.password}
            </p>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="rememberMe"
              name="rememberMe"
              checked={formik.values.rememberMe}
              onChange={formik.handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label
              htmlFor="rememberMe"
              className="ml-2 block text-sm text-gray-900"
            >
              Remember me
            </label>
          </div>

          <div className="text-sm">
            <a
              href="/forgot-password"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Forgot password?
            </a>
          </div>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className={`
            w-full py-2 px-4 
            border border-transparent 
            rounded-md shadow-sm 
            text-white 
            bg-blue-600 
            hover:bg-blue-700 
            focus:outline-none 
            focus:ring-2 
            focus:ring-offset-2 
            focus:ring-blue-500
            ${isPending ? "opacity-50 cursor-not-allowed" : ""}
          `}
        >
          {isPending ? "Signing In..." : "Sign In"}
        </button>
      </form>

      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          Don&apos;t have an account?
          <a
            href="/signup"
            className="font-medium text-blue-600 hover:text-blue-500 ml-1"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
