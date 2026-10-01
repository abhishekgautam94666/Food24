import express from "express";

import isAuth from "../middlewares/isAuth.js";
import { acceptOrder, getCurrentOrder, getDeliveryBoyAssignment, getOrderById, getOwnerOrder, getUserOrders, placeOrder, sendDeliveryOtp, updateOrderStatus, verifyDeliveryOtp, verifyPayment } from "../controllers/order.controllers.js";




const orderRouter = express.Router();
orderRouter.post("/place-order", isAuth, placeOrder);
orderRouter.get("/user-orders", isAuth, getUserOrders);
orderRouter.get("/owner-orders", isAuth, getOwnerOrder);
orderRouter.get("/get-assignments", isAuth, getDeliveryBoyAssignment);
orderRouter.post("/update-status/:orderId/:shopId", isAuth, updateOrderStatus);
orderRouter.get("/accept-order/:assignmentId", isAuth, acceptOrder);
orderRouter.get("/get-current-order", isAuth, getCurrentOrder);
orderRouter.get("/get-order-by-id/:orderId", isAuth, getOrderById);
orderRouter.get("/get-order-by-id/:orderId", isAuth, getOrderById);
orderRouter.post("/send-delivery-otp", isAuth, sendDeliveryOtp);
orderRouter.post("/verify-otp", isAuth, verifyDeliveryOtp);
orderRouter.post("/verify-payment", isAuth, verifyPayment);

export default orderRouter;

