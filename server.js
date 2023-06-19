const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { hash, compare } = require("bcrypt");

app.set("view engine", "ejs");
app.use(express.static("views"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.status(200).render("index", {});
});

app.get("/signup", (req, res) => {
    res.status(200).render("signup", {});
});

app.post("/", async (req, res) => {
    const {email, password} = req.body;

    // get user from database
    let user = {email: "junaid@gmail.com",passwordHash: "$2b$10$CvUffTF92ZYJOvP5kc53nengtq0BYienvIt37UQZ8N4DCPqULAiv."};

    if(email === user.email) {

        compare(password, user.passwordHash, (err, same) => {
            if(same) res.send("Welcome");
            else res.send("Wrong password");
        });

    } else {
        res.send(`User with email: ${email} does not exist`);
    }
});

app.post("/signup", (req, res) => {
    const {name, email, password, confPassword} = req.body;
    console.log(name, email, password, confPassword);

    // get user from database
    let user = {email: "junaid@gmail.com",passwordHash: "$2b$10$CvUffTF92ZYJOvP5kc53nengtq0BYienvIt37UQZ8N4DCPqULAiv."};

    res.send("Account created");
});



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