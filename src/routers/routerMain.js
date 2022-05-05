const express = require('express')
const routerMain= express.Router()
const controllerMain= require('../controllers/controllerMain')

routerMain.get('/', controllerMain.main)

module.exports= routerMain;