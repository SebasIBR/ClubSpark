const express= require('express');
const db=require('../../database/models')
const bcrypt = require('bcryptjs')

const controllerUser= {

  register: (req,res)=>{
    return res.render("register")
  },
  registerPost: (req,res)=>{
    const newUser = {
      username:req.body.userName,
      email: req.body.emailRegister,
      password: bcrypt.hashSync(req.body.passwordRegister,10),
      type: req.body.type,
      image: req.file.filename
    }
    db.users.create(newUser)

    return res.redirect("/")
  },
  login:(req,res)=>{
    return res.render("login")
  },
  loginPost:(req,res)=>{
    (async()=>{
    const userToLogin = await db.users.findOne({where:{email:req.body.emailLogin}})

    if (userToLogin === null){
      return res.send("No existe el usuario")

    }
    if(userToLogin !== null){
      const isPasswordOK= bcrypt.compareSync(req.body.passwordLogin,userToLogin.password)

      if(!isPasswordOK){
        return res.send("las contraseñas no coinciden")
      }
      delete userToLogin.password
      req.session.user =userToLogin
      return res.redirect("/profile")
    }
    })()
  },
  profile:(req,res)=>{
   return res.render("profile",{userData:req.session.user});

  }
};
module.exports=controllerUser;