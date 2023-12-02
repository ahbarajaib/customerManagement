const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customerController");

// Create a customer
router.post("/", customerController.createCustomer);

// Read all customers
router.get("/", customerController.getAllCustomers);

// Read a single customer by ID
router.get("/:customerId", customerController.getCustomerById);

// Update a customer by ID
router.put("/:customerId", customerController.updateCustomerById);

// Delete a customer by ID
router.delete("/:customerId", customerController.deleteCustomerById);

module.exports = router;
