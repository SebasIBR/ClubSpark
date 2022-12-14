const express= require('express');
const db=require('../../database/models')
const bcrypt = require('bcryptjs');
const res = require('express/lib/response');

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

      res.cookie("email", userToLogin.email,{maxAge:(1000*60)*30})

      return res.redirect("/profile")
    }
    })()
  },
  profile:(req,res)=>{
    
   return res.render("profile",{userData:req.session.user});

  },
  logout:(req,res)=>{
    req.session.destroy();
    res.clearCookie("email");
    res.redirect('/')
  },
  editUser:(req,res)=>{
    (async()=>{
      let usuarioedit= await db.users.findOne({where:{id:req.params.id}});
      if(usuarioedit===null)
          return res.render("not-found"),{errno: 404, errmsg: "El indice no corresponde a ningun producto"}
      else
          return res.render("editUser",{usuarioedit:usuarioedit})
          })()
  },
  editPutUser:(req,res)=>{
    (async()=>{
      let p = await db.users.findOne({where:{id:req.params.id}})
      if (p===null)
        return res.render('not-found', {errno: 404, errmsg: "El indice no corresponde a ningun producto"});
      p.password=bcrypt.hashSync(req.body.passwordEdit,10);
      p.save();
      return res.redirect("/profile")
  })()
    },
    adminCenter:(req,res)=>{
      return res.render("adminCenter")
    },
    adminView:(req,res)=>{
      (async()=>{
        let usu = await db.users.findAll();
        if (usu === null){
            return res.render('not-found', {errno: 404, errmsg: "El indice no corresponde a ningun producto"});
        }
        return res.render("adminView",{usu:usu})
    })()
    },
    adminRegister:(req,res)=>{
      return res.render("adminRegister")
    },
    adminRegisterPost:(req,res)=>{
      (async()=>{
        db.users.create({
          username:req.body.userNameR,
          email: req.body.emailRegisterR,
          password: bcrypt.hashSync(req.body.passwordRegisterR,10),
          type: req.body.typeR,
          image: req.file.filename
        })
        return res.redirect("/admin");
    })()  
    },
    adminEditUser:(req,res)=>{
      (async()=>{
        let usuarioeditar= await db.users.findOne({where:{id:req.params.id}});
        if(usuarioeditar===null)
            return res.render("not-found"),{errno: 404, errmsg: "El indice no corresponde a ningun producto"}
        else
            return res.render("adminEdit",{usuarioeditar:usuarioeditar})
            })()
    },
    adminEditPutUser:(req,res)=>{
      (async()=>{
        let p = await db.users.findOne({where:{id:req.params.id}})
        if (p===null)
          return res.render('not-found', {errno: 404, errmsg: "El indice no corresponde a ningun producto"});
        p.username= req.body.userNameE
        p.email=req.body.emailRegisterE
        p.password=bcrypt.hashSync(req.body.passwordRegisterE,10);
        p.type= req.body.typeE,
        p.save();
        return res.redirect("/admin/view")
    })()
    },
    api:(req,res)=>{
      (async () =>
      {
          let userlist = [];
          const {count,rows} = await db.users.findAndCountAll();
          rows.forEach(users =>
                       {
                           var tempuser = users.toJSON();
                           delete tempuser.password;
                           userlist.push(tempuser);
                       });
          res.send({count: count, users: userlist});
      })();
    },
  }
module.exports=controllerUser;