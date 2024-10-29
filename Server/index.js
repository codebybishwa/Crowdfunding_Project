const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();
const User = require('./models/User');

mongoose.connect(process.env.DB_URL)
    .then(() => {
        console.log("Database Connected");
    })
    .catch((e) => {
        console.log("Error : ", e);
    })

app.listen(process.env.PORT, () => {
    console.log("Listening on Port Number 3000");
})
