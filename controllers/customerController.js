const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const { check, validationResult } = require("express-validator");
const Customer = require("../models/customerModel.js");

const createCustomer = [
  check("name").notEmpty().withMessage("Name is required"),
  check("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid Email Format"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must contain a minimum of 6 characters"),
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const customerExist = await Customer.findOne({ email });

      if (customerExist) {
        return res.status(400).json({ error: "Email already exists" });
      }

      const saltRounds = 10;
      const hash = await bcrypt.hash(password, saltRounds);

      const newCustomer = new Customer({ name, email, password: hash });
      await newCustomer.save();

      newCustomer.password = undefined;
      res.status(201).json(newCustomer);
    } catch (error) {
      console.error("Error creating customer:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }),
];

const getAllCustomers = asyncHandler(async (req, res) => {
  try {
    const customers = await Customer.find({});
    console.log("Customers:", customers);
    res.json(customers);
  } catch (error) {
    console.error("Error retrieving customers:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const getCustomerById = asyncHandler(async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.customerId);
    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }
    res.json(customer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const updateCustomerById = asyncHandler(async (req, res) => {
  try {
    const updatedCustomer = await Customer.findByIdAndUpdate(
      req.params.customerId,
      { $set: req.body },
      { new: true }
    );
    if (!updatedCustomer) {
      return res.status(404).json({ error: "Customer not found" });
    }
    res.json(updatedCustomer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const deleteCustomerById = asyncHandler(async (req, res) => {
  try {
    const deletedCustomer = await Customer.findByIdAndDelete(
      req.params.customerId
    );
    if (!deletedCustomer) {
      return res.status(404).json({ error: "Customer not found" });
    }
    res.json({ message: "Customer deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomerById,
  deleteCustomerById,
};
