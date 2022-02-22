const mongoose = require("mongoose");

//1- build schema with validations
const schema=new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    fullname:String,
    email: { type: String, unique: true },
    address: {
        "city": { type:String },
        "street": { type: Number },
        "building":{ type: Number }
    },
    // address:{
    //     "type": "object",
    //     "properties": {
    //         "city": { type:String },
    //         "street": { type: Number },
    //         "building":{ type: Number }
    //     }
    // },
    role: {
        type: String,
        enum: ["speaker", "student"]
    },
    image:String
});


//2- register for schema in mongoose
module.exports=mongoose.model("speakers", schema);
