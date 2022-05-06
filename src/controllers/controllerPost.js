const express= require('express');
const controladorPost= {

    main:(req,res)=>{
      return res.render("main")
    }
};
module.exports=controladorPost;