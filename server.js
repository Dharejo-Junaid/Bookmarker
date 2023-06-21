const express = require("express");
const app = express();

const login = require("./controllers/login");
const signup = require("./controllers/signup");
const verfiy = require("./controllers/verify");
const bookmarker = require("./controllers/bookmarker");

app.set("view engine", "ejs");

// routes for login, signup & verify;
app.use("/", login);
app.use("/signup", signup);
app.use("/verify", verfiy);
app.use("/bookmarker", bookmarker);

app.listen(5000, () => {
    console.log("Server is listening at 5000");
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