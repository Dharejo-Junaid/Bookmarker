const express = require("express");
const app = express();

const mongoose = require('mongoose');

const login = require("./routers/login");
const signup = require("./routers/signup");
const { verfiy } = require("./routers/verify");
const bookmarker = require("./routers/bookmarker");
const User = require("./models/users");

app.set("view engine", "ejs");

// routes;
app.use("/", login);
app.use("/signup", signup);
app.use("/verify", verfiy);
app.use("/bookmarker", bookmarker);

mongoose.connect('mongodb://localhost:27017/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        console.log('Connected to MongoDB');
        app.listen(5000, () => {
            console.log("Server is listening at 5000");
        });
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });


/*

    compare(password, passHash, (err, same) => {
        if(err) {
            console.log(err);
        }

        else {
            console.log(same);
        }
    });

*/


/*

    const passHash = await hash(password, 10);
    console.log(passHash);

*/