const express = require('express');
const controlador = require('../controllers/controllerMain');
const routerAdmin= express.Router()
const controladorAdmin= require('../controllers/controllerAdmin')

routerAdmin.get('/', controladorAdmin.login)
routerAdmin.get('/register',controladorAdmin.register)

module.exports= routerAdmin;