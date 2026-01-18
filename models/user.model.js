const mongoose=require("mongoose");
const constants=require("../utils/constants")
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    userID:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:7
    },
    email:{
        type:String,
        required:true,
        unique:true,
        minlength:10,
        lowercase:true,
    },
    userType:{
        type:String,
        //enum is basically value can be from these only nothing else
        enum:[constants.userType.customer,constants.userType.engineer,constants.userType.admin],
        required:true,
        default:constants.userType.customer
    },
    userStatus:{
        type:String,
        enum:[constants.userStatus.approved,constants.userStatus.pending,constants.userStatus.blocked],
        required:true,
        default:constants.userStatus.approved
    }
},{timestamps:true});

module.exports=mongoose.model("User",userSchema);
