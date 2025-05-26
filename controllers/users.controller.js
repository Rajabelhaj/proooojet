const User = require("../models/User");
const Products = require("../models/Products");


exports.getAllUsers = async (req, res) => {
    try {
        const listUsers = await User.find()
        res.status(200).json({success: {msg: "La liste des utilisateurs" }, listUsers});
    } catch (error) {
        res.status(400).json({errors: {msg: "liste introuvable"}})
    }
};

exports.getOne = async (req, res) => {
    try {
        const { id } = req.params;
        const userToGet = await User.findById(id);
        if(!userToGet) {
            return res.status(400).json({errors: {msg: "cet utilisateur n'existe pas"}});
        }
        res.status(200).json({success: { msg: "utilisateur est :!"}, userToGet, });
        } catch (error) {
        res.status(400).json({errors: {msg: "impossible de trouver"}});
    }
};


exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const userToDel = await User.findByIdAndDelete(id);
        if(!userToDel) {
            return res.status(400).json({errors: {msg: "cet utilisateur n'existe pas"}});

        }
        //suupprimer ses produits
        await Products.deleteMany({ addedBy: id });
        res.status(200).json({success: { msg: "suppression réussite!"}, userToDel, 
        });
        } catch (error) {
        res.status(400).json({errors: {msg: "impossible de supprimer"}});
    }
};