import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import gentoken from "../utils/token.js";
import { sendOtpMail } from "../utils/mail.js";
export const signUp = async (req, res) => {
  try {
    const { fullName, email, password, mobile, role } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User Already exits." });
    }
    if (password.length < 6) {
      return res
        .status(400)

        .json({ message: "password must be at least 6 character." });
    }
    if (mobile.length < 10) {
      return res
        .status(400)
        .json({ message: "mobile no must be at least 10 digits." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user = await User.create({
      fullName,
      email,
      role,
      mobile,
      password: hashedPassword,
    });

    // const token = await gentoken(user._id);
    // res.cookie("token", token, {
    //   secure: false,
    //   sameSite: "strict",
    //   maxAge: 7 * 24 * 60 * 60 * 1000,
    //   httpOnly: true,
    // });

    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json(`sign Up error :${error}`);
  }
};

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Enter Email" });
    }
    if (!password) {
      return res.status(400).json({ message: "Enter password" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "incorrect email" });
    }

    const isMatch = bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "incorrect Password" });
    }

    const token = await gentoken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000,

    });
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json(`sign In error ${error}`);
  }
};

export const signOut = async (req, res) => {
  try {

    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "strict",
      secure: false,

    });

    return res.status(200).json({ message: "logout success" });
  } catch (error) {
    return res.status(500).json({ message: "logout error" });
  }
};

export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.resetOtp = otp;
    user.otpExpires = Date.now() + 5 * 60 * 1000;
    user.isOtpVerified = false;
    await user.save();
    await sendOtpMail(user.email, otp);
    return res.status(200).json({ message: "otp sent successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error sending OTP" });
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    if (user.resetOtp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }
    if (user.isOtpVerified) {
      return res.json({ message: "OTP already verified" });
    }
    if (user.otpExpires < Date.now()) {
      return res.status(400).json({ message: "OTP expired" });
    }
    user.resetOtp = null;
    user.otpExpires = null;
    user.isOtpVerified = true;
    await user.save();
    return res.json({ message: "OTP verified successfully ✅" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `verify otp error` });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    const user = await User.findOne({ email });
    if (!user || !user.isOtpVerified) {
      return res.status(400).json({ message: "OTP verification required" });
    }

    const hashPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashPassword;
    user.isOtpVerified = false;
    await user.save();
    return res.status(200).json({ message: "Password reset successfully ✅" });
  } catch (error) {
    console.log(error);
    return res.status(500).json(`reset password error`);
  }
};
