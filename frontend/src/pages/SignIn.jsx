import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";
import { setMYShopData } from "../redux/ownerSlice";
import toast from "react-hot-toast";


export const SignIn = () => {
  const bgColor = "#fff9f6";
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch()

  const handleSignIn = async (e) => {
    e.preventDefault();

    // if (!email.trim()) {
    //   toast.error('Please enter your email');
    //   return;
    // }
    // if (!password) {
    //   toast.error("Please enter your password")
    // }

    try {
      setLoading(true);

      const result = await axios.post(
        `${serverUrl}/api/auth/signin`,
        {
          email: email.trim(),
          password,
        },
        { withCredentials: true },
      );

      dispatch(setUserData(result.data))
      dispatch(setMYShopData(null));
      toast.success("Signed in successfully");

      setEmail("");
      setPassword("");

      setTimeout(() => {
        navigate("/");
      }, 800);


    } catch (error) {
      console.error("Sign in error:", error);

      toast.error(
        error?.response?.data?.message || "Unable to sign in. Please try again."
      )
    } finally {
      setLoading(false)
    }
  };

  return (
    <div
      className="min-h-screen  flex items-center justify-center  px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: bgColor }}
    >
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 sm:p-8">
        {/* Heading */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-orange-500">Food24</h1>
          <p className="text-gray-500 text-sm mt-2">
            sign In to your account to get started with delicious food
            deliveries
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSignIn}>
          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              autoComplete="email"
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm
          focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400
          transition duration-200"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              disabled={loading}
            />
          </div>

          {/* password*/}
          <div className="relative">
            <label className="block text-gray-700 font-medium mb-1">
              Password
            </label>

            <input
              type={show ? "text" : "password"}
              autoComplete="current-password"
              placeholder="Enter your password"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 pr-10 text-sm
    focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400
    transition duration-200"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              disabled={loading}
            />

            <button
              type="button"
              className="absolute right-3 bottom-2.5 text-gray-500 cursor-pointer"
              onClick={() => setShow((prev) => !prev)}
              disabled={loading}
            >
              {show ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>
          <div
            className="text-right mb-4 text-orange-500 cursor-pointer"
            onClick={() => navigate("/forgot-password")}
          >
            Forget Password
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full text-white font-semibold py-2.5 rounded-lg
            transition duration-300 shadow-md
            ${loading
                ? "bg-orange-300 cursor-not-allowed"
                : "bg-orange-500 hover:bg-orange-600 cursor-pointer hover:shadow-lg"
              }`}

          >
            {loading ? "Signing In..." : "Sign In"}
          </button>

        </form>

        <button className="w-full mt-4 flex items-center justify-center gap-2 border py-2.5 rounded-lg">
          <FcGoogle />
          <span> Sign In with google</span>
        </button>

        {/* Login Link */}
        <p
          className="text-center text-sm text-gray-500 mt-6"
          onClick={() => navigate("/signup")}
        >
          want to create a new account?{" "}
          <span className="text-orange-500 hover:underline cursor-pointer">
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};
