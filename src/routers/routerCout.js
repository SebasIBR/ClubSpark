const express = require('express');
const routerCout= express.Router()

const controladorCout= require('../controllers/controllerCout')

routerCout.get("/cout",controladorCout.lista)

module.exports= routerCout