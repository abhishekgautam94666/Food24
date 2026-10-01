import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";
import toast from "react-hot-toast";


export const SignUp = () => {
  const primaryColor = "#ff4d2d";
  const hoverColor = "#e64323";
  const bgColor = "#fff9f6";
  const borderColor = "#ddd";
  const [show, setShow] = useState(true);
  const [role, setRole] = useState("user");
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [loding, setLoding] = useState(false);
  const [err, setErr] = useState("");
  const dispatch = useDispatch()

  const handleSignUp = async (e) => {
    e.preventDefault();

    const cleanFullName = fullName.trim();
    const cleanEmail = email.trim().toLowerCase();
    const cleanMobile = mobile.trim();

    // Full Name validation
    if (!cleanFullName) {
      toast.error("Please enter your full name");
      return;
    }

    if (cleanFullName.length < 3) {
      toast.error("Name must be at least 3 characters");
      return;
    }

    // Email validation
    if (!cleanEmail) {
      toast.error("Please enter your email");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(cleanEmail)) {
      toast.error("Please enter a valid email address");
      return;
    }

    // Mobile validation
    if (!cleanMobile) {
      toast.error("Please enter your mobile number");
      return;
    }

    const mobileRegex = /^[6-9]\d{9}$/;

    if (!mobileRegex.test(cleanMobile)) {
      toast.error("Please enter a valid 10-digit mobile number");
      return;
    }

    if (!password) {
      toast.error("Please enter your password");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    // Role validation
    if (!role) {
      toast.error("Please select a role");
      return;
    }


    try {
      setLoding(true)
      const result = await axios.post(
        `${serverUrl}/api/auth/signup`,
        {
          fullName,
          email,
          password,
          role,
          mobile,
        },
        { withCredentials: true },
      );
      dispatch(setUserData(result.data))
      toast.success("Account created successfully");
      // Clear form
      setFullName("");
      setEmail("");
      setPassword("");
      setMobile("");
      setRole("user");

      //Navigate to signin
      setTimeout(() => {
        navigate("/signin");
      }, 800)



    } catch (error) {
      console.log("error :", error.response?.data);
      toast.error(
        error?.response?.data?.message || "Unable to create account. Please try again."
      )
    } finally {
      setLoding(false);
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
            Create your account to get started with delicious food deliveries
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSignUp}>
          {/* Full Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Full Name
            </label>
            <input
              type="text"
              autoComplete="name"
              placeholder="Enter your Full Name"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm
          focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400
          transition duration-200"
              onChange={(e) => setFullName(e.target.value)}
              value={fullName}
              disabled={loding}
            />
          </div>
          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              autoComplete="email"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm
          focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400
          transition duration-200"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              disabled={loding}
            />
          </div>
          {/* Mobile */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Mobile Number
            </label>
            <input
              type="tel"
              autoComplete="tel"
              placeholder="Enter your mobile number"
              inputMode="numeric"
              maxLength={10}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm
          focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400
          transition duration-200"
              onChange={(e) => setMobile(e.target.value)}
              value={mobile}
              disabled={loding}
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
              autoComplete="new-password"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 pr-10 text-sm
    focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400
    transition duration-200"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              disabled={loding}
            />

            <button
              type="button"
              className="absolute right-3 bottom-2.5 text-gray-500 cursor-pointer"
              onClick={() => setShow((prev) => !prev)}
            >
              {show ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>
          {/* role*/}
          <div className="">
            <label
              htmlFor="role"
              className="block text-gray-700 font-medium mb-1"
            >
              Role
            </label>
            <div className="flex gap-2">
              {["user", "owner", "deliveryBoy"].map((r) => (
                <button
                  key={r}
                  type="button"
                  disabled={loding}
                  onClick={() => setRole(r)}
                  className={`outline-1 flex-1 rounded-md px-3 py-2 text-center font-medium transition-all duration-200 ${role === r ? "bg-orange-500 text-white border-orange-50:b" : "bg-white text-gray-700 border-gray-300 hover:bg-orange-50"} ${loding ? "cursor-not-allowed opacity-60"
                    : "cursor-pointer"}`}
                >
                  {r === "deliveryBoy" ? "Delivery Boy" : r}
                </button>
              ))}
            </div>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loding}
            className={`w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2.5 rounded-lg transition duration-300 shadow-md hover:shadow-lg ${loding
              ? "bg-orange-300 cursor-not-allowed"
              : "bg-orange-500 hover:bg-orange-600 cursor-pointer hover:shadow-lg"}`}
          >
            {loding ? "Creating Account..." : "sign Up"}
          </button>
        </form>
        <button
          type="button"
          disabled={loding}
          className="w-full mt-4 flex items-center justify-center gap-2 border py-2.5 rounded-lg"
          onClick={() => {
            window.location.href = `${serverUrl}/api/auth/google`;
          }}
        >
          <FcGoogle />
          <span>Sign in with Google</span>
        </button>

        {/* Login Link */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <span
            className="text-orange-500 hover:underline cursor-pointer"
            onClick={() => navigate("/signin")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};
