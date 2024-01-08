const OrderModel = require("../Models/OrderModel");

module.exports = {
  addOrder: async (req, res) => {
    try {
      const { code,
        name,
        rate,
        group,
        hsn,
        status,
        is_active, } = req.body;

      const Order = await OrderModel.findOne({ name: name });

      if (Order) {
        return res.status(400).json({ status: true, message: "Order already exists" });
      } else {
        const OrderData = new OrderModel({
          code,
          name,
          rate,
          group,
          hsn,
          status,
          is_active,
        });
        OrderData
          .save()
          .then((Order) => {
            return res
              .status(201)
              .json({ status: true, message: "Order Created Successfully", Order });
          })
          .catch((error) => {
            return res.status(400).json({ message: error.message, error: error });
          });
      }
    } catch (err) {
      return res
        .status(500)
        .json({ status: false, message: 'Server Error', error: err.message || err.toString() });
    }
  },
  getAllOrder: async (req, res) => {
    try {
      const Order = await OrderModel.find()
      if (Order.length == 0) {
        return res
          .status(404)
          .json({ status: false, message: `Order Not Found In Database` });
      }
      return res
        .status(200)
        .json({ status: true, message: "Order Get Successfully", Order });
    } catch (err) {
      return res
        .status(500)
        .json({ status: false, message: 'Server Error', error: err.message || err.toString() });
    }
  },
  getOrderById: async (req, res) => {
    try {
      const { product_id } = req.params
      const Order = await OrderModel.findById({ _id: product_id });
      if (Order == null) {
        return res
          .status(404)
          .json({ status: false, message: `Order Not Found With ID :- ${product_id} ` });
      }
      return res
        .status(200)
        .json({ status: true, message: "Order Get Successfully", Order });
    } catch (err) {
      return res
        .status(500)
        .json({ status: false, message: 'Server Error', error: err.message || err.toString() });
    }
  },
  updateOrder: async (req, res) => {
    try {
      const { product_id } = req.params
      const Order = await OrderModel.findByIdAndUpdate({ _id: product_id }, req.body, { new: true });
      if (Order == null) {
        return res
          .status(404)
          .json({ status: false, message: `Order Not Found With ID :- ${product_id} ` });
      }
      return res
        .status(200)
        .json({ status: true, message: "Order Updated Successfully", Order });
    } catch (err) {
      return res
        .status(500)
        .json({ status: false, message: 'Server Error', error: err.message || err.toString() });
    }
  },
  updateOrderStatus: async (req, res) => {
    try {
      const { product_id, status } = req.params
      const Order = await OrderModel.findByIdAndUpdate(product_id,
        { $set: { is_active: status } },
        { new: true });
      if (Order == null) {
        return res
          .status(404)
          .json({ status: false, message: `Order Not Found With ID :- ${product_id} ` });
      }
      return res
        .status(200)
        .json({ status: true, message: "Order Status Updated Successfully", Order });
    } catch (err) {
      return res
        .status(500)
        .json({ status: false, message: 'Server Error', error: err.message || err.toString() });
    }
  },
  deleteOrder: async (req, res) => {
    try {
      const { product_id } = req.params
      const Order = await OrderModel.deleteOne({ _id: product_id });
      if (Order == null) {
        return res
          .status(404)
          .json({ status: false, message: `Order Not Found With ID :- ${product_id} ` });
      }
      return res
        .status(200)
        .json({ status: true, message: "Order Deleted Successfully", Order });
    } catch (err) {
      return res
        .status(500)
        .json({ status: false, message: 'Server Error', error: err.message || err.toString() });
    }
  },
};
