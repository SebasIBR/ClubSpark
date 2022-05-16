const express = require('express');
const routerUser= express.Router()
const controladorUser= require('../controllers/controllerUser')

// Formulario Login
routerUser.get('/', controladorUser.login)
routerUser.post('/',controladorUser.loginPost)
// Formulario Register
routerUser.get('/register',controladorUser.register)
routerUser.post('/register',controladorUser.registerPost)
// Perfil de Usuario
routerUser.get('/profile',controladorUser.profile)

module.exports= routerUser;