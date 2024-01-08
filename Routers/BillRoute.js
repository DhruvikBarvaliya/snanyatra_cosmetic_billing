const express = require("express");
const router = express.Router();
const BillController = require("../Controllers/BillController");

router.post("/bill",  BillController.addBill);
router.get("/bill", BillController.getAllBill);
router.get("/bill/:bill_id", BillController.getBillById);
router.put("/bill/:bill_id", BillController.updateBill);
router.patch("/bill/:bill_id/:status", BillController.updateBillStatus);
router.delete("/bill/:bill_id", BillController.deleteBill);

module.exports = router;
