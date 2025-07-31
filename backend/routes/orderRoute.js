import express from "express";
import {
  updateOrderStatus,
  placeOrder,
  placeOrderRazorpay,
  placeOrderStripe,
  allOrders,
  userOrders,
  verifyStripe,
} from "../controllers/orderController.js";
import adminAuth from "../middleware/adminAuth.js";
import authUser from "../middleware/auth.js";

const orderRouter = express.Router();

//Admin features
orderRouter.post("/list", adminAuth, allOrders);
orderRouter.post("/status",adminAuth, updateOrderStatus);


//Payment features
orderRouter.post("/place",authUser, placeOrder);
orderRouter.post("/razorpay", authUser, placeOrderRazorpay);
orderRouter.post("/stripe",authUser,placeOrderStripe);

//user features
orderRouter.post("/userorders",authUser,userOrders);

//verify Payment
orderRouter.post("/verifyStripe", authUser,verifyStripe )
export default orderRouter;