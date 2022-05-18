const db = require('../../database/models/users')

const userCookie = async(req,res,next)=>{
    res.locals.isUserLogged=false;

    if(req.cookies.email !==undefined){

        await db.users.findOne({ where: { email: req.cookies.email }}).then(p=>{
            const usertologin= p;
            req.session.user=usertologin;
            res.locals.isUserLogged=true;
        })
    }
    next();
}
module.exports= userCookie