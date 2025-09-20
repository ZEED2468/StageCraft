import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../../utils/validation(zod)";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [position, setPosition] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
    mode: "onTouched",
  });

  const passwordValue = watch("password");
  const confirmValue = watch("confirmPassword");

  const onSubmit = async (data) => {
    await new Promise((r) => setTimeout(r, 700));
    console.log("Form Data:", data);
  };

  const styleHandler = () => {
    setShowConfirm((s) => !s);
    setPosition(true);
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
          <div className="mb-4 flex items-center gap-3">
            <a href="/" className="text-gray-500">
              ‹
            </a>
            <div className="text-center w-full">
              <h1 className="text-xl font-semibold">Sign Up</h1>
              <p className="text-sm text-gray-500">
                Get premium Tickets at a go
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="relative">
              <img
                src="/contact.svg"
                alt=""
                className={`w-4 h-4 absolute left-3 -translate-y-1/2 opacity-70 ${
                  position ? "top-[35%]" : "top-[51%]"
                }`}
              />
              <input
                type="text"
                placeholder="Full Name"
                {...register("fullName")}
                aria-invalid={errors.fullName ? "true" : "false"}
                className={`w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 ${
                  errors.fullName ? "border-red-500" : "border-gray-200"
                }`}
              />
              {errors.fullName && (
                <p className="text-[#E50914] text-sm mt-1">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            <div className="relative">
              <img
                src="/envelope.svg"
                alt=""
                className={`w-4 h-4 absolute left-3 -translate-y-1/2 opacity-70 ${
                  position ? "top-[35%]" : "top-[51%]"
                }`}
              />
              <input
                type="email"
                placeholder="Email Address"
                {...register("email")}
                aria-invalid={errors.email ? "true" : "false"}
                className={`w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 ${
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
              {passwordValue && (
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className={`absolute right-3 -translate-y-1/2 flex items-center justify-center ${
                    position ? "top-[38%]" : "top-[38%]"
                  }`}
                >
                  <img
                    src="/hide-password.svg"
                    alt=""
                    className="w-5 h-5 opacity-70 pointer-events-none"
                  />
                </button>
              )}
              {errors.password && (
                <p className="text-[#E50914] text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                placeholder="Confirm Password"
                {...register("confirmPassword")}
                aria-invalid={errors.confirmPassword ? "true" : "false"}
                className={`w-full pr-12 pl-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 ${
                  errors.confirmPassword ? "border-red-500" : "border-gray-200"
                }`}
              />
              {confirmValue && (
                <button
                  type="button"
                  onClick={styleHandler}
                  className={`absolute right-3 -translate-y-1/2 flex items-center justify-center ${
                    position ? "top-[38%]" : "top-[38%]"
                  }`}
                >
                  <img
                    src="/hide-password.svg"
                    alt=""
                    className="w-5 h-5 opacity-70 pointer-events-none"
                  />
                </button>
              )}
              {errors.confirmPassword && (
                <p className="text-[#E50914] text-sm mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2 rounded-md text-white bg-red-500 hover:bg-red-600 disabled:opacity-60 transition"
            >
              {isSubmitting ? "Creating..." : "Create Account"}
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
              Already have an account?{" "}
              <a href="/login" className="text-[#E50914] font-medium">
                Sign in
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
