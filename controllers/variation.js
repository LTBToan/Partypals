const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const Variation = require("../models/variation");
const User = require("../models/users");
const _ = require("lodash");
const { upload,uploadFile } = require("../helpers/fbconfig");
const mongoose = require("mongoose");

//trả về variation theo id
exports.getVariationById = async (req, res) => {
  try {
    const variation = await Variation.find({productID: req.params.productID});

    if (!variation) {
      return res.status(404).json({ error: "Variation not found" });
    }

    res.status(200).json({ variation });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch variation", errorMessage: error.message });
  }
};

//all variation
exports.allVariations = async (req, res) => {
  try {
    const currentPage = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 10;
    let totalItems;

    const countDocuments = await Variation.find().countDocuments();
    totalItems = countDocuments;

    const variations = await Variation.find()
      .skip((currentPage - 1) * perPage)
      .limit(perPage)
      .sort({ created: -1 });

    res.status(200).json({
      totalPage: Math.ceil(totalItems / perPage),
      totalItems,
      perPage,
      currentPage,
      list: variations
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch variations', errorMessage: error.message });
  }
};

// add variation
exports.addVariation = async (req, res) => {
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
        const existingProduct = await Product.findById(mongoose.Types.ObjectId(req.body.productID));
        if (!existingProduct) {
          return res.status(400).json({ error: "Invalid product ID" });
        }

        if (existingProduct.accountID != req.auth._id) {
          return res.status(401).json({ error: "Not authorized" });
        }

        const newVariation = new Variation(req.body);

        //xử lý lưu vào firebase và gán vào field image
        if (req.file) {
          const file = req.file;
          const filename = await uploadFile(file);
          newVariation.image = filename;
        }

        const savedVariation = await newVariation.save();

        res.status(200).json({ message: "Variation added successfully", variation: savedVariation });
      } catch (error) {
        res.status(500).json({ error: "Failed to add variation", errorMessage: error.message });
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

// update variation
exports.updateVariation = async (req, res) => {
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
        let existingVariation = await Variation.findById(req.params.variationID);
        if (!existingVariation) {
          return res.status(400).json({ error: "Invalid variation ID" });
        }

        const existingProduct = await Product.findById(existingVariation.productID);
        if (existingProduct.accountID != req.auth._id) {
          return res.status(401).json({ error: "Not authorized" });
        }

        existingVariation = _.extend(existingVariation, req.body);

        //xử lý lưu vào firebase và gán vào field image
        if (req.file) {
          const file = req.file;
          const filename = await uploadFile(file);
          existingVariation.image = filename;
        }

        const updatedVariation = await existingVariation.save();

        res.status(200).json({ message: "Variation updated successfully", variation: updatedVariation });
      } catch (error) {
        res.status(500).json({ error: "Failed to update variation", errorMessage: error.message });
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

// delete variation
exports.deleteVariation = async (req, res) => {
  try {
    const variationID = req.params.variationID;

    const existingVariation = await Variation.findById(variationID);
    if (!existingVariation) {
      return res.status(400).json({ error: "Invalid variation ID" });
    }

    const existingProduct = await Product.findById(existingVariation.productID);
    if (existingProduct.accountID != req.auth._id) {
      return res.status(401).json({ error: "Not authorized" });
    }

    await existingVariation.remove();

    res.status(200).json({ message: "Variation deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete variation", errorMessage: error.message });
  }
};
