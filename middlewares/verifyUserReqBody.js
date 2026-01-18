const User=require("../models/user.model.js")
const constants=require("../utils/constants.js")
validateUserReqBody= async (req,res,next)=>{
    
        if(!req.body.name){
            res.status(400).send({
                message:"Username is not provided try again"
            });
            return;
        }
        if(!req.body.password){
            res.status(400).send({
                message:"Password is not provided try again"
            });
            return;
        }
        if(!req.body.userID){
            res.status(400).send({
                message:"UserID is not provided try again!!"
            });
            return;
        }
        const user=await User.findOne({userID:req.body.userid});
        if(user!=null){
            res.status(400).send({
                message:"UserID already occupied please try another"
            });
            return;
        }
        if(!req.body.email){
            res.status(400).send({
                message:"Please provide email"
            });
            return;
        }
        const user1=await User.findOne({email:req.body.email});
        if(user1!=null){
            res.status(400).send({
                message:"Email is already occupied please use another!!"
            });
            return;
        }
        const possibleuserType=[constants.userType.customer,constants.userType.engineer,constants.userType.admin];
        if(req.body.userType && !possibleuserType.includes(req.body.userType)){
            res.status(400).send({
                message:"Usertype Is Invalid please Try Again!"
            });
            return;
        }
        next();
    

    
}

module.exports={
    validateUserReqBody:validateUserReqBody
}