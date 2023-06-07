const express = require("express");
const router = express.Router();
const Category = require("../models/category");
const mongoose = require("mongoose");

// Trả về category dựa trên ID
exports.getCategoryById = async (req, res) => {
  try {
    const categoryId = req.params.categoryID;
    const category = await Category.findById(categoryId);

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    const categoryName = category.categoryName;
    res.status(200).json({ categoryName });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch category", errorMessage: error.message });
  }
};

//trả về all
exports.allCategory = async (req, res) => {
  try {
    const currentPage = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 10;
    let totalItems;

    const countDocuments = await Category.find().countDocuments();
    totalItems = countDocuments;

    const categories = await Category.find({}, 'categoryName')
      .skip((currentPage - 1) * perPage)
      .limit(perPage)
      .sort({ created: -1 });

    res.status(200).json({
      totalPage: Math.ceil(totalItems / perPage),
      totalItems,
      perPage,
      currentPage,
      categories
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch categories', errorMessage: error.message });
  }
};

// addCategory
exports.addCategory = async (req, res) => {
  try {
    const { category } = req.body;

    const newCategory = new Category({
      categoryName: category.categoryName
    });

    const savedCategory = await newCategory.save();

    res.status(200).json({ message: "Category added successfully", category: savedCategory });
  } catch (error) {
    res.status(500).json({ error: "Failed to add category", errorMessage: error.message });
  }
};

// updateCategory
exports.updateCategory = async (req, res) => {
  try {
    const { category } = req.body;
    const categoryId = req.params.categoryID;
    const existingCategory = await Category.findById(categoryId);
    if (!existingCategory) {
      return res.status(400).json({ error: "Invalid category ID" });
    }

    existingCategory.categoryName = category.categoryName;

    const updatedCategory = await existingCategory.save();

    res.status(200).json({ message: "Category updated successfully", category: updatedCategory });
  } catch (error) {
    res.status(500).json({ error: "Failed to update category", errorMessage: error.message });
  }
};

// deleteCategory
exports.deleteCategory = async (req, res) => {
  try {
    const categoryID = req.params.categoryID;

    const existingCategory = await Category.findById(categoryID);
    if (!existingCategory) {
      return res.status(400).json({ error: "Invalid category ID" });
    }

    await existingCategory.remove();

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete category", errorMessage: error.message });
  }
};
