const express = require('express');
const routerUser= express.Router()
const upload = require('../middlewares/mdMulterUser')

const controladorUser= require('../controllers/controllerUser')

/* Usuario Comun*/

// Formulario Login
routerUser.get('/', controladorUser.login)
routerUser.post('/',controladorUser.loginPost)
// Formulario Register
routerUser.get('/register',controladorUser.register)/* routerUser.get('/logout',controladorUser.logout) */

routerUser.post('/register',upload.single('userImage'),controladorUser.registerPost)
// Perfil de Usuario
routerUser.get('/profile',controladorUser.profile)

/*Usuario Adminsistrador*/

routerUser.post('/profile/edit/id:',controladorUser.edit)
module.exports= routerUser;