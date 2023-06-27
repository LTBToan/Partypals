const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const Category = require("../models/category");
const User = require("../models/users");
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
  try {
    const { product } = req.body;

    const existingCategory = await Category.findById(product.categoryID);
    if (!existingCategory) {
      return res.status(400).json({ error: "Invalid category ID" });
    }

    const newProduct = new Product({
      accountID: req.auth._id,
      categoryID: existingCategory._id,
      productName: product.productName,
      status: product.status,
      quantity: product.quantity,
      image: product.image,
      description: product.description,
      fullDescription: product.fullDescription,
      price: product.price,
      discount: product.discount,
      offerEnd: product.offerEnd,
      new: product.new,
      rating: product.rating,
      variation: {
        image: product.variation.image,
        color: product.variation.color
      }
    });

    const savedProduct = await newProduct.save();

    res.status(200).json({ message: "Product added successfully", product: savedProduct });
  } catch (error) {
    res.status(500).json({ error: "Failed to add product", errorMessage: error.message });
  }
};


//sửa product
exports.updateProduct = async (req, res) => {
  try {
    const { product, category } = req.body;
    if (product.accountID !== req.auth._id) {
      return res.status(400).json({ error: "Invalid user ID" });
    }
    const existingProduct = await Product.findById(req.params.productID);
    if (!existingProduct) {
      return res.status(400).json({ error: "Invalid product ID" });
    }

    const existingCategory = await Category.findById(category._id);
    if (!existingCategory) {
      return res.status(400).json({ error: "Invalid category ID" });
    }

    existingProduct.categoryID = existingCategory._id;
    existingProduct.productName = product.productName;
    existingProduct.status = product.status;
    existingProduct.quantity = product.quantity;
    existingProduct.image = product.image;
    existingProduct.description = product.description;
    existingProduct.fullDescription = product.fullDescription;
    existingProduct.price = product.price;
    existingProduct.discount = product.discount;
    existingProduct.offerEnd = product.offerEnd;
    existingProduct.new = product.new;
    existingProduct.rating = product.rating;
    existingProduct.variation.image = product.variation.image;
    existingProduct.variation.color = product.variation.color;
    

    const updatedProduct = await existingProduct.save();

    res.status(200).json({ message: "Product updated successfully", product: updatedProduct });
  } catch (error) {
    res.status(500).json({ error: "Failed to update product", errorMessage: error.message });
  }
};

//detele sp theo id
exports.deleteProduct = async (req, res) => {
  try {
    const { product } = req.body;
    const productID = req.params.productID;

    if (product.accountID !== req.auth._id) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    const existingProduct = await Product.findById(productID);
    if (!existingProduct) {
      return res.status(400).json({ error: "Invalid product ID" });
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