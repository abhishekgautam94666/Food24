import React, { useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../App";
import axios from "axios";

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  /*send otp */
  const handleSendOtp = async () => {
    console.log(serverUrl);

    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/send-otp`,
        {
          email,
        },
        {
          withCredentials: true,
        },
      );
      console.log(result);
      setStep(2);
    } catch (error) {
      console.log(error.message);
    }
  };
  /*verify Otp */
  const handleVerifyOtp = async () => {
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/verify-otp`,
        {
          email,
          otp,
        },
        {
          withCredentials: true,
        },
      );
      console.log(result);
      setStep(3);
    } catch (error) {
      console.log(error);
    }
  };
  /*Reset password */
  const handleResetPassword = async () => {
    if (newPassword != confirmPassword) {
      return null;
    }
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/reset-password`,
        {
          email,
          otp,
          newPassword,
        },
        { withCredentials: true },
      );
      console.log(result);
      navigate("/signin");
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <div className="flex w-full items-center justify-center min-h-screen p-4 bg-orange-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-8">
        <div className="flex items-center gap-4 mb-4">
          <IoArrowBack
            size={30}
            className="text-orange-500 cursor-pointer"
            onClick={() => navigate("/signin")}
          />
          <h1 className="text-2xl font-bold text-center text-orange-500">
            Forgot Password
          </h1>
        </div>
        {step == 1 && (
          <div>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-1"
              >
                Email
              </label>
              <input
                type="email"
                className="w-full border-2 border-gray-200 rounded-lg px-3 py-2 focus:outline-none"
                placeholder="Enter your Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              ></input>
            </div>
            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2.5 rounded-lg transition duration-300 shadow-md hover:shadow-lg cursor-pointer"
              onClick={handleSendOtp}
            >
              Send otp
            </button>
          </div>
        )}{" "}
        {step == 2 && (
          <div>
            <div className="mb-6">
              <label
                htmlFor="otp"
                className="block text-gray-700 font-medium mb-1"
              >
                OTP
              </label>
              <input
                type="text"
                className="w-full border-2 border-gray-200 rounded-lg px-3 py-2 focus:outline-none"
                placeholder="Enter otp"
                onChange={(e) => setOtp(e.target.value)}
                value={otp}
              ></input>
            </div>
            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2.5 rounded-lg transition duration-300 shadow-md hover:shadow-lg cursor-pointer"
              onClick={handleVerifyOtp}
            >
              Varify
            </button>
          </div>
        )}
        {step == 3 && (
          <div>
            <div className="mb-6">
              {/* New password */}
              <label
                htmlFor="newPassword"
                className="block text-gray-700 font-medium mb-1"
              >
                New Password
              </label>
              <input
                type="text"
                className="w-full border-2 border-gray-200 rounded-lg px-3 py-2 focus:outline-none"
                placeholder="Enter New Password"
                onChange={(e) => setNewPassword(e.target.value)}
                value={newPassword}
              ></input>
            </div>
            {/*confirm Password */}
            <div className="mb-6">
              <label
                htmlFor="confirmPassword"
                className="block text-gray-700 font-medium mb-1"
              >
                Confirm Password
              </label>
              <input
                type="text"
                className="w-full border-2 border-gray-200 rounded-lg px-3 py-2 focus:outline-none"
                placeholder="Enter Confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
              ></input>
            </div>
            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2.5 rounded-lg transition duration-300 shadow-md hover:shadow-lg cursor-pointer"
              onClick={handleResetPassword}
            >
              Reset Password
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
