const express = require("express");
const mongoose = require('mongoose');
require("dotenv").config();

const login = require("./routers/login");
const signup = require("./routers/signup");
const verfiy = require("./routers/verify");
const bookmarker = require("./routers/bookmarker");

const app = express();

// tamplate engine;
app.set("view engine", "ejs");

// routes;
app.use("/", login);
app.use("/signup", signup);
app.use("/verify", verfiy);
app.use("/bookmarker", bookmarker);

// MongoDB connection;
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true, 
    useUnifiedTopology: true

}).then(async () => {

    console.log('Connected to MongoDB');

    // run server;
    app.listen(5000, () => {
        console.log("Server is listening at 5000");
    });

    // If somehow we are not able to connect with database;
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});