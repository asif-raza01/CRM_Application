/**
 * Logic to sign up -> customer (Approved by default),Engineer(Pending).Admin(Pending)
 */
const bcrypt=require("bcryptjs");
const User=require("../models/user.model.js");
const constants=require("../utils/constants.js")
exports.signup=async(req,res)=>{
    let userStatus=req.body.userStatus;
    if(!req.body.userType || req.body.userType==constants.userType.customer){
        userStatus=constants.userStatus.approved;
    }else{
        userStatus=constants.userStatus.pending;
    }
    const userObj={
        name:req.body.name,
        email:req.body.email,
        userID:req.body.userID,
        userType:req.body.userType,
        password:bcrypt.hashSync(req.body.password,8),
        userStatus:userStatus
    }
    try{
        const userCreated=await User.create(userObj);
        const postRes={
            name:userCreated.name,
            userID:userCreated.userID,
            email:userCreated.email,
            userType:userCreated.userType,
            userStatus:userCreated.userStatus,
            createdAt:userCreated.createdAt,
            updatedAt:userCreated.updatedAt
        }
        res.status(201).send(postRes);

    }catch(err){
        console.log("Error while Creating the user:",err);
        res.status(500).send({
            message:""
        })
    }
}