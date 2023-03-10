const express = require("express");
const User = require("../models/user");
const router = express.Router();
const mongoose = require("mongoose");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/signup", (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const user = new User({
      _id: new mongoose.Types.ObjectId(),
      email: req.body.email,
      password: hash,
    });
    user
      .save()
      .then((result) => {
        console.log(result);
        res.status(201).json({
          message: "User created",
          result: result,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: err,
        });
      });
  });
});

router.post("/login", (req, res, next) => {
  User.findOne({ email: req.body.email }).then((user) => {
    if (!user) {
      return res.status(401).json({
        message: "Auth failed",
      });
    }
    return bcrypt
      .compare(req.body.password, user.password)
      .then((result) => {
        if (!result) {
          return res.status(401).json({
            message: "Auth failed",
          });
        }
        const token = jwt.sign({email : user.email, userId : user._id},'this_should_be_secret_key',{expiresIn:'1h'});


        res.status(200).json({
          token:token,
        });
      })
      .catch((err) => {
        return res.status(500).json({
          err: err,
        });
      });
  });
});

module.exports = router;
