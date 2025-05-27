
const express = require("express");

const {ajouterAuPanier, getPanier, viderPanier, supprimerProduitDuPanier} = require("../controllers/panierController");
const isAuth = require("../middlewares/isAuth");
const router = express.Router();


// route pour ajouter un produit au panier(il faut q'il soit authentifié)
router.post('/ajouter/:produitId', isAuth, ajouterAuPanier);


//route pour voir les produits dans le panier

router.get('/', isAuth,  getPanier);

// route pour vider le panier
router.delete("/vider/:id",isAuth,  viderPanier);


//  route pour Supprimer un produit du panier (le mien)
router.delete("/supprimer/:id/:produitId", isAuth, supprimerProduitDuPanier);






module.exports = router;

