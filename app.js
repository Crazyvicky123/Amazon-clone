require("dotenv").config();
const express = require ("express");
const app=express();
const mongoose = require("mongoose");
require("./db/conn.js");



const cookieParser = require("cookie-parser");

const Products = require("./models/productsSchema");
const defaultdata = require("./defaultdata")
const cors = require("cors");
const router = require("./routes/router");

app.use(express.json());
app.use(cors());
app.use(cookieParser(""));
app.use(router);




const port = 8007;

app.listen(port,() =>{
    console.log(`port is running on the port number ${port}`);
});

defaultdata();