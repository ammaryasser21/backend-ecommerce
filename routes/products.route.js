
const express = require("express");
const { body } = require("express-validator");
const {
  getAllProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  getProduct,
} = require("../controllers/product.controller");
const { validationSchema } = require("../middleware/validationSchema");
const verifyToken = require("../middleware/verifyToken");
const userRoles = require("../utils/usersRoles");
const allowedTo = require("../middleware/allowedTo");

const router = express.Router();

// get all Products
router
  .route("/")
  .get(getAllProducts)
  .post(
    verifyToken,
    validationSchema(),
    allowedTo(userRoles.ADMIN, userRoles.MANAGER),
    addProduct
  );


  
// get single Product
router
  .route("/:id")
  .get(getProduct)
  .patch(updateProduct)
  .delete(
    verifyToken,
    allowedTo(userRoles.ADMIN, userRoles.MANAGER), // authorization method <==
    deleteProduct
  );
  // Add Product
  router.post(
    "/",
    verifyToken,
    validationSchema(),
    allowedTo(userRoles.ADMIN, userRoles.MANAGER),
    addProduct
  );
  router.get("/:id", getProduct);

  // Update Product
  router.patch("/:id", verifyToken, allowedTo(userRoles.ADMIN, userRoles.MANAGER), updateProduct);
  
  // Delete Product
  router.delete("/:id", verifyToken, allowedTo(userRoles.ADMIN, userRoles.MANAGER), deleteProduct);
module.exports = router;
