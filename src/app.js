const express = require('express');
const path = require('path'); 
const methodOverride = require('method-override'); 
const session = require('express-session');
const cookieParser= require('cookie-parser'); 
const routerMain = require('./routers/routerMain');
const routerUser= require('./routers/routerUser');
const routerPublications=require('./routers/routerPublications')
const routerCout=require('./routers/routerCout')
const cors = require('cors')

const app = express();

app.use('/public', express.static(path.resolve(__dirname, '../public')));

app.use(express.urlencoded({ extended: false }));  
app.use(express.json()); 
app.use(methodOverride('_method'));
app.use(session( {secret: "Verificacion correcta",resave: true,saveUninitialized:false,}));    
app.use(cookieParser())
app.use(cors())

/* const mdUserCookie=require('./middlewares/mdUserCookie')
app.use(mdUserCookie)
 */
app.set('view engine', 'ejs');
app.set('views', './views');

app.use('/',routerMain);
app.use('/',routerUser);
app.use('/',routerPublications)
app.use('/',routerCout)

// app.use((req,res,next)=>{
//     res.status(404).render('not-found', {errno: 404, errmsg:"Pagina no encontrada."});
// })

app.listen(process.env.PORT || 3002, function() { console.log("Servidor corriendo con exito en el puerto 3002"); })  
