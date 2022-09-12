const User = require("../models/user");
var jwt = require("jsonwebtoken")
var expressJwt = require("express-jwt")
const { validationResult, check } = require('express-validator')

exports.getUserById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err) {
      return res.status(400).json({
        error: "No user found in DB",
      });
    }

    req.profile = user;
    next();
  });
};

exports.signup = (req, res) => {
  const errors = validationResult(req)

  if(!errors.isEmpty()) {
    return res.status(402).json({
      error: errors.array()[0].msg
    })
  }

  exports.signin = (req, res) => {
  const {email, password} = req.body

  User.findOne({email}, (err, user) => {
    if(err || !user) {
      return res.status(400).json({
        error: "Email does not exists"
      })
    }

    if(!user.authenticate(password)) {
      return res.status(401).json({
        error: "Email and password does not match"
      })
    }

    const token = jwt.sign({_id: user._id}, process.env.SECRET)

    res.cookie("token", token, { expire: new Date() + 100 })

    const { _id, name, email, role } = user
    return res.json({token, user: { _id, name, email, role }})
  })
}

exports.signout = (req, res) => {
  res.clearCookie("token")
  res.json({
    message: "User signout successfull"
  })
}
exports.isSignedIn = expressJwt({
  secret: process.env.nargysc,
  userProperty: "user"
})