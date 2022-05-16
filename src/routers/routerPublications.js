const express= require('express');
const routerPublications= express.Router();
const controladorPublicaciones= require('../controllers/controllerPublications')


// General
routerPublications.get('/publication',controladorPublicaciones.publicaciones)
routerPublications.get('/publication/id:',controladorPublicaciones.publicacionesDetalle)

//Crear
routerPublications.get('/publication/create',controladorPublicaciones.create)
routerPublications.post('/publication/create',controladorPublicaciones.createPost)

//Editar
routerPublications.get('/publication/edit/:id',controladorPublicaciones.edit)
routerPublications.put('publication/:id',controladorPublicaciones.editPut)

//Eliminar
routerPublications.delete('/publication/delete/:id',controladorPublicaciones.deleteP)

module.exports=routerPublications