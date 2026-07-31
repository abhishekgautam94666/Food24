import express from "express";

import isAuth from "../middlewares/isAuth.js";
import { getOwnerOrder, getUserOrders, placeOrder } from "../controllers/order.controllers.js";




const orderRouter = express.Router();
orderRouter.post("/place-order", isAuth, placeOrder);
orderRouter.get("/user-orders", isAuth, getUserOrders);
orderRouter.get("/owner-orders", isAuth, getOwnerOrder);

export default orderRouter;

