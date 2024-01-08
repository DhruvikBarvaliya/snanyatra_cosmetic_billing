const BillModel = require("../Models/BillModel");

module.exports = {
  addBill: async (req, res) => {
    try {
      const {
        transport,
        l_r_no,
        vehicle_no,
        date_of_rem,
        goods_send_from,
        invoice_no,
        date_of_invoice,
        challan_no,
        broker_name,
        order_id,
        user_id,
        status,
        is_active,
      } = req.body;

      const Bill = await BillModel.findOne({ invoice_no: invoice_no });

      if (Bill) {
        return res.status(400).json({ status: true, message: "Bill already exists" });
      } else {
        const BillData = new BillModel({
          transport,
          l_r_no,
          vehicle_no,
          date_of_rem,
          goods_send_from,
          invoice_no,
          date_of_invoice,
          challan_no,
          broker_name,
          order_id,
          user_id,
          status,
          is_active,
        });
        BillData
          .save()
          .then((Bill) => {
            return res
              .status(201)
              .json({ status: true, message: "Bill Created Successfully", Bill });
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
  getAllBill: async (req, res) => {
    try {
      const Bill = await BillModel.find()
      if (Bill.length == 0) {
        return res
          .status(404)
          .json({ status: false, message: `Bill Not Found In Database` });
      }
      return res
        .status(200)
        .json({ status: true, message: "Bill Get Successfully", Bill });
    } catch (err) {
      return res
        .status(500)
        .json({ status: false, message: 'Server Error', error: err.message || err.toString() });
    }
  },
  getBillById: async (req, res) => {
    try {
      const { product_id } = req.params
      const Bill = await BillModel.findById({ _id: product_id });
      if (Bill == null) {
        return res
          .status(404)
          .json({ status: false, message: `Bill Not Found With ID :- ${product_id} ` });
      }
      return res
        .status(200)
        .json({ status: true, message: "Bill Get Successfully", Bill });
    } catch (err) {
      return res
        .status(500)
        .json({ status: false, message: 'Server Error', error: err.message || err.toString() });
    }
  },
  updateBill: async (req, res) => {
    try {
      const { product_id } = req.params
      const Bill = await BillModel.findByIdAndUpdate({ _id: product_id }, req.body, { new: true });
      if (Bill == null) {
        return res
          .status(404)
          .json({ status: false, message: `Bill Not Found With ID :- ${product_id} ` });
      }
      return res
        .status(200)
        .json({ status: true, message: "Bill Updated Successfully", Bill });
    } catch (err) {
      return res
        .status(500)
        .json({ status: false, message: 'Server Error', error: err.message || err.toString() });
    }
  },
  updateBillStatus: async (req, res) => {
    try {
      const { product_id, status } = req.params
      const Bill = await BillModel.findByIdAndUpdate(product_id,
        { $set: { is_active: status } },
        { new: true });
      if (Bill == null) {
        return res
          .status(404)
          .json({ status: false, message: `Bill Not Found With ID :- ${product_id} ` });
      }
      return res
        .status(200)
        .json({ status: true, message: "Bill Status Updated Successfully", Bill });
    } catch (err) {
      return res
        .status(500)
        .json({ status: false, message: 'Server Error', error: err.message || err.toString() });
    }
  },
  deleteBill: async (req, res) => {
    try {
      const { product_id } = req.params
      const Bill = await BillModel.deleteOne({ _id: product_id });
      if (Bill == null) {
        return res
          .status(404)
          .json({ status: false, message: `Bill Not Found With ID :- ${product_id} ` });
      }
      return res
        .status(200)
        .json({ status: true, message: "Bill Deleted Successfully", Bill });
    } catch (err) {
      return res
        .status(500)
        .json({ status: false, message: 'Server Error', error: err.message || err.toString() });
    }
  },
};
