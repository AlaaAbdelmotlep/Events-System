const express=require("express");
const router = express.Router();
const { body } = require("express-validator");

const controller = require("./../Controllers/eventControllers");
const isAuth = require("./../middleware/authMW");


router.route("/events")
    .get(isAuth,controller.getEvents)
    .post(isAuth,[
        body("title").isAlphanumeric().withMessage("title must be a text"),
        // body("mainSpeaker").isAlpha().withMessage("we need speaker's name"),
        // body("speakers").isArray().withMessage("speakers is an array of strings"),
        body("students").isArray().withMessage("students is an array")
    ], controller.addEvent)
    .put(isAuth,controller.updateEvent)
    .delete(isAuth,controller.deleteEvent)

module.exports = router;
 