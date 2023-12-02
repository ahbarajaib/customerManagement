const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const dotenv = require("dotenv");
const connectDB = require("./config/db.js");
const bodyParser = require("body-parser");
const customerRoutes = require("./routes/customerRoutes.js");

app.use(bodyParser.json());

app.use("/api/customers", customerRoutes);

dotenv.config();
connectDB();
app.listen(PORT, console.log(`Server running on port ${PORT}`));
