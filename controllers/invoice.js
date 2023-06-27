const express = require("express");
const router = express.Router();
const Invoice = require("../models/invoice");
const OrderDetail = require("../models/orderDetail");
const Payment = require("../models/payment");
const mongoose = require("mongoose");

exports.allInvoice = async (req, res) => {
    try {
        const currentPage = parseInt(req.query.page) || 1;
        const perPage = parseInt(req.query.perPage) || 10;
        let totalItems;

        const countDocuments = await Invoice.find().countDocuments();
        totalItems = countDocuments;

        const invoices = await Invoice.find()
            .skip((currentPage - 1) * perPage)
            .limit(perPage)
            .sort({ date: -1 });

        res.status(200).json({
            totalPage: Math.ceil(totalItems / perPage),
            totalItems,
            perPage,
            currentPage,
            list: invoices
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch invoices', errorMessage: error.message });
    }
};

exports.getInvoiceById = async (req, res) => {
    try {
        const invoiceId = req.params.invoiceID;
        const invoice = await Invoice.findById(invoiceId);

        if (!invoice) {
            return res.status(404).json({ error: "Invoice not found" });
        }

        res.status(200).json({ invoice });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch invoice", errorMessage: error.message });
    }
};

exports.addInvoice = async (req, res) => {
    try {
        const { invoice } = req.body;
        const existingOrder = await OrderDetail.findById(invoice.orderDetailID);
    if (!existingOrder) {
      return res.status(400).json({ error: "Invalid order detail ID" });
    }
    // const existingPayment = await Payment.findById(invoice.paymentID);
    // if (!existingPayment) {
    //   return res.status(400).json({ error: "Invalid payment ID" });
    // }

        const newInvoice = new Invoice({
            orderDetailID:existingOrder._id,
            // paymentID:existingPayment._id
        });

        const savedInvoice = await newInvoice.save();

        res.status(200).json({ message: "Invoice added successfully", invoice: savedInvoice });
    } catch (error) {
        res.status(500).json({ error: "Failed to add invoice", errorMessage: error.message });
    }
};

exports.deleteInvoice = async (req, res) => {
    try {
        const invoiceId = req.params.invoiceID;

        const existingInvoice = await Invoice.findById(invoiceId);
        if (!existingInvoice) {
            return res.status(400).json({ error: "Invalid invoice ID" });
        }

        await existingInvoice.remove();

        res.status(200).json({ message: "Invoice deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete invoice", errorMessage: error.message });
    }
};