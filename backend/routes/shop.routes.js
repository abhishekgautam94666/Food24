import express from "express";

import isAuth from "../middlewares/isAuth.js";

import getCurrentUser from "../controllers/user.controllers.js";
import { createEditShop, getShopByCity, getMYShop } from "../controllers/shop.controllers.js";
import { upload } from "../middlewares/multer.js";



const shopRouter = express.Router();
shopRouter.post("/create-edit", isAuth, upload.single("image"), createEditShop);
shopRouter.get("/get-my", isAuth, getMYShop)
shopRouter.get("/get-shop-by-city", getShopByCity);

export default shopRouter;

