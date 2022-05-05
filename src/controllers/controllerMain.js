const express= require('express');
const controlador= {

    main:(req,res)=>{
      return res.render("main")
    }
};
module.exports=controlador;