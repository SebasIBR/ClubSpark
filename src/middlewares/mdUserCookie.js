const db = require('../../database/models')

const userCookie = async (req,res,next)=>{
    res.locals.isUserLogged=false;
    if(req.cookies.email !==undefined){
	await db.user.findOne({ where: { email: req.cookies.email }}).then(p =>
		{
		    const userTologin = p;
		    req.session.user=userTologin;
		    res.locals.isUserLogged=true;
            return res.redirect("/profile")
		});
        
    }
    next();

}
module.exports= userCookie
