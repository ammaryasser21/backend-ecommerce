const asyncWrapper = require("../middleware/asyncWrapper");
const Order = require("../models/order.model");
const OrderItem = require("../models/order-item.model");
const appError = require("../utils/appError");
const httpStatusText = require("../utils/httpStatusText.js");

// Create Order
const createOrder = asyncWrapper(async (req, res, next) => {
  const { OrderItems, user, totalprice } = req.body;

  try {
    // Create order items
    const createdOrderItems = await OrderItem.insertMany(OrderItems);
    
    // Extract IDs of created order items
    const orderItemsIds = createdOrderItems.map(orderItem => orderItem._id);

    // Create order
    const order = new Order({
      OrderItems: orderItemsIds,
      user,
      totalprice
    });

    // Save order to database
    const createdOrder = await order.save();

    // Respond with created order
    res.status(201).json({ status: httpStatusText.SUCCESS, data: { order: createdOrder } });
  } catch (error) {
    // Handle errors
    console.error(error);
    const errorMessage = "Failed to create order";
    const status = 500; // Internal Server Error
    const appErr = appError.create(errorMessage, status, httpStatusText.ERROR);
    next(appErr);
  }
});

// Get All Orders
const getAllOrders = asyncWrapper(async (req, res, next) => {
  try {
    // Fetch all orders
    const orders = await Order.find().populate('OrderItems');

    // Respond with orders
    res.json({ status: httpStatusText.SUCCESS, data: { orders } });
  } catch (error) {
    // Handle errors
    console.error(error);
    const errorMessage = "Failed to fetch orders";
    const status = 500; // Internal Server Error
    const appErr = appError.create(errorMessage, status, httpStatusText.ERROR);
    next(appErr);
  }
});

// Other order controller functions can be added as needed

module.exports = {
  createOrder,
  getAllOrders
};
