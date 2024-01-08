const express = require("express");
const router = express.Router();
const OrderController = require("../Controllers/OrderController");

router.post("/order",  OrderController.addOrder);
router.get("/order", OrderController.getAllOrder);
router.get("/order/:order_id", OrderController.getOrderById);
router.put("/order/:order_id", OrderController.updateOrder);
router.patch("/order/:order_id/:status", OrderController.updateOrderStatus);
router.delete("/order/:order_id", OrderController.deleteOrder);

module.exports = router;
