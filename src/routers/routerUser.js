const express = require('express');
const routerUser= express.Router()
const upload = require('../middlewares/mdMulterUser')

const controladorUser= require('../controllers/controllerUser')

/* Usuario Comun*/

// Formulario Login
routerUser.get('/', controladorUser.login)
routerUser.post('/',controladorUser.loginPost)
// routerUser.get('/logout',controladorUser.logout)
// Formulario Register
routerUser.get('/register',controladorUser.register)
routerUser.post('/register',upload.single('userImage'),controladorUser.registerPost)
// Perfil de usuario
routerUser.get('/profile',controladorUser.profile)
// routerUser.post('/profile/edit/id:',controladorUser.edit)

module.exports= routerUser;