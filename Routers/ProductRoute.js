const express = require("express");
const router = express.Router();
const ProductController = require("../Controllers/ProductController");

router.post("/product",  ProductController.addProduct);
router.get("/product", ProductController.getAllProduct);
router.get("/product/:product_id", ProductController.getProductById);
router.put("/product/:product_id", ProductController.updateProduct);
router.patch("/product/:product_id/:status", ProductController.updateProductStatus);
router.delete("/product/:product_id", ProductController.deleteProduct);

module.exports = router;
