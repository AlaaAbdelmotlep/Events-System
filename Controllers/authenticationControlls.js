require("dotenv").config();
// 
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
// 
const bcrypt = require("bcrypt");
const saltRounds = 10;
// 
const User = require("./../Models/userSchema")
// const StudentSchema = require("./../Models/studentSchema")
// const SpeakerSchema = require("./../Models/speakerSchema")
// 
// 
exports.userRegister = (req, res, next) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        let error = new Error();
        error.status = 422;
        error.message = errors.array().reduce((current, object) => current + object.msg + " ", "")
        throw error;
  }
  if (req.body.isSpeaker) {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      bcrypt.hash(req.body.password, salt, function (err, hash) {
        let object = new User({
        fullname: req.body.fullname,
        email: req.body.email,
          password: hash,
          address: {
            city: req.body.city,
            street:req.body.street,
            building:req.body.building,
          },

        role: req.body.role,
        // image: req.body.image
    })
    object.save()
      .then(data => {
        res.status(201).json({ message: "added Speaker", data })
      })
      .catch(error => next(error))
       })
    })
    
  }else {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      bcrypt.hash(req.body.password, salt, function (err, hash) {
        let object = new User({
          fullname: req.body.fullname,
          email: req.body.email,
          password: hash,
          role: req.body.role
        })
        object.save()
          .then(data => {
            res.status(201).json({ message: "added Student", data })
          })
          .catch(error => next(error))
      });
    })    
  }
}

exports.userLogin = (req, res, next) => {
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    let error = new Error();
    error.status = 422;
    error.message = errors.array().reduce((current, object) => current + object.msg + " ", "")
    throw error;
  }
  

  if (req.body.fullname == "admin") {
    let token = jwt.sign({
      // fullname: req.body.fullname,
      role: "admin"
    }, process.env.SECRET_KEY, { expiresIn: "24h" })
    res.status(200).json({ message: "Login admin Success", token })
  }



  // mongoose-bcrypt
  
  // bcrypt.genSalt(saltRounds, function (err, salt) {
  //   bcrypt.hash(req.body.password, salt, function (err, hash) {
  //       User.find({ fullname: req.body.fullname , password: hash}).then(data => {
  //       if (!data) {
  //           throw new Error ("username or password incorrect");
  //       } else {
  //           let token = jwt.sign({
  //             fullname: req.body.fullname,
  //             role: data.role
  //           }, process.env.SECRET_KEY, { expiresIn: "10h" })
        
  //           res.status(200).json({ message: "Login Success", data, token })
  //         } 
  //       })
  //       .catch(error => {
  //         next(error);
  //       })
  //    })
  // })
  
  // findOne , compare
  User.findOne({ fullname: req.body.fullname }).then(data => {
    if (!data) {
      throw new Error("username or password incorrect");
    } else {
      let token = jwt.sign({
        id: data.id,
        // fullname: req.body.fullname,
        role: data.role
      }, process.env.SECRET_KEY, { expiresIn: "12h" })
        
      res.status(200).json({ message: "Login Success", data, token })
    }
  }).catch(error => {
      next(error);
    })
  
}

// exports.changePassword = (req,res,next) => {
  
// }
