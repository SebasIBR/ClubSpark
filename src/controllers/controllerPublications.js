const express=require('express');
let db=require('../../database/models')
const controllerPublications={

    publicaciones:(req,res)=>{
        db.publication.findAll()
            .then(function(publication){
               return res.render("publication", {publication:publication})
            })
/* 
        (async()=>{
            let publication = await db.publication.findOne({where: {id: req.params.id}});
            if (publication === null)
            return res.render('not-found', {errno: 404, errmsg: "El indice no corresponde a ningun producto"});
            let lista= await db.publication.findAll({where:{id:req.params.id}});
            return res.render("publication",{publication:publication,publication_list:lista})
        })() */
    },
    publicacionesDetalle:(req,res)=>{
        
    },
    create:(req,res)=>{
        res.render("createPublications")

    },
    createPost:(req,res)=>{
        db.publication.create({
            id:0,
            image: req.body.imagePublication,
            description:req.body.description,
            user_id:1
        })
    res.redirect("/publication");
        
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
		res.redirect("/publication");
    },
    delete:(req,res)=>{
        let idPublicacionSeleccionado=req.params.id;

        let publication2=publication.filter(function(element){
            return element.id!=idPublicacionSeleccionado;
        })
        publication=publication2;

        fs.writeFileSync("../data/publication.json", JSON.stringify(publication2,null,' '));
		res.redirect("/publication");
    }
}
module.exports=controllerPublications