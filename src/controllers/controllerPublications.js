const express=require('express');
const fs=require('fs');
const path = require('path');
let publication = JSON.parse(fs.readFileSync(path.join(__dirname, '../../data/publication.json'), 'utf-8'));


const controllerPublications={

    publicaciones:(req,res)=>{
        res.render("main")
    },
    publicacionesDetalle:(req,res)=>{
        
    },
    create:(req,res)=>{
        res.render("createPublications")

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
        let publicacion=0;

        for(let i=0;i<publication.length;i++){
            if(publication[i].id== req.params.id)
            publicacion=publication[i];
        }
        
        res.render("editPublication",{publicacion:publicacion})
    },
    editPut:(req,res)=>{
        let idPublicacionSeleccionado = req.params.id;
		for (let p of publication){
			if(p.id==idPublicacionSeleccionado){
                p.image=req.body.imagePublication;
                p.description=req.body.description;				
                break;
			}
		}

		fs.writeFileSync("../data/publication.json", JSON.stringify(publication,null,' '));
		res.redirect("/main");
    },
    delete:(req,res)=>{
        let idPublicacionSeleccionado=req.params.id;

        let publication2=publication.filter(function(element){
            return element.id!=idPublicacionSeleccionado;
        })
        publication=publication2;

        fs.writeFileSync("../data/publication.json", JSON.stringify(publication2,null,' '));
		res.redirect("/main");
    }
}
module.exports=controllerPublications