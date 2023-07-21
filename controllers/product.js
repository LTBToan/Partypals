const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const User = require("../models/users");
const _ = require("lodash");
const { upload,uploadFile } = require("../helpers/fbconfig");
const mongoose = require("mongoose");

// Trả về sản phẩm dựa trên ID
exports.getProductById = async (req, res) => {
  try {
    const productId = req.params.productID;
    console.log(productId);
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json({ product });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch product", errorMessage: error.message });
  }
};


//search với name
exports.getProductsByName = async (req, res) => {
  try {
    const currentPage = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 10;
    const name = req.query.productName || "";
    let totalItems;

    const countDocuments = await Product.find({ productName: { $regex: name, $options: "i" } }).countDocuments();
    totalItems = countDocuments;

    const products = await Product.find({ productName: { $regex: name, $options: "i" } })
      .skip((currentPage - 1) * perPage)
      .limit(perPage)
      .sort({ created: -1 });

    res.status(200).json({
      totalPage: Math.ceil(totalItems / perPage),
      totalItems,
      perPage,
      currentPage,
      list: products
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products', errorMessage: error.message });
  }
};


// trả về all product
exports.allProducts = async (req, res) => {
  try {
    const currentPage = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 10;
    let totalItems;

    const countDocuments = await Product.find().countDocuments();
    totalItems = countDocuments;

    const products = await Product.find()
      .skip((currentPage - 1) * perPage)
      .limit(perPage)
      .sort({ created: -1 });

    res.status(200).json({
      totalPage: Math.ceil(totalItems / perPage),
      totalItems,
      perPage,
      currentPage,
      list: products
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products', errorMessage: error.message });
  }
};


//addProduct
exports.addProduct = async (req, res) => {
  //start
  try {
    const uploadMiddleware = upload.single('image');
    uploadMiddleware(req, res, async (err) => {
      if (err) {
        return res.status(400).json({
          error: err.message
        });
      }
      //start
      try {

        const newProduct = new Product(req.body);
        newProduct.accountID = req.auth._id;

        // xử lý upload image vô firebase rồi gán vào field image trong product
        if (req.file) {
          const file = req.file;
          const filename = await uploadFile(file);
          newProduct.image = filename;
        }

        const savedProduct = await newProduct.save();

        res.status(200).json({ message: "Product added successfully", product: savedProduct });
      } catch (error) {
        res.status(500).json({ error: "Failed to add product", errorMessage: error.message });
      }
      //end
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal server error",
    });
  }
  //end
};


//sửa product
exports.updateProduct = async (req, res) => {
  //start
  try {
    const uploadMiddleware = upload.single('image');
    uploadMiddleware(req, res, async (err) => {
      if (err) {
        return res.status(400).json({
          error: err.message
        });
      }
      //start
      try {

        let existingProduct = await Product.findById(req.params.productID);
        if (!existingProduct) {
          return res.status(400).json({ error: "Invalid product ID" });
        }

        if (existingProduct.accountID != req.auth._id) {
          return res.status(400).json({ error: "Invalid user ID" });
        }
        existingProduct = _.extend(existingProduct, req.body);

        // xử lý upload image vô firebase rồi gán vào field image trong product để cập nhật
        if (req.file) {
          const file = req.file;
          const filename = await uploadFile(file);
          existingProduct.image = filename;
        }

        const updatedProduct = await existingProduct.save();

        res.status(200).json({ message: "Product updated successfully", product: updatedProduct });
      } catch (error) {
        res.status(500).json({ error: "Failed to update product", errorMessage: error.message });
      }
      //end
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal server error",
    });
  }
  //end
};

//detele sp theo id
exports.deleteProduct = async (req, res) => {
  try {
    const productID = req.params.productID;

    const existingProduct = await Product.findById(productID);
    if (!existingProduct) {
      return res.status(400).json({ error: "Invalid product ID" });
    }

    if (existingProduct.accountID != req.auth._id) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    await existingProduct.remove();

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete product", errorMessage: error.message });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const existingProduct = await Product.findById(req.params.productID);
    if (!existingProduct) {
      return res.status(400).json({ error: "Invalid product ID" });
    }
    if (req.body.status !== "Cancel" && req.body.status !== "Pending" && req.body.status !== "No deposit yet" && req.body.status !== "Done") {
      return res.status(400).json({ error: "status not found" });
    }
    existingProduct.status = req.body.status;
    const updatedProduct = await existingProduct.save();
    res.status(200).json({ message: "Status Product updated successfully", product: updatedProduct });
  } catch (error) {
    res.status(500).json({ error: "Failed to update Status product", errorMessage: error.message });
  }
};