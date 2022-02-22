const express = require("express");
const {body,query,param}=require("express-validator")
const router = express.Router();
// 
const authenticationControlles = require("./../Controllers/authenticationControlls")
const User = require("./../Models/userSchema")
// User login
router.post("/login", [
    body("fullname").isAlpha().withMessage("Student Name should be String"),
    body("password").isAlphanumeric().withMessage("Student Password should be Integer")
], authenticationControlles.userLogin)

// User register
router.post("/register", [
    body("isSpeaker").isBoolean().withMessage("iSpeaker is boolen"),
    body("fullname").isAlpha().withMessage("Student Name should be String"),
    body('email').isEmail(),
    //     .custom(value => {
    //         return User.findUserByEmail(value)
    //             .then(user => {
    //     if (user) {
    //         return Promise.reject('E-mail already in use');
    //     }
    //     });
    // }),
    body("password").isAlphanumeric().isLength({ min: 5 }).withMessage("Invalid password"),
    body("passwordConfirmation").custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Password confirmation does not match password');
        } else {
             return true;
        }
    }),
    // body("address").isObject().withMessage("Student Address Not Vaild"),
    // body("city").isAlpha().withMessage("Invalid city"),
    // body("street").isInt().withMessage("Invalid Street"),
    // body("building").isInt().withMessage("Invalid building"),
    body("role").isIn(['speaker', 'student' , "admin"])
                .withMessage("insert student or speaker or admin"),
    body("image").isString().withMessage("Image invalid")
],authenticationControlles.userRegister)

// router.post("/changepassword",[],authenticationControlles.changePassword)

module.exports=router;