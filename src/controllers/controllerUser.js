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
      const usertologin= users.find(oneuser=>oneuser.email===req.body.emailLogin);

      if(usertologin=== undefined){
        res.send("no existe el usuario")
      }
      if(usertologin !== undefined){
        const isPasswordOk = bcrypt.compareSync(req.body.passwordLogin,usertologin.password);
        
        if(!isPasswordOk){
          res.send("las contraseñas no coinciden")
        }

        delete usertologin.password;
        req.session.userdb=usertologin;

        res.cookie("email",usertologin.email,{maxAge:(100*60)*30})





        return res.redirect('/profile')
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
      console.log(req.cookies.email)

      return res.render("profile",{
        userData: req.session.userdb
      })
    },
    logout:(req,res)=>{

    },
    edit:(req,res)=>{
      let usuario=0
      for(let i;i<users.length;i++){
        if(users[i].id== req.params.id)
        usuario=users[i];
      }
      res.render("changePassword",{usuario:usuario})


    }
};
module.exports=controllerUser;