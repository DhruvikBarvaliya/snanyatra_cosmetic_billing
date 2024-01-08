const express = require("express");
const router = express.Router();
const AuthRoute = require("./AuthRoute");
const CustomerRoute = require("./CustomerRoute");
const ProductRoute = require("./ProductRoute");
const UserRoute = require("./UserRoute");
const OrderRoute = require("./OrderRoute");
const BillRoute = require("./BillRoute");

router.get("/", (req, res) => {
  res.send(`Welcome To Ordering Portal With Version V1`);
});

router.use(
  "/v1",
  AuthRoute,
  CustomerRoute,
  ProductRoute,
  UserRoute,
  OrderRoute,
  BillRoute,
);

module.exports = router;
