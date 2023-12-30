const express = require("express");
const router = express.Router();
const AuthRoute = require("./AuthRoute");
const CustomerRoute = require("./CustomerRoute");
const ProductRoute = require("./ProductRoute");
const UserRoute = require("./UserRoute");

router.get("/", (req, res) => {
  res.send(`Welcome To Billing Portal With Version V1`);
});

router.use(
  "/v1",
  AuthRoute,
  CustomerRoute,
  ProductRoute,
  UserRoute,
);

module.exports = router;
