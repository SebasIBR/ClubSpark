const express = require('express');
const controlador = require('../controllers/controllerMain');
const routerAdmin= express.Router()
const controladorAdmin= require('../controllers/controllerAdmin')

routerAdmin.get('/login', controladorAdmin.login)

module.exports= routerAdmin;