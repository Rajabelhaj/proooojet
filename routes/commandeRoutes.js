
const express = require("express");

const {creerCommande, getCommandes, commanderDepuisPanier } = require("../controllers/commandeController");
const isAuth = require("../middlewares/isAuth");
const router = express.Router();


//route pour creer une commande
router.post('/creer', isAuth, creerCommande);

//route pour voir la commande
router.get('/', isAuth, getCommandes);

//route pour valideer la commande
router.post('/valider/:id', isAuth,  commanderDepuisPanier);

module.exports = router;

