const express= require('express');
const controladorAdmin= {

    login:(req,res)=>{
      return res.render("login")
    }
};
module.exports=controladorAdmin;