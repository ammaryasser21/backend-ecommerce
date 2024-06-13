
const { body, validationResult } = require("express-validator");
const Product = require("../models/product.model");
const httpStatusText = require("../utils/httpStatusText");
const asyncWrapper = require("../middleware/asyncWrapper");
const appError = require("../utils/appError")


// Get all Products
const getAllProducts = asyncWrapper(
  async (req, res) => {
    const query = req.query;
    console.log("query :", query)

    const limit = query.limit || 10;
    const page = query.page || 1;
    const skip = (page - 1) * limit

    // Get all Products from DB using Product Model
    const Products = await Product.find({}, {}).limit(limit).skip(skip);
    res.json({ status: httpStatusText.SUCCESS, data: { Products } })

  }
)

// Add Product
const addProduct = asyncWrapper(
  async (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = appError.create(errors.array(), 400, httpStatusText.FAIL)

      return next(error);
    }

    const newProduct = new Product(req.body);

    newProduct.save().then(() => console.log("Done"))

    res.status(201).json({ status: httpStatusText.SUCCESS, data: { Product: newProduct } })

  }
)

// get Product
const getProduct = asyncWrapper(
  async (req, res, next) => {
    const Product = await Product.findById(req.params.id)

    if (!Product) {
      const error = appError.create("Product not found", 404, httpStatusText.FAIL);

      return next(error);
      // return res.status(404).json({ status: httpStatusText.FAIL, data: { Product: "Product not found" } })
    }
    res.status(200).json({ status: httpStatusText.SUCCESS, data: { Product } })
  }
)

// Delete Product
const deleteProduct = asyncWrapper(
  async (req, res) => {
    await Product.deleteOne({ _id: req.params.id })
    res.json({ status: httpStatusText.SUCCESS, data: null })
  }
)

// Update Product
const updateProduct = asyncWrapper(
  async (req, res) => {
    const id = req.params.id;
    const updatedProduct = await Product.findByIdAndUpdate(id, { $set: { ...req.body } })
    return res.status(200).json({ status: httpStatusText.SUCCESS, data: { Product: updatedProduct } });
  }
)

module.exports = {
  getAllProducts,
  addProduct,
  getProduct,
  deleteProduct,
  updateProduct
}