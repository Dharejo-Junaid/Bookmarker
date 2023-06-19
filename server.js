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

app.post("/", async (req, res) => {
    const {email, password} = req.body;
    
    let emailExist = false;

    const passHash = await hash(password, 10);
    console.log(passHash);

    res.redirect("/");
});



app.listen(5000, () => {
    console.log("Server is listening at 5000");
})


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