const express = require('express');
const routerUser= express.Router()
const upload = require('../middlewares/mdMulterUser')

const controladorUser= require('../controllers/controllerUser')

/* Usuario Comun*/

// Formulario Login
routerUser.get('/', controladorUser.login)
routerUser.post('/',controladorUser.loginPost)
 routerUser.get('/user/logout',controladorUser.logout)
// Formulario Register
routerUser.get('/register',controladorUser.register)
routerUser.post('/register',upload.single('userImage'),controladorUser.registerPost)
// Perfil de usuario
routerUser.get('/profile',controladorUser.profile)
// Editar contraseña
routerUser.get('/profile/edit/:id',controladorUser.editUser)
routerUser.put('/profile/:id',controladorUser.editPutUser)

// Usuario administrador usar una vista llamada usuarios 
routerUser.get("/admin",controladorUser.adminCenter)

// Visualizador de Usuarios
routerUser.get("/admin/view",controladorUser.adminView)
// Registro de usuarios
routerUser.get('/admin/register',controladorUser.adminRegister)
routerUser.post('/admin/register',upload.single('userImageR'),controladorUser.adminRegisterPost)
// Editor de usauarios
routerUser.get('/admin/edit/:id',controladorUser.adminEditUser)
routerUser.put('/admin/:id',upload.single('userImageE'),controladorUser.adminEditPutUser)

// Api
routerUser.get('/api',controladorUser.api)




module.exports= routerUser;