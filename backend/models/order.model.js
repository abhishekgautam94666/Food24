import mongoose from "mongoose"
import Item from "./item.model.js";

const shopOrderItemSchema = new mongoose.Schema({
    item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item"
    },
    name: String,
    price: Number,
    quantity: Number
})

const shopOrderSchema = new mongoose.Schema({
    shop: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shop",
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    status: {
        type: String,
        default: "pending",
        enum: [
            "pending",
            "confirmed",
            "preparing",
            "out of delivery",
            "delivered",
            "cancelled"
        ],
    },
    subtotal: {
        type: Number,
        required: true,
    },
    shopOrderItems: [shopOrderItemSchema],
    assignment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "DeliveryAssignment",
        default: null,
    },
    assignedDeliveryBoy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",

    },
    deliveryOtp: {
        type: String,
        default: null
    },
    isOtpVerified: {
        type: Boolean,
        default: false,
    },
    otpExpires: {
        type: Date,
        default: null
    },
    deliveredAt: {
        type: Date,
        default: null
    }
})

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    paymentMethod: {
        type: String,
        enum: ['cod', 'online'],
        required: true
    },
    deliveryAddress: {
        text: String,
        latitude: Number,
        longitude: Number
    },
    totalAmount: {
        type: Number
    },
    shopOrders: [shopOrderSchema],
    payment: {
        type: Boolean,
        default: false
    },
    razorpayOrderId: {
        type: String,
        default: ""
    },
    razorpayPaymentId: {
        type: String,
        default: ""
    }
}, { timestamps: true })

const Order = mongoose.model("Order", orderSchema);
export default Order;
