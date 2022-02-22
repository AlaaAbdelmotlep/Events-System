const { validationResult } = require("express-validator");
const EventSchema = require("./../Models/eventSchema")

// all roles to admin
exports.getEvents = (req, res, next) => {
      if (req.role == "admin") {
          EventSchema.find({})
            // .populate({ path: "speakers" })
            .populate({path:"students"})
            .then(data => {
                res.status(200).json(data)
            })
            .catch(error => {
                next(error);
            })
    }
    else {
        throw new Error("Not Authorized.");
    }
}

exports.addEvent = (req, res, next) => {
    let errs = validationResult(req);
    if (!errs.isEmpty()) {
        let error = new Error();
        error.status = 422;
        error.message = errs.array().reduce((current, object) => current + object.msg + " ", "")

        throw error
    }

    if (req.role == "admin") {
        let object=new EventSchema({
            title:req.body.title,
            // mainSpeaker: req.body.mainSpeaker,
            // speakers: req.body.speakers,
            students: req.body.students
         })
      object.save()
            .then(data=>{
                res.status(201).json({message:"added",data})
            })
            .catch(error=>next(error))
    } else {
        throw new Error("Not Authorized.");
    }
}

exports.updateEvent = (req, res, next) => {
    let errs = validationResult(req);
    if (!errs.isEmpty()) {
        let error = new Error();
        error.status = 422;
        error.message = errs.array().reduce((current, object) => current + object.msg + " ", "")

        throw error
    }

    if (req.role == "admin") {
        EventSchema.findByIdAndUpdate(1,{
        $set:{
            title:req.body.title,
            // mainSpeaker: req.body.mainSpeaker,
            // speakers: req.body.speakers,
            students: req.body.students
            }
        })
        .then(data=>{
            if(data==null) throw new Error("Event Is not Found!")
            res.status(200).json({message:"updated",data})
        })
        .catch(error=>next(error))
    } else {
        throw new Error("Not Authorized.");
    }
}

exports.deleteEvent = (req, res, next) => {
   let errs = validationResult(req);
    if (!errs.isEmpty()) {
        let error = new Error();
        error.status = 422;
        error.message = errs.array().reduce((current, object) => current + object.msg + " ", "")

        throw error
    }

  if (req.role == "admin") {
        EventSchema.findByIdAndDelete(1)
            .then(data => {
                if (data == null) throw new Error("Event Is not Found!")
                res.status(200).json({ message: "deleted" })
            })
            .catch(error => next(error))
    }
    else {
        throw new Error("Not Authorized.");
    }
}
