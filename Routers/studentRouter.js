const express=require("express");
const router = express.Router();
const { body } = require("express-validator");
// 
const controller = require("./../Controllers/studentControllers");
// 
const isAuth = require("./../middleware/authMW");

router.route("/students")
    .get(isAuth,controller.getStudents)
    .post(isAuth,[
        body("fullname").isAlpha().withMessage("fullname must be text"),
        body("email").isEmail().withMessage("your email isn't valid"),
        // body("password").isAlphanumeric().withMessage("password is not accepted"),
    ], controller.addStudent)
    .put(isAuth,controller.updateStudent)
    .delete(isAuth,controller.deleteStudent)

module.exports = router;
