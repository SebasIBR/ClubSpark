const express= require('express');
const controller= {

    main:(req,res)=>{
      return res.render("main")
    }
};
module.exports=controller;