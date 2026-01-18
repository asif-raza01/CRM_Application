const express=require("express");
const route=express.Router();
const authController=require("../controllers/auth.controller.js")
const {validateUserReqBody}=require("../middlewares/verifyUserReqBody.js")
route.post("/auth/signup",[validateUserReqBody],authController.signup);

module.exports=route;
