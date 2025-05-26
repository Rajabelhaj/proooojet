
const express = require("express");
const { addProduct, getAllProd, getOneProd, getMyProd, updateProd, deleteProd } = require("../controllers/product.controller");
const isAuth = require("../middlewares/isAuth");

const router = express.Router();


//test
//router.get('/testP', (req, res) =>{
//res.status(200).json("Test de la route Produits");
//});

//route pour rajouter un produit (il faut su'il soit authentifié)
router.post('/addProd', isAuth, addProduct);

//route pour voir tous les produits (visiteurs):vitrine
router.get('/allProd', getAllProd);


//route pour voir mes produits(lorsque je fais add by)
router.get('/myProd', isAuth, getMyProd);

//route pour voir un seul produit(visiteur)
router.get('/:id', getOneProd);

//route pour mise a jour d'un produit
router.put('/:id', isAuth, updateProd);

//route pour supprimer un produit (le mien)
router.delete('/:id', isAuth, deleteProd);





module.exports = router;

