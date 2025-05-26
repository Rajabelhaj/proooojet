const Products = require("../models/Products");

//le rajout d'un produit
exports.addProduct = async (req, res) => {
    try {
       const newProd = new Products({ ...req.body, addedBy: req.user.id });
       await newProd.save();
       res.status(200).json({ msg: "Produit rajouté avec success", newProd});
    } catch (error) {
        res.status(400).json({msg: "Probleme est survenu lors del'ajout de ce produit", error});
    }
};

//voir tous les produits
exports.getAllProd = async (req, res) => {
    try {
        const listProd = await Products.find();
        res.status(200).json({msg: "La liste des produits", listProd});
    } catch (error) {
        res.status(400).json({msg: "Impossible de voir la liste des produits", error});
    }
};

//voir un seul produit
exports.getOneProd = async (req, res) => {
    try {
        const {id}= req.params;
        const prodToGet = await Products.findById(id);
        if(!prodToGet) {
            return res.status(404).json({msg: "Produit non trouvé"});

        }
        res.status(200).json({msg: "Le produit recherché est", prodToGet});
    } catch (error) {
        res.status(400).json({msg: "Impossible de trouver le  produit", error}); 
    }
};

//voir mes propres produits
exports.getMyProd = async (req, res) => {
    try {
        const myProdList = await Products.find({addedBy: req.user._id});
        res.status(200).json({msg:"Liste de vos produits:", myProdList});
    } catch (error) {
        res.status(400).json({msg: "Impossible de trouver vos produits", error}); 
    }
};

//mise a jour de mon produit
exports.updateProd = async(req, res) => {
    try {
        const {id} = req.params //le produit a editer
        //recherche des produits par id
        const prodToFind = await Products.findById(id);
        if(prodToFind.addedBy.toString() !== req.user._id.toString()) {
            return res.status(400).json({msg: "Vous n'avez pas le droit de l'éditer"});       }
        const prodToChange = req.body; //le changement 
        const prodToEdit = await Products.findByIdAndUpdate(id, prodToChange, {new: true});
        res.status(200).json({msg: "Produit mis a jour avec succes", prodToEdit});
    } catch (error) {
        res.status(400).json({msg: "Impossible d'editer  ce produit", error});
    }
};

//suupprimer un produit
exports.deleteProd = async (req, res) => {
    try {
        const {id} = req.params;
        

        const prodToFind = await Products.findById(id);
       
        if(!prodToFind) {
            return res.status(404).json({msg: "Produit non trouvé"})};
            if(prodToFind.addedBy.toString() !== req.user._id.toString())
    

        {
            return res.status(400).json({msg: "Vous n'avez pas le droit de le supprimer"});   
        }
const prodToDel = await Products.findByIdAndDelete(id);
res.status(200).json({msg: "produit supprimé avec succes", prodToDel})



    } catch (error) {
        res.status(400).json({msg: "Impossible de supprimer  ce produit", error}); 
    }
};


