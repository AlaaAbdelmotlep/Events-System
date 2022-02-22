const express=require("express");
const router = express.Router();
const { body } = require("express-validator");

const controller=require("./../Controllers/speakerControllers")
const isAuth = require("./../middleware/authMW");

router.route("/speakers")
    .get(isAuth,controller.getAllSpeakers)
    .post( [
        body("fullname").isAlpha().withMessage("fullname must be text"),
        body("email").isEmail().withMessage("your email isn't valid"),
        // body("address").isObject().withMessage("address is an object"),
        // body("address.city").isAlpha().withMessage("city must be text"),
        // body("address.street").isInt().withMessage("street must be number"),
        // body("address.building").isInt().withMessage("building must be number"),
        body("role").isIn(['speaker', 'student'])
                .withMessage("insert student or speaker"),
        body("image").isString().withMessage("image must be a string"),
    ],controller.addSpeaker)
    .put(isAuth,controller.updateSpeaker)
    .delete(isAuth,controller.deleteSpeaker)

module.exports = router;
 



//  {
// "fullname":"Alaa",
// "email": "alaa172@yahoo.com",
// "password": "abc123",
// "address":{
//     "city":"Mansoura",
//     "street":4,
//     "building":"2"
// },
// "role":"student",
// "image":"img.jpg"
// }