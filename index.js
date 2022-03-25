const express = require("express");
const cors = require("cors");
require("dotenv").config();
const secretRouter = require("./routes/secret");

const app = express();

//global midllewares
app.use(express.json());
app.use(cors());

//routes
app.use("/secret", secretRouter);

module.exports = app;
