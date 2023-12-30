const userModel = require("../Models/UserModel");
const bcrypt = require("bcryptjs");

module.exports = {
  addUser: async (req, res) => {
    try {
      const {
        first_name,
        middle_name,
        last_name,
        address,
        pincode,
        country,
        state,
        city,
        phone,
        email,
        gender,
        date_of_birth,
        is_verified,
        is_active,
        last_login, } = req.body;

      const salt = await bcrypt.genSalt(10);
      const password = await bcrypt.hash(req.body.password, salt);

      const user = await userModel.findOne({ email: email });

      if (user) {
        return res.status(400).json({ message: "User already registered" });
      } else {
        const userData = new userModel({
          first_name,
          middle_name,
          last_name,
          full_name: first_name + " " + middle_name + " " + last_name,
          address,
          pincode,
          country,
          state,
          city,
          phone,
          email,
          password,
          gender,
          date_of_birth,
          is_verified,
          is_active,
          last_login,
        });
        userData
          .save()
          .then((data) => {
            return res
              .status(201)
              .json({ message: "User Created Successfully", data });
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
  getAllUser: async (req, res) => {
    try {
      const allUser = await userModel.find()
      if (allUser.length == 0) {
        return res
          .status(404)
          .json({ status: false, message: `User Not Found In Database` });
      }
      return res
        .status(200)
        .json({ status: true, message: "User Get Successfully", allUser });
    } catch (err) {
      return res
        .status(500)
        .json({ status: false, message: 'Server Error', error: err.message || err.toString() });
    }
  },
  getUserById: async (req, res) => {
    try {
      const { user_id } = req.params
      const user = await userModel.findById({ _id: user_id });
      if (user == null) {
        return res
          .status(404)
          .json({ status: false, message: `User Not Found With ID :- ${user_id} ` });
      }
      return res
        .status(200)
        .json({ status: true, message: "User Get Successfully", user });
    } catch (err) {
      return res
        .status(500)
        .json({ status: false, message: 'Server Error', error: err.message || err.toString() });
    }
  },
  updateUser: async (req, res) => {
    try {
      const { user_id } = req.params
      const user = await userModel.findByIdAndUpdate({ _id: user_id }, req.body, { new: true });
      if (user == null) {
        return res
          .status(404)
          .json({ status: false, message: `User Not Found With ID :- ${user_id} ` });
      }
      return res
        .status(200)
        .json({ status: true, message: "User Updated Successfully", user });
    } catch (err) {
      return res
        .status(500)
        .json({ status: false, message: 'Server Error', error: err.message || err.toString() });
    }
  },
  updateUserStatus: async (req, res) => {
    try {
      const { user_id, status } = req.params
      const user = await userModel.findByIdAndUpdate(user_id,
        { $set: { is_active: status } },
        { new: true });
      if (user == null) {
        return res
          .status(404)
          .json({ status: false, message: `User Not Found With ID :- ${user_id} ` });
      }
      return res
        .status(200)
        .json({ status: true, message: "User Status Updated Successfully", user });
    } catch (err) {
      return res
        .status(500)
        .json({ status: false, message: 'Server Error', error: err.message || err.toString() });
    }
  },
  deleteUser: async (req, res) => {
    try {
      const { user_id } = req.params
      const user = await userModel.findByIdAndDelete({ _id: user_id });
      if (user == null) {
        return res
          .status(404)
          .json({ status: false, message: `User Not Found With ID :- ${user_id} ` });
      }
      return res
        .status(200)
        .json({ status: true, message: "User Deleted Successfully", user });
    } catch (err) {
      return res
        .status(500)
        .json({ status: false, message: 'Server Error', error: err.message || err.toString() });
    }
  },
};
