const express = require("express");
const path = require("path");
const router = express.Router();
const register = require("../controllers/register");
const login = require("../controllers/login"); 
const loggedin = require("../controllers/loggedin")
const logout = require("../controllers/logout");


router.get("/",loggedin, (req, res) => {
    if(req.user){
        res.render("index", {status:"loggedin", user: req.user});
    }else{
        res.render("index", {status:"no", user:"nothing"});

    }
});

router.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/register.html"));
});

router.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/login.html"));
});

router.post("/logout", logout);

router.post("/api/register", register);

router.post("/api/login", login); 

module.exports = router;
