const express = require('express');
const routerUser= express.Router()
const controladorUser= require('../controllers/controllerUser')

routerUser.get('/', controladorUser.login)
routerUser.get('/register',controladorUser.register)
routerUser.get('/profile',controladorUser.profile)

module.exports= routerUser;