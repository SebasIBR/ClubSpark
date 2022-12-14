const express=require('express');
let db=require('../../database/models')
const controllerPublications={

    publicaciones:(req,res)=>{
        (async()=>{
            const usu = await db.users.findAll();
            const publication = await db.publication.findAll();
            if (publication === null){
                return res.render('not-found', {errno: 404, errmsg: "El indice no corresponde a ningun producto"});
            }
            return res.render("publication",{usu:usu,publication:publication})
        })()
    },
    publicacionesDetalle:(req,res)=>{
        
    },
    create:(req,res)=>{
        res.render("createPublications")

    },
    createPost:(req,res)=>{
        (async()=>{
            db.publication.create({
                id:0,
                image: req.file.filename,
                description:req.body.description,
                user_id:req.params.id
            })
            return res.redirect("/publication");
        })()     
    },
    edit:(req,res)=>{
        (async()=>{
            let publicacion= await db.publication.findOne({where:{id:req.params.id}});

            if(publicacion===null)
                return res.render("not-found"),{errno: 404, errmsg: "El indice no corresponde a ningun producto"}
            else
                return res.render("editPublication",{publicacion:publicacion})
        })()
    },
    editPut:(req,res)=>{
        (async ()=>{
        let p = await db.publication.findOne({where:{id: req.params.id}});
        if (p===null)
            return res.render('not-found', {errno: 404, errmsg: "El indice no corresponde a ningun producto"});
        p.description=req.body.description;
        p.save();
        return res.redirect("/publication")
        })()
    },
    delete:(req,res)=>{
        db.publication.destroy({where:{id: req.params.id,}})

/*         (async()=>{
            let p = await db.publication.findOne({where:{id: req.params.id}});
            if (p === null)
            return res.render('not-found', {errno: 404, errmsg: "El indice no corresponde a ningun producto"});  
            p.destroy();
            return res.redirect('/publication')
        })() */
    }
}
module.exports=controllerPublications