const User = require("../models/User");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

exports.register = async (req, res)=> {
    try {
        //décortiquer la requete:
      const { name, email, password, phone }= req.body;
      //console.log(req.body);
      //recherche par mail
     
      const foundUser = await User.findOne({ email });
      if (foundUser) {
       return res
        .status(400)
        .json({errors: [{msg: "cet email existe déja"}]});
      }
      //mail nouveau
      //cryptage du mot de passe
    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(password, saltRounds);
    //register
      const newUser = new User({name, email, password: hashPassword, phone});
      await newUser.save();
      //token
      const token = jwt.sign({id:newUser._id}, process.env.SECRET_KEy, {expiresIn: "2h",});
 // response
      res.status(200).json({success:[{msg: "register successfully"}], user:newUser, token});
    } catch (error) {
        res.status(400).json({errors:[{msg: "Can't register"}], error});
        
    }
};

//login 
exports.login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const foundUser = await User.findOne({email})
        if (!foundUser) {
            return res.status(400).json({errors:[{msg:"Email ou mot de passe incorrect 1"}]});
        }
        const checkPassword = await bcrypt.compare(password, foundUser.password)
        if(!checkPassword) {
            return res.status(400).json({errors: [{msg: "Email ou mot de passe incorrect 2"}]});
        }
        const token = jwt.sign({ id: foundUser._id}, process.env.SECRET_KEY, {expiresIn: "2h", });
        res.status(200).json({success:[{msg: "Login successfully"}], user:foundUser, token});

    } catch (error) {
        res.status(400).json({errors:[{msg: "Can't Login"}], error});
    }
};
