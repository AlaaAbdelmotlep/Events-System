const { validationResult } = require("express-validator");
const SpeakerSchema = require("./../Models/speakerSchema")

exports.getAllSpeakers = (req, res, next) => {

           if (req.role == "admin" || req.role == "speaker") {
        SpeakerSchema.find({})
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

exports.addSpeaker = (req, res, next) => {
    let errs = validationResult(req);
    if (!errs.isEmpty()) {
        let error = new Error();
        error.status = 422;
        error.message = errs.array().reduce((current, object) => current + object.msg + " ", "")

        throw error
    }

    if (req.role == "admin") {
        let object=new SpeakerSchema({
            fullname: req.body.fullname,
            email: req.body.email,
            // address: req.body.address,
            // city,
            // street,
            // building,
            role: req.body.role,
            image:req.file.filename
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

exports.updateSpeaker = (req, res, next) => {
    let errs = validationResult(req);
    if (!errs.isEmpty()) {
        let error = new Error();
        error.status = 422;
        error.message = errs.array().reduce((current, object) => current + object.msg + " ", "")

        throw error
    }

    // res.status(200).json({ data: "updated", body: req.body })
    if (req.role == "speaker" || req.role == "admin") {
        SpeakerSchema.findByIdAndUpdate(2,{
        $set:{
            fullname: req.body.fullname,
            email: req.body.email,
            // address: req.body.address,
            // city,
            // street,
            // building,
            role: req.body.role,
            image:req.body.image
            }
        })
        .then(data=>{
            if(data==null) throw new Error("Speaker Is not Found!")
            res.status(200).json({message:"updated",data})
        })
        .catch(error=>next(error))
    }else {
        throw new Error("Not Authorized.");
    }
}

exports.deleteSpeaker = (req, res, next) => {
    let errs = validationResult(req);
    if (!errs.isEmpty()) {
        let error = new Error();
        error.status = 422;
        error.message = errs.array().reduce((current, object) => current + object.msg + " ", "")

        throw error
    }

  if (req.role == "admin") {
        SpeakerSchema.findByIdAndDelete(2)
            .then(data => {
                if (data == null) throw new Error("Speaker Is not Found!")
                res.status(200).json({ message: "deleted" })
            })
            .catch(error => next(error))
    }
    else {
        throw new Error("Not Authorized.");
    }
}
