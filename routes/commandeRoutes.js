
const express = require("express");

const {creerCommande, getAllCommandes, getMyCommande, commanderDepuisPanier } = require("../controllers/commandeController");
const isAuth = require("../middlewares/isAuth");
const isAdmin = require("../middlewares/isAdmin");
const router = express.Router();


//route pour creer une commande
router.post('/creer', isAuth, creerCommande);

//route pour voir ma commande
router.get('/myorder', isAuth, getMyCommande );




//route pour getallcommandes : visualiser toutes les commandes (l'admin seulement )
router.get("/allcommandes", isAdmin,  getAllCommandes);


//route pour valideer la commande
router.post('/valider/:id', isAuth,  commanderDepuisPanier);

module.exports = router;

//option admin: update status


