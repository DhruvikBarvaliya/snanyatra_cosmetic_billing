const CustomerModel = require("../Models/CustomerModel");

module.exports = {
  addCustomer: async (req, res) => {
    try {
      const {
        prouduct_id,
        name,
        type,
        address,
        gst_no,
        state,
        contact_person,
        packing,
        group,
        transport,
        broker,
        phone_no_o,
        phone_no_r,
        mobile_no,
        fax_no,
        email,
        pan_no,
        tds,
        interest,
        surcharge,
        opening_credit,
        opening_debit,
        status,
        is_active, } = req.body;

      const Customer = await CustomerModel.findOne({ email: email });

      if (Customer) {
        return res.status(400).json({ message: "Customer already registered" });
      } else {
        const CustomerData = new CustomerModel({
          prouduct_id,
          name,
          type,
          address,
          gst_no,
          state,
          contact_person,
          packing,
          group,
          transport,
          broker,
          phone_no_o,
          phone_no_r,
          mobile_no,
          fax_no,
          email,
          pan_no,
          tds,
          interest,
          surcharge,
          opening_credit,
          opening_debit,
          status,
          is_active,
        });
        CustomerData
          .save()
          .then((data) => {
            return res
              .status(201)
              .json({ message: "Customer Created Successfully", data });
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
  getAllCustomer: async (req, res) => {
    try {
      const allCustomer = await CustomerModel.find()
      if (allCustomer.length == 0) {
        return res
          .status(404)
          .json({ status: false, message: `Customer Not Found In Database` });
      }
      return res
        .status(200)
        .json({ status: true, message: "Customer Get Successfully", allCustomer });
    } catch (err) {
      return res
        .status(500)
        .json({ status: false, message: 'Server Error', error: err.message || err.toString() });
    }
  },
  getCustomerById: async (req, res) => {
    try {
      const { Customer_id } = req.params
      const Customer = await CustomerModel.findById({ _id: Customer_id });
      if (Customer == null) {
        return res
          .status(404)
          .json({ status: false, message: `Customer Not Found With ID :- ${Customer_id} ` });
      }
      return res
        .status(200)
        .json({ status: true, message: "Customer Get Successfully", Customer });
    } catch (err) {
      return res
        .status(500)
        .json({ status: false, message: 'Server Error', error: err.message || err.toString() });
    }
  },
  updateCustomer: async (req, res) => {
    try {
      const { Customer_id } = req.params
      const Customer = await CustomerModel.findByIdAndUpdate({ _id: Customer_id }, req.body, { new: true });
      if (Customer == null) {
        return res
          .status(404)
          .json({ status: false, message: `Customer Not Found With ID :- ${Customer_id} ` });
      }
      return res
        .status(200)
        .json({ status: true, message: "Customer Updated Successfully", Customer });
    } catch (err) {
      return res
        .status(500)
        .json({ status: false, message: 'Server Error', error: err.message || err.toString() });
    }
  },
  updateCustomerStatus: async (req, res) => {
    try {
      const { Customer_id, status } = req.params
      const Customer = await CustomerModel.findByIdAndUpdate(Customer_id,
        { $set: { is_active: status } },
        { new: true });
      if (Customer == null) {
        return res
          .status(404)
          .json({ status: false, message: `Customer Not Found With ID :- ${Customer_id} ` });
      }
      return res
        .status(200)
        .json({ status: true, message: "Customer Status Updated Successfully", Customer });
    } catch (err) {
      return res
        .status(500)
        .json({ status: false, message: 'Server Error', error: err.message || err.toString() });
    }
  },
  deleteCustomer: async (req, res) => {
    try {
      const { Customer_id } = req.params
      const Customer = await CustomerModel.findByIdAndDelete({ _id: Customer_id });
      if (Customer == null) {
        return res
          .status(404)
          .json({ status: false, message: `Customer Not Found With ID :- ${Customer_id} ` });
      }
      return res
        .status(200)
        .json({ status: true, message: "Customer Deleted Successfully", Customer });
    } catch (err) {
      return res
        .status(500)
        .json({ status: false, message: 'Server Error', error: err.message || err.toString() });
    }
  },
};
