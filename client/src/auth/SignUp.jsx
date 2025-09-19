import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "../../utils/validation(zod)";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(signUpSchema),
    mode: "onTouched",
  });

  const onSubmit = async (data) => {
    await new Promise((r) => setTimeout(r, 700));
    console.log("Form Data:", data);
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen overflow-hidden bg-gray-100">
      <div className="hidden lg:block lg:w-1/2">
        <img
          src="/auth-bg.svg"
          alt="auth background"
          className="w-full h-full object-cover rounded-tr-[7rem]"
        />
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 mt-[4rem] md:mt-[0rem]">
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
                className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 opacity-70"
                aria-hidden
              />
              <input
                type="text"
                placeholder="Full Name"
                {...register("fullName")}
                aria-invalid={errors.fullName ? "true" : "false"}
                className={`w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 ${
                  errors.fullName ? "border-red-300" : "border-gray-200"
                }`}
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            <div className="relative">
              <img
                src="/envelope.svg"
                alt=""
                className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 opacity-70"
                aria-hidden
              />
              <input
                type="email"
                placeholder="Email Address"
                {...register("email")}
                aria-invalid={errors.email ? "true" : "false"}
                className={`w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 ${
                  errors.email ? "border-red-300" : "border-gray-200"
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
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
                className={`w-full pr-10 pl-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 ${
                  errors.password ? "border-red-300" : "border-gray-200"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                <img
                  src="/hide-password.svg"
                  alt=""
                  className="w-5 h-5 opacity-70"
                />
              </button>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
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
                className={`w-full pr-10 pl-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 ${
                  errors.confirmPassword ? "border-red-300" : "border-gray-200"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirm((s) => !s)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1"
                aria-label={
                  showConfirm
                    ? "Hide confirm password"
                    : "Show confirm password"
                }
              >
                <img
                  src="/hide-password.svg"
                  alt=""
                  className="w-5 h-5 opacity-70"
                />
              </button>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
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

            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => console.log("Google signin")}
                className="flex items-center justify-center border rounded-md px-3 py-2"
              >
                <img
                  src="/google-icon.svg"
                  alt="Google"
                  className="w-5 h-5 mr-2"
                />
                <span className="sr-only">Continue with Google</span>
              </button>

              <button
                type="button"
                onClick={() => console.log("Facebook signin")}
                className="flex items-center justify-center border rounded-md px-3 py-2"
              >
                <img
                  src="/facebook-icon.svg"
                  alt="Facebook"
                  className="w-5 h-5 mr-2"
                />
                <span className="sr-only">Continue with Facebook</span>
              </button>

              <button
                type="button"
                onClick={() => console.log("Apple signin")}
                className="flex items-center justify-center border rounded-md px-3 py-2"
              >
                <img
                  src="/apple-icon.svg"
                  alt="Apple"
                  className="w-5 h-5 mr-2"
                />
                <span className="sr-only">Continue with Apple</span>
              </button>
            </div>

            <div className="text-center text-sm text-gray-500 mt-4">
              Already have an account?{" "}
              <a href="/signin" className="text-red-500 font-medium">
                Sign in
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
