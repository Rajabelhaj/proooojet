
const express = require("express");

const {ajouterAuPanier, getPanier, viderPanier, supprimerProduitDuPanier} = require("../controllers/panierController");
const isAuth = require("../middlewares/isAuth");
const router = express.Router();


// route pour ajouter un produit au panier(il faut q'il soit authentifié)
router.post('/ajouter', isAuth, ajouterAuPanier);


//route pour voir les produits dans le panier

router.get('/:userId', getPanier);

// route pour vider le panier
router.delete("/vider/:userId", viderPanier);


//  route pour Supprimer un produit du panier (le mien)
router.delete("/supprimer/:userId/:produitId", isAuth, supprimerProduitDuPanier);






module.exports = router;

