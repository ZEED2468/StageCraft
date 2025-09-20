import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../utils/validation(zod)";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
  });

  const onSubmit = async (data) => {
    await new Promise((r) => setTimeout(r, 700));
    console.log("Sign In Data:", data);
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen overflow-hidden bg-gray-100">
      <div className="hidden lg:block lg:w-1/2">
        <img
          src="/auth-bg.svg"
          alt="auth background"
          className="w-full h-full object-cover rounded-tr-[7rem] opacity-[75%]"
        />
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow">
          <h1 className="text-xl font-semibold text-center">Sign In</h1>
          <p className="text-sm text-gray-500 text-center mb-6">
            Give credentials to sign into your account
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="relative">
              <input
                type="email"
                placeholder="Email Address"
                {...register("email")}
                aria-invalid={errors.email ? "true" : "false"}
                className={`w-full pl-3 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 ${
                  errors.email ? "border-red-500" : "border-gray-200"
                }`}
              />
              {errors.email && (
                <p className="text-[#E50914] text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                {...register("password")}
                aria-invalid={errors.password ? "true" : "false"}
                className={`w-full pr-12 pl-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 ${
                  errors.password ? "border-red-500" : "border-gray-200"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center"
              >
                <img
                  src="/hide-password.svg"
                  alt=""
                  className="w-5 h-5 opacity-70 pointer-events-none"
                />
              </button>
              {errors.password && (
                <p className="text-[#E50914] text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-red-500" />
                Remember me
              </label>
              <a href="/forgot-password" className="text-[#E50914]">
                Forgot Password ?
              </a>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2 rounded-md text-white bg-gradient-to-r from-red-500 to-red-600 hover:opacity-90 disabled:opacity-60 transition"
            >
              {isSubmitting ? "loging In..." : "Sign In"}
            </button>

            <div className="flex items-center my-3">
              <div className="flex-grow h-px bg-gray-200"></div>
              <div className="px-3 text-sm text-gray-500">or continue with</div>
              <div className="flex-grow h-px bg-gray-200"></div>
            </div>

            <button
              type="button"
              className="flex items-center justify-center border rounded-md px-3 py-2 mx-auto w-full"
            >
              <img src="/google-icon.svg" alt="Google" className="w-5 h-5" />
              <span className="ml-5">Continue with Google</span>
            </button>

            <div className="text-center text-sm text-gray-500 mt-4">
              Don’t have an account?{" "}
              <a href="/register" className="text-[#E50914] font-medium">
                Sign Up
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
