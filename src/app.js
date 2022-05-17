const express = require('express');
const path = require('path'); 
const routerMain = require('./routers/routerMain');
const routerUser= require('./routers/routerUser');
const routerPublications=require('./routers/routerPublications')
const methodOverride = require('method-override');  
const session = require('express-session');
const cookieParser= require('cookie-parser');
// const mdUserCookie=require('./middlewares/mdUserCookie')
//const ErrorMiddleware = require('./middlewares/ErrorMiddleware');
//const productosRoutes = require('./routes/productosRoutes');  // Enrutador

const app = express();
app.use('/public', express.static(path.resolve(__dirname, '../public')));

//app.use(ErrorMiddleware);   // Opcional. Aplicar middleware a nivel aplicación

//app.use(express.static(path.resolve(__dirname, './public')));
//app.use(express.static(path.resolve(__dirname, './views')));

//app.use('/');   // Definición de ruta global para un enrutador particular

app.use(session( {
    secret: "Verificacion correcta",
    resave: true,
    saveUninitialized:false,
} ));    // para definir que vas a utilizar información en sesión

app.use(express.urlencoded({ extended: false }));   // Para especificar que vamos a transferir información por el body en peticiones 
//app.use(express.json());                                               // Para especificar que vamos a transferir información por el body en peticiones 

app.use(methodOverride('_method')); // Para poder utilizar PUT o DELETE sobreescribiendo el método POST
app.use(cookieParser())
// app.use(mdUserCookie)

   
app.set('view engine', 'ejs');
app.set('views', './views');

app.use('/',routerMain);
app.use('/',routerUser);
app.use('/',routerPublications)

app.use((req,res,next)=>{
    res.status(404).render('not-found', {errno: 404, errmsg:"Pagina no encontrada."});
})


app.listen(process.env.PORT || 3002, function() { console.log("Servidor corriendo con exito"); })  // para levantar el servidor en un puerto especifico 
