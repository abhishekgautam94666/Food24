import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      default: null,
    },
    mobile: {
      type: String,
      default: null,
    },
    googleId: {
      type: String,
    },
    role: {
      type: String,
      default: "user",
      enum: ["user", "owner", "deliveryBoy"],
    },
    resetOtp: {
      type: String,
    },
    isOtpVerified: {
      type: Boolean,
      default: false,
    },
    otpExpires: {
      type: Date,
    },
    location: {
      type: {
        type: String, enum: ['Point'], default: 'Point'
      },
      coordinates: { type: [Number], default: [0, 0] }
    }
  },
  { timestamps: true },
);

userSchema.index({ location: '2dsphere' })

const User = mongoose.model("User", userSchema);
export default User;
