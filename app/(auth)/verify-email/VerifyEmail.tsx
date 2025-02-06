"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import OTPInput from "react-otp-input";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import authApi from "@/axios/auth.api";
import { setAuth } from "@/redux/features/auth.slice";

export default function VerifyEmailPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const emailFromUrl = searchParams.get("email");

  const [email, setEmail] = useState(emailFromUrl || ""); // Default empty string if email is undefined
  const [otp, setOtp] = useState("");
  const [resendDisabled, setResendDisabled] = useState(false);
  const [resendTimer, setResendTimer] = useState(60);

  useEffect(() => {
    if (emailFromUrl) {
      setEmail(emailFromUrl);
    } else {
      toast.error("No email provided for verification. Please sign up again.");
      router.push("/signup");
    }
  }, [emailFromUrl, router]);

  const { mutate: verifyEmail, isPending: verifying } = useMutation({
    mutationFn: () => authApi.verifyEmail({ email, verificationCode: otp }),
    onSuccess: () => {
      toast.success("Email verified! Logging you in...");
      login({ email, password: "user_password" }); // Replace with stored password logic
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Verification failed.");
    },
  });

  const { mutate: login, isPending: loggingIn } = useMutation({
    mutationFn: (loginData: { email: string; password: string }) =>
      authApi.login(loginData), // Ensure the mutation accepts { email, password }
    onSuccess: (response) => {
      if (!response?.data?.data) {
        toast.error("Invalid response from server");
        return;
      }

      const { user, token } = response.data.data;

      // Save auth info
      dispatch(setAuth({ user, token }));
      Cookies.set("auth", JSON.stringify({ user, token }), { secure: true });

      toast.success("Login successful!");
      router.push("/blog");
    },
    onError: () => {
      toast.error("Login failed. Please log in manually.");
      router.push("/login");
    },
  });

  const { mutate: resendOtp, isPending: resending } = useMutation({
    mutationFn: () => authApi.resendOtp({ email }),
    onSuccess: () => {
      toast.success("New OTP sent!");
      setResendDisabled(true);
      startResendTimer();
    },
    onError: () => {
      toast.error("Failed to resend OTP.");
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    verifyEmail();
  };

  const startResendTimer = () => {
    setResendTimer(60);
    setResendDisabled(true);
    const interval = setInterval(() => {
      setResendTimer((time) => {
        if (time <= 1) {
          clearInterval(interval);
          setResendDisabled(false);
          return 0;
        }
        return time - 1;
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Verify Email
        </h2>
        <p className="text-sm text-center text-gray-600">
          Enter the code sent to {email || "your email"}
        </p>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <OTPInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            inputStyle="w-10 h-10 text-lg border rounded-md text-center gap-2"
            renderInput={(props) => <input {...props} />}
          />

          <button
            type="submit"
            disabled={verifying || loggingIn}
            className="w-full bg-blue-500 text-white py-2 rounded-lg"
          >
            {verifying
              ? "Verifying..."
              : loggingIn
              ? "Logging in..."
              : "Verify Email"}
          </button>
        </form>

        <button
          onClick={() => resendOtp()}
          disabled={resendDisabled || resending}
          className="w-full mt-2 text-blue-600"
        >
          {resending
            ? "Resending..."
            : resendDisabled
            ? `Resend in ${resendTimer}s`
            : "Resend Code"}
        </button>
      </div>
    </div>
  );
}
