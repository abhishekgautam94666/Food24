import express from "express";

import isAuth from "../middlewares/isAuth.js";
import { acceptOrder, getDeliveryBoyAssignment, getOwnerOrder, getUserOrders, placeOrder, updateOrderStatus } from "../controllers/order.controllers.js";




const orderRouter = express.Router();
orderRouter.post("/place-order", isAuth, placeOrder);
orderRouter.get("/user-orders", isAuth, getUserOrders);
orderRouter.get("/owner-orders", isAuth, getOwnerOrder);
orderRouter.get("/get-assignments", isAuth, getDeliveryBoyAssignment);
orderRouter.post("/update-status/:orderId/:shopId", isAuth, updateOrderStatus);
orderRouter.get("/accept-order/:assignmentId", isAuth, acceptOrder);

export default orderRouter;

