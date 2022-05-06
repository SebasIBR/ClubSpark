const express= require('express');
const controladorUser= {

    main:(req,res)=>{
      return res.render("main")
    }
};
module.exports=controladorUser;