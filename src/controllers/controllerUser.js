const express= require('express');
const fs=require('fs');
const path = require('path');
const bcrypt = require('bcryptjs')

const users = JSON.parse(fs.readFileSync(path.join(__dirname, '../../data/user.json'), 'utf-8'));

const controllerUser= {
     login:(req,res)=>{
      return res.render("login")
    },
    loginPost:(req,res)=>{
      const userToLogin = users.find(oneUser=> oneUser.email===req.body.emailLogin);
      if(userToLogin===undefined){
        return res.send("Este usuario no existe")
      }
      if(userToLogin!==undefined){
        const isPasswordOk = bcrypt.compareSync(req.body.passwordLogin,userToLogin.password);
        if(!isPasswordOk){
          return res.send("las contraseñas no coinciden")
        }
        delete userToLogin.password
        req.session.user=userToLogin
        res.cookie("email",userToLogin.email,{maxAge:100*60}*30)

        return res.redirect("/profile")
      }
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
	   		password: bcrypt.hashSync(req.body.passwordRegister,10),
        type:req.body.tipoDeusuario,
        image:req.body.userImage
	});

	fs.writeFileSync("../data/user.json", JSON.stringify(newUserDB, null," "));
	
	res.redirect("/profile");
    },
    profile:(req,res)=>{
      return res.render("profile",{userData:req.session.user})
    },
    logout:(req,res)=>{
      req.session.destroy();
      res.clearCookie("email");
      res.redirect('/')
    }
};
module.exports=controllerUser;