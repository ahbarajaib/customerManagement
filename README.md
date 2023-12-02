# customerManagement
Your task is to create a CRUD (Create, Read, Update, Delete) API for a new Customer Management System. The API should prioritize data security, scalability, and performance without specific reference to industry standards.

# Customer Management API

This is a CRUD API for a Customer Management System built using Node.js, Express, and MongoDB.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
- [Usage](#usage)
  - [Running the Server](#running-the-server)
  - [API Endpoints](#api-endpoints)
- [Testing](#testing)

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js
- MongoDB

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/customer-management-api.git
   cd customer-management-api
   ```

2. Install dependencies
   npm install

### Configuration

1.  Create a .env file with
    PORT=3000
    MONGO_URI=mongodb+srv://<username>:<password>@<your-mongo-uri>

### Usage

1.  Running the Server
    npm start or npm run dev
2.  API End Points

    - Create a customer
      POST /api/customers

    - Get All customers
      GET /api/customers

    - Get a single customer by ID
      GET /api/customers/:customerId

    - Update customer by ID
      PUT /api/customers/:customerId

    - Delete a customer by ID
      DELETE /api/customers/:customerId
