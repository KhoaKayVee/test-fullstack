const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Order = require("./models/Order");
require("dotenv").config();

const app = express();

// Cấu hình CORS cho phép từ origin của frontend
app.use(
  cors({
    origin: "http://localhost:3000", // Thay thế bằng origin của frontend của bạn
  })
);

app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });

app.post("/api/orders", async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get("/api/orders", async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
