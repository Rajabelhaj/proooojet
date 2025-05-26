
const jwt = require('jsonwebtoken');
const User = require('../models/User');


const isAdmin = async (req, res, next) => {
    try {
       //token
       const token = req.headers["authorization"];
       if(!token) {
        return res.status(400).json({ errors: {msg: "Pas de token"}});
       } 
       const decode = jwt.decode(token, process.env.SECRET_KEY);
      const foundUser = await User.findOne({_id: decode.id});
      if(!foundUser) {
        return res.status(400)
        .json({ errors: {msg: "utilisateur introuvable"}});
    } 
    if(!foundUser.isAdmin) {
            return res.status(400)
            .json({ errors: { msg: "Tu n'es pas admin" }});
    }
    req.user = foundUser;
    next()
 } catch (error) {
     res.status(400)
        .json({ errors: {msg: "Impossible de vérifier"}, error});
 }
};

module.exports = isAdmin;
    
