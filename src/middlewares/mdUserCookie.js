const fs = require('fs');
const path = require('path');
const users = JSON.parse(fs.readFileSync(path.join(__dirname, '../../data/user.json'), 'utf-8'));

const userCookie =(req,res,next)=>{
    res.locals.isUserLogged=false;

    if(req.cookies.email !==undefined){
        const usertologin= users.find(oneuser=>oneuser.email===req.body.emailLogin)
        req.session.userdb=usertologin;
        res.locals.isUserLogged=true;
    }
    next();

}
module.exports= userCookie