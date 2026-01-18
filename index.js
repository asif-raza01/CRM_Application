 /**
  * 1.Logic to start a express server
  * 2.connect mongodb and create a Admin at the server bottomline(if not already present)
  * 3.I will have to connect to the router layer
  */

const express=require("express");
const mongoose=require("mongoose");
const User=require("./models/user.model.js")
const auth_route=require("./routes/auth.route.js")
const app=express();
app.use(express.json());
require("dotenv").config();
const bcrypt=require("bcryptjs");


app.use("/crm/api/v1",auth_route);


const PORT=process.env.PORT;
console.log("PORT");
app.listen(PORT || 3000,()=>{
    console.log(`Server is listening at port number:${PORT}`);
});
console.log("hello");
(async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB connected successfully");
        //now after connection success i want have a admin so i need to define it here
        const user=await User.findOne({userID:"admin"});
        if(!user){
            console.log("Admin is not present");
            //create admin
            const admin=await User.create({
                name:"Asif",
                email:"asif123@gmail.com",
                userID:"admin",
                userType:"Admin",
                password:bcrypt.hashSync("asif@123",8)
            });
            console.log("Admin created",admin);
        }else{
            console.log("Admin is already Present")
        }
    } catch (err) {
        console.log("ERROR:",err)
    }
})()