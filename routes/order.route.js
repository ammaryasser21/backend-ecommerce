const { Order } = require('../models/order.model');
const { OrderItems } = require('../models/order-items');
const express = require('express');
const router = express.Router();

router.post('/makeorder', async (req, res) => {
  try {
    const orderItems = req.body.OrderItems;

    // Create and save OrderItems
    const createdOrderItems = await OrderItem.insertMany(orderItems);

    // Extract the IDs of the created OrderItems
    const orderItemsIds = createdOrderItems.map(orderItem => orderItem._id);

    // Create and save the Order
    const order = new Order({
      OrderItems: orderItemsIds,
      user: req.body.user,
      totalprice: req.body.totalprice
    });

    const createdOrder = await order.save();
    if (!createdOrder) {
      return res.status(400).send('The order cannot be created!');
    }
    res.status(201).json(createdOrder);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

module.exports = router;
