const express=require('express');
const fs=require('fs');
const path = require('path');
const publication = JSON.parse(fs.readFileSync(path.join(__dirname, '../../data/publication.json'), 'utf-8'));


const controllerPublications={

    publicaciones:(req,res)=>{
        res.render("main")
    },
    publicacionesDetalle:(req,res)=>{
        
    },
    create:(req,res)=>{
        res.render("publications")

    },
    createPost:(req,res)=>{
        let newPublicationDB = publication;

        newPublicationDB.push({
            id:publication.length+1,
            image:req.body.imagePublication,
            description:req.body.description
});

fs.writeFileSync("../data/publication.json", JSON.stringify(newPublicationDB));

res.redirect("/main");
        
    },
    edit:(req,res)=>{
        
    },
    editPut:(req,res)=>{
        
    },
    deleteP:(req,res)=>{
   
    }
};
module.exports=controllerPublications