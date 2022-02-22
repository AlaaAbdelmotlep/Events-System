const { validationResult } = require("express-validator");
const StudentSchema = require("./../Models/studentSchema")

  
exports.getStudents = (req, res, next) => {
    
    if (req.role == "admin" || req.role == "speaker") {
        StudentSchema.find({})
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

exports.addStudent = (req, res, next) => {
    let errs = validationResult(req);
    if (!errs.isEmpty()) {
        let error = new Error();
        error.status = 422;
        error.message = errs.array().reduce((current, object) => current + object.msg + " ", "")

        throw error
    }

    if (req.role == "admin") {
        let object=new StudentSchema({
            fullname: req.body.fullname,
            email:req.body.email,
            // password:req.body.password
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

exports.updateStudent = (req, res, next) => {
    let errs = validationResult(req);
    if (!errs.isEmpty()) {
        let error = new Error();
        error.status = 422;
        error.message = errs.array().reduce((current, object) => current + object.msg + " ", "")

        throw error
    }

    // req.id === schema._id -->student role
        
//     if (req.role == "student" ) {
//         StudentSchema.find(req.body.email).then(data => {
//             if (data === null) throw new Error("student Not found")
//             data.fullname = req.body.fullname
//             data.email = req.body.email
//             return data.save()
//         }).then(
//             data => {
//                 // if(data==null) throw new Error("Student Is not Found!")
//                 res.status(200).json({message:"updated",data})
//             }
//         ).catch(error=>next(error))
//     }else {
//         throw new Error("Not Authorized.");
// }
    
    StudentSchema.find({})
            .then(data => {
                res.status(200).json(data)
            })
            .catch(error => {
                next(error);
            })
        
    // if ( req.role == "admin") {
    //     StudentSchema.findByIdAndUpdate(// email, {
            
    //     $set:{
    //         fullname: req.body.fullname,
    //         email:req.body.email,
    //         // password:req.body.password
    //         }
    //     })
    //     .then(data=>{
    //         if(data==null) throw new Error("Student Is not Found!")
    //         res.status(200).json({message:"updated",data})
    //     })
    //     .catch(error=>next(error))
    // }else {
    //     throw new Error("Not Authorized.");
    // }
}

exports.deleteStudent = (req, res, next) => {
    let errs = validationResult(req);
    if (!errs.isEmpty()) {
        let error = new Error();
        error.status = 422;
        error.message = errs.array().reduce((current, object) => current + object.msg + " ", "")

        throw error
    }

  if (req.role == "admin") {
        StudentSchema.findByIdAndDelete(2)
            .then(data => {
                if (data == null) throw new Error("student Is not Found!")
                res.status(200).json({ message: "deleted" })
            })
            .catch(error => next(error))
    }
    else {
        throw new Error("Not Authorized.");
    }
}
