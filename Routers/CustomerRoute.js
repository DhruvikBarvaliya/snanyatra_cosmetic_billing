const express = require("express");
const router = express.Router();
const CustomerController = require("../Controllers/CustomerController");

router.post("/customer",  CustomerController.addCustomer);
router.get("/customer",  CustomerController.getAllCustomer);
router.get("/customer/:customer_id", CustomerController.getCustomerById);
router.put("/customer/:customer_id", CustomerController.updateCustomer);
router.put("/customer/:customer_id/:status", CustomerController.updateCustomerStatus);
router.delete("/customer/:customer_id", CustomerController.deleteCustomer);

module.exports = router;
