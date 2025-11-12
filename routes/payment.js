const express = require("express");
const Razorpay = require("razorpay");
const dotenv = require("dotenv");

dotenv.config();
const router = express.Router();

// initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

// create order API
router.post("/create-order", async (req, res) => {
  try {
    const options = {
      amount: req.body.amount * 100, // amount in paise
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    };
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating order");
  }
});

module.exports=router;
