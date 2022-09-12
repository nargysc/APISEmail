const express = require("express");
const router = express();
const {signup} = require("../navigations/user")
const { validationResult, check } = require('express-validator')
const router = express.Router();

router.post('/signup',[
    check("firstName", "Firstname should be atleast 3 characters").isLength({min: 3,}),
    check("lastName", "Lastname should be atleast 3 characters").isLength({min: 3,}),
    check("email", "Email should be valid").isEmail(),
    check("password", "Password should be atleast 6 characters").isLength({min: 6,}),],signup);



    
module.exports = router;
