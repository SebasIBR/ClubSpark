const express= require('express');
let db=require('../../database/models')
const bcrypt = require('bcryptjs')



const controllerUser= {
     login:(req,res)=>{
      return res.render("login")
    },

    loginPost:(req,res)=>{
      (async()=>{
        const usertologin= await db.users.findOne({where:{id: req.body.emailLogin}})
        if(usertologin !== null){
          if(!bcrypt.compareSync(req.body.passwordLogin,usertologin.password))
          {
            req.boy.passwordLogin = null;
            return res.render("login", {errors: {contrasenausuario: "Contraseña incorrecta"}, old: req.body});
          }else{
            req.session.users=usertologin;
            res.cookie("email",usertologin.email,{maxAge:1000*60}*30)
            return res.redirect("profile")
          }
        }
      })()
 
    },
    register:(req,res)=>{
      return res.render("register")
    },
    registerPost:(req,res)=>{
      (async () => {
        let u = await db.users.findOne({where: {username: req.body.userName}});
        if (u === null)
        {
            const [new_user, created] = await db.users.findOrCreate({
                where: {email: req.body.emailRegister},
                defaults: {
                    username: req.body.userName,
                    email: req.body.emailRegister,
                    password: bcrypt.hashSync(req.body.passwordRegister, 10),
                    type: req.body.type,
                    image: req.file.filename
                }});
            
            if (created)
            {
                req.session.user = new_user;
                
                res.cookie("email", new_user.email,{maxAge:(1000*60)*30})

                return res.redirect("profile");
            }
            else
                return res.render("register", {errors: {emailusuario:  "Este E-mail ya esta registrado"}, old: req.body});
        }
        else
            return res.render("register", {errors: {nombreusuario: "Este nombre de usuario ya se encuentra en uso"}, old: req.body});
    })();








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