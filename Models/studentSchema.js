const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);

//1- build schema with validations
const schema = new mongoose.Schema({
    _id: Number,
    fullname: String,
    email: { type: String , unique:true},
    // password: Number
}, { _id: false });

schema.plugin(AutoIncrement, {id: 'student_id_counter', inc_field: '_id'});



//2- register for schema in mongoose
module.exports=mongoose.model("students", schema);

// {
// "fullname": "alaa",
// "email":"alaa@gmail.com",
// }
