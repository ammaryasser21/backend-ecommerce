const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  OrderItems: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "OrderItem",
      required: true,
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  totalprice: {
    type: Number,
    require: true,
  },
  dateorder: {
    type: Date,
    default: Date.now,
  },
});
module.exports.Order = mongoose.model("Order", orderSchema);
