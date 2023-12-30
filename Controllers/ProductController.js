const ProductModel = require("../Models/ProductModel");

module.exports = {
  addProduct: async (req, res) => {
    try {
      const { code,
        name,
        rate,
        group,
        hsn,
        status,
        is_active,} = req.body;

      const Product = await ProductModel.findOne({ name: name });

      if (Product) {
        return res.status(400).json({ status: true, message: "Product already exists" });
      } else {
        const ProductData = new ProductModel({
          code,
    name,
    rate,
    group,
    hsn,
    status,
    is_active,
        });
        ProductData
          .save()
          .then((Product) => {
            return res
              .status(201)
              .json({ status: true, message: "Product Created Successfully", Product });
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
  getAllProduct: async (req, res) => {
    try {
      const Product = await ProductModel.find()
      if (Product.length == 0) {
        return res
          .status(404)
          .json({ status: false, message: `Product Not Found In Database` });
      }
      return res
        .status(200)
        .json({ status: true, message: "Product Get Successfully", Product });
    } catch (err) {
      return res
        .status(500)
        .json({ status: false, message: 'Server Error', error: err.message || err.toString() });
    }
  },
  getProductById: async (req, res) => {
    try {
      const { product_id } = req.params
      const Product = await ProductModel.findById({ _id: product_id });
      if (Product == null) {
        return res
          .status(404)
          .json({ status: false, message: `Product Not Found With ID :- ${product_id} ` });
      }
      return res
        .status(200)
        .json({ status: true, message: "Product Get Successfully", Product });
    } catch (err) {
      return res
        .status(500)
        .json({ status: false, message: 'Server Error', error: err.message || err.toString() });
    }
  },
  updateProduct: async (req, res) => {
    try {
      const { product_id } = req.params
      const Product = await ProductModel.findByIdAndUpdate({ _id: product_id }, req.body, { new: true });
      if (Product == null) {
        return res
          .status(404)
          .json({ status: false, message: `Product Not Found With ID :- ${product_id} ` });
      }
      return res
        .status(200)
        .json({ status: true, message: "Product Updated Successfully", Product });
    } catch (err) {
      return res
        .status(500)
        .json({ status: false, message: 'Server Error', error: err.message || err.toString() });
    }
  },
  updateProductStatus: async (req, res) => {
    try {
      const { product_id, status } = req.params
      const Product = await ProductModel.findByIdAndUpdate(product_id,
        { $set: { is_active: status } },
        { new: true });
      if (Product == null) {
        return res
          .status(404)
          .json({ status: false, message: `Product Not Found With ID :- ${product_id} ` });
      }
      return res
        .status(200)
        .json({ status: true, message: "Product Status Updated Successfully", Product });
    } catch (err) {
      return res
        .status(500)
        .json({ status: false, message: 'Server Error', error: err.message || err.toString() });
    }
  },
  deleteProduct: async (req, res) => {
    try {
      const { product_id } = req.params
      const Product = await ProductModel.deleteOne({ _id: product_id });
      if (Product == null) {
        return res
          .status(404)
          .json({ status: false, message: `Product Not Found With ID :- ${product_id} ` });
      }
      return res
        .status(200)
        .json({ status: true, message: "Product Deleted Successfully", Product });
    } catch (err) {
      return res
        .status(500)
        .json({ status: false, message: 'Server Error', error: err.message || err.toString() });
    }
  },
};
