const express= require('express');
const fs=require('fs');
const path = require('path');
const users = JSON.parse(fs.readFileSync(path.join(__dirname, '../../data/user.json'), 'utf-8'));

const controllerUser= {
     login:(req,res)=>{
      return res.render("login")
    },
    loginPost:(req,res)=>{

    },
    register:(req,res)=>{
      return res.render("register")
    },
    registerPost:(req,res)=>{
      let newUserDB = users;

			newUserDB.push({
        id:users.length+1,
	    	username: req.body.userName,
	    	email: req.body.emailRegister,
	   		password: req.body.passwordRegister,
        password2: req.body.passwordRegister2,
        type:req.body.tipoDeusuario
	});

	fs.writeFileSync("../data/user.json", JSON.stringify(newUserDB));
	
	res.redirect("/profile");
    },
    profile:(req,res)=>{
      return res.render("profile")
    }
};
module.exports=controllerUser;