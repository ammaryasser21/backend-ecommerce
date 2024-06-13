require("dotenv").config();
const bodyParser = require("body-parser");
const express = require("express");
const path = require("path");
const cors = require('cors');
const app = express();
const mongoose = require("mongoose");
const { error } = require("console");
const httpStatusText = require("./utils/httpStatusText.js");

// app.use(cors);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const url = process.env.MONGO_URL;
      
mongoose
  .connect(url)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error) => {
    console.log(error);
  });

const productsRouter = require("./routes/products.route.js");
const usersRouter = require("./routes/users.route.js");
const orderRouter = require('./routes/order.route.js');

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/products", productsRouter);
app.use("/api/users", usersRouter);
app.use("/api/makeorder", orderRouter);

// Global middleware for not found router
app.all("*", (req, res, next) => {
  return res.status(404).json({ status: httpStatusText.ERROR, message: "This resource is not available" });
});

// Global error handler
app.use((error, req, res, next) => {
  res.status(error.statusCode || 500).json({ status: error.statusText || httpStatusText.ERROR, message: error.message, code: error.statusCode || 500, data: null });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
  