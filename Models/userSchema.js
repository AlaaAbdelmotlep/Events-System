const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);

const schema = new mongoose.Schema({
    // id auto-increment
     _id: Number,
    fullname: String,
    // email: {type:String,unique:true},
    email: String,
    password: String,
    // address: {
    //     "type": "object",
    //     "properties": {
    //         "city": { type:String },
    //         "street": { type: Number },
    //         "building":{ type: Number }
    //     }
    // },
    role: {
        type: String,
        enum: ["speaker", "student" , "admin"]
    },
    image: String
}, { _id: false })
schema.plugin(AutoIncrement);
module.exports = mongoose.model("user", schema);
