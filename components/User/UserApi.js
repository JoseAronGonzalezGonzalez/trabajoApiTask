//instancia para los servicios de usurios

const express = require("express");
const cors = require("cors");

const Services = require("./Services/UserServices");


const User = express.Router();

User.use(express.urlencoded({extended: true}));
User.use(express.json());
User.use(cors());

User.post("/sign-up",async (req, res)=>{
    let { email, password} = req.body;
    const { status, response} = await Services.signUp(email, password);
    //Services.signUp(req, res);
    res.status().json(response);
});

User.post("/login", (req, res) =>{
    console.log(req.body.email);

    console.log(req.body.password);

});

module.exports = User;