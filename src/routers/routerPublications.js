const express= require('express');
const routerPublications= express.Router();

const controladorPublicaciones= require('../controllers/controllerPublications');
const upload = require('../middlewares/mdMulterPublication');


// General
routerPublications.get('/publication',controladorPublicaciones.publicaciones)
routerPublications.get('/publication/id:',controladorPublicaciones.publicacionesDetalle)

//Crear
routerPublications.get('/publication/create',controladorPublicaciones.create)
routerPublications.post('/publication/create',upload.single('imagePublication'),controladorPublicaciones.createPost)

//Editar
routerPublications.get('/publication/edit/:id',controladorPublicaciones.edit)
routerPublications.put('/publication/:id',controladorPublicaciones.editPut)

//Eliminar
routerPublications.delete('/delete/:id',controladorPublicaciones.delete)

module.exports=routerPublications