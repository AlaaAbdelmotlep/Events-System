const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);

//1- build schema with validations
const schema=new mongoose.Schema({
    _id: Number,
    title:String,
    data: { type: Date, default: Date.now },
//     mainSpeaker: {type:mongoose.Types.ObjectId, ref:"speakers"}, // one item 
//     speakers: [{
//             type: mongoose.Types.ObjectId,
//             ref: 'speakers'
//     }], // array of speakers
    students: [{
            type: Number,
            ref: 'students'
    }], // array of students
}, { _id: false });

schema.plugin(AutoIncrement, {id: 'event_id_counter', inc_field: '_id'});

//2- register for schema in mongoose
module.exports =mongoose.model("events", schema);
