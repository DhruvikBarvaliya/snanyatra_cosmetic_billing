const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var validateEmail = function (email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const CustomerSchema = new Schema(
  {
    prouduct_id: {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["client", "supplier"],
    },
    address: {
      type: String,
    },
    gst_no: {
      type: String,
    },
    state: {
      type: String,
    },
    contact_person: {
      type: String,
    },
    packing: {
      type: String,
      enum: ["with-box", "without-box"],
    },
    group: {
      type: String,
      enum: ["store"],
    },
    transport: {
      type: String,
    },
    broker: {
      type: String,
    },
    phone_no_o: {
      type: String,
    },
    phone_no_r: {
      type: String,
    },
    mobile_no: {
      type: String,
      minLength: [10, "no should have minimum 10 digits"],
      maxLength: [10, "no should have maximum 10 digits"],
      match: [/\d{10}/, "no should only have digits"],
    },
    fax_no: {
      type: String,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: "Email address is required",
      validate: [validateEmail, "Please fill a valid email address"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    pan_no: {
      type: String,
    },
    tds: {
      type: Number,
    },
    interest: {
      type: Number,
    },
    surcharge: {
      type: Number,
    },
    opening_credit: {
      type: Number,
    },
    opening_debit: {
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
  { timestamps: true }
);

//export const Customer = mongoose.model("Customer", CustomerSchema);
module.exports = mongoose.model("Customer", CustomerSchema);
