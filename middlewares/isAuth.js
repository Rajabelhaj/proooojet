const jwt = require("jsonwebtoken");
const User = require("../models/User");


const isAuth = async(req, res, next) =>{
    try {
        //token existe ou non
        const token = req.headers["authorization"];
        if(!token) {
            return res.status(400).json({errors:[{msg: "Pas de token"}]});
        }
        //user qui lui correspond a ce token
        const decode = jwt.verify(token, process.env.SECRET_KEY);
        const foundUser = await User.findOne({_id:decode.id});
        if(!foundUser) {
            return res.status(400).json({errors:{msg: "utilisateur introuvable"}});
        }
        req.user = foundUser;
        next();
    } catch (error) {
      res.status(400).json({errors:{msg: "impossible de vérifier"}, error}); 
    }
};
module.exports = isAuth;