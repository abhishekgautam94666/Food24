import express from "express";

import isAuth from "../middlewares/isAuth.js";
import { getOwnerOrder, getUserOrders, placeOrder, updateOrderStatus } from "../controllers/order.controllers.js";




const orderRouter = express.Router();
orderRouter.post("/place-order", isAuth, placeOrder);
orderRouter.get("/user-orders", isAuth, getUserOrders);
orderRouter.get("/owner-orders", isAuth, getOwnerOrder);
orderRouter.post("/update-status/:orderId/:shopId", isAuth, updateOrderStatus);

export default orderRouter;

