import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // use STARTTLS (upgrade connection to TLS after connecting)
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});

export const sendOtpMail = async (to, otp) => {
  await transporter.sendMail({
    from:process.env.EMAIL,
    to,
    subject:"Reset your password",
    html:`
      <h2>Password Reset OTP</h2>
      <p>Your OTP is: <b>${otp}</b></p>
      <p>This OTP will expire in 5 minutes.</p>
    `
  })
};
