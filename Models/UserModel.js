const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    first_name: { type: String, trim: true },
    middle_name: { type: String, trim: true },
    last_name: { type: String, trim: true },
    full_name: { type: String, trim: true },
    address: {
      address: { type: String, trim: true },
      pincode: { type: String, trim: true },
      country: { type: String, trim: true },
      state: { type: String, trim: true },
      city: { type: String, trim: true },

    },
    phone: {
      type: String,
      unique: true,
      match: [
        /^(\+\d{1,3}[- ]?)?\d{10}$/,
        "Please fill a valid telephone number",
      ],
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Enter a valid email address",
      ],
      required: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, trim: true },
    gender: {
      type: String,
      enum: ["MALE", "FEMALE", "OTHER"],
      default: "MALE",
    },
    blood_group: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-",]
    },
    date_of_birth: { type: Date },
    otp: { type: Number },
    forgot_otp: { type: Number },
    is_checke_in: { type: Boolean, default: false },
    is_verified: { type: Boolean, default: false },
    is_active: { type: Boolean, default: false },
    last_login: { type: Date, default: Date.now },
  },
  { versionKey: false, timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
