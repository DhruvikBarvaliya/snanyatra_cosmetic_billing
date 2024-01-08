const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BillSchema = new Schema(
  {
    transport: {
      type: Number,
      default: 1,
    },
    l_r_no: {
      type: Number,
      default: 1,
    },
    vehicle_no: {
      type: Date,
      default: Date.now,
    },
    date_of_rem: {
      type: Date,
      default: Date.now,
    },
    goods_send_from: {
      type: String,
    },
    invoice_no: {
      type: Number,
      unique: true,
    },
    date_of_invoice: {
      type: Date,
      default: Date.now,
    },
    challan_no: {
      type: Number,
      default: 1,
    },
    broker_name: {
      type: String,
    },
    order_id: [
      {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Order",
      },
    ],
    user_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    amount: {
      type: Number,
    },
    total_amount: {
      type: Number,
    },
    status: {
      type: String,
    },
    is_active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Bill", BillSchema);
