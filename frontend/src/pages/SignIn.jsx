import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App";

export const SignIn = () => {
  const bgColor = "#fff9f6";
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/signin`,
        {
          email,
          password,
        },
        { withCredentials: true },
      );
      console.log(result);
      
    } catch (error) {
      console.log("error :", error.response?.data);
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

        <form className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm
          focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400
          transition duration-200"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>

          {/* password*/}
          <div className="relative">
            <label className="block text-gray-700 font-medium mb-1">
              Password
            </label>

            <input
              type={show ? "text" : "password"}
              placeholder="Enter your password"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 pr-10 text-sm
    focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400
    transition duration-200"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />

            <button
              type="button"
              className="absolute right-3 bottom-2.5 text-gray-500 cursor-pointer"
              onClick={() => setShow((prev) => !prev)}
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
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2.5 rounded-lg transition duration-300 shadow-md hover:shadow-lg"
            onClick={handleSignIn}
          >
            Sign In
          </button>

          <button className="w-full mt-4 flex items-center justify-center gap-2 border py-2.5 rounded-lg">
            <FcGoogle />
            <span> Sign Ip with google</span>
          </button>
        </form>

        {/* Login Link */}
        <p
          className="text-center text-sm text-gray-500 mt-6"
          onClick={() => navigate("/signup")}
        >
          want to create a new account?{" "}
          <span className="text-orange-500 hover:underline cursor-pointer">
            Login
          </span>
        </p>
      </div>
    </div>
  );
};
