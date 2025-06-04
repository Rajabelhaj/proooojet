
const express = require("express");

const { getAllCommandes, getMyCommande, commanderDepuisPanier, confirmerCommande,supprimerCommande } = require("../controllers/commandeController");
const isAuth = require("../middlewares/isAuth");
const isAdmin = require("../middlewares/isAdmin");
const router = express.Router();


//route pour creer une commande
//router.post('/creer', isAuth, creerCommande);

//route pour voir ma commande
router.get('/myorder', isAuth, getMyCommande );




//route pour getallcommandes : visualiser toutes les commandes (l'admin seulement )
router.get("/allcommandes", isAdmin,  getAllCommandes);


//route pour valideer la commande depuis le panier
router.post('/valider', isAuth,  commanderDepuisPanier);



//route pour confirmer la commande
router.put('/confirmer/:id', isAuth, confirmerCommande);

//route pour supprimer une commande avnt la confirmation finale
router.delete("/supprimer/:id", isAuth, supprimerCommande);



module.exports = router;




