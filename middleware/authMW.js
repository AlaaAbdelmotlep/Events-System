require("dotenv").config();
const jwt = require("jsonwebtoken");



module.exports = (req, res, next) => {
    let token, decode;
    try {
        token = req.get("Authorization").split(" ")[1];
        decode = jwt.verify(token, process.env.SECRET_KEY)
    }
    catch (error) {
        error.message = "Not Authorized";
        error.status = 403;
        next(error);
    }
    if (decode !== undefined) {
        req.id=decode.id
        req.role = decode.role 
        console.log(req.role );
        next();
    }
}