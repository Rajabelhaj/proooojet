
const Commande = require("../models/Commande");
const Panier = require("../models/Panier");
const Product = require("../models/Products");
const User = require("../models/User");

// Créer une commande 
//exports.creerCommande = async (req, res) => {
 // try {
   // const  userId = req.user._id;
   //const {items, total} = req.body;
    //console.log("données recues:", {userId, items, total});
  

    //const nouvelleCommande = await Commande.create({
     // userId,
     // items,
     // total,
      //dateCommande: new Date(),
    //});

  // res.status(201).json({ message: "Commande créée", commande: nouvelleCommande });
  //} catch (err) {
    //console.error(err);
   // res.status(500).json({ message: "Erreur serveur" });
 // }
//};



// Récupérer toutes les commandes des utilisateurs (admin seulement)
exports.getAllCommandes = async (req, res) => {
  try {
    const commandes = await Commande.find()
      .populate({
        path: "userId",
        select: "name",
        options: { strictPopulate: false },
      })
      .populate({
        path: "items.produitId", 
        select: "title price",
        options: { strictPopulate: false },
      });

    res.status(200).json(commandes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};



//voir ma propre commandes
exports.getMyCommande = async (req, res) => {
    try {
        const macommandeList = await Commande.find({userId: req.user._id}).populate("items.produitId", null, "product");
        if(!macommandeList || macommandeList.length === 0) return (
          res.status(400).json({msg: "vous n'avez pas de commande"})
        )

        res.status(200).json({msg:"la liste des produits commandés:", macommandeList});
        
    } catch (error) {
        res.status(400).json({msg: "Impossible de trouver la commande", error}); 
    }
};


// Créer une commande à partir du panier (validation du commande)
exports.commanderDepuisPanier = async (req, res) => {
  try {
    const userId = req.user._id;

    // 1. Récupérer le panier de l'utilisateur
    const panier = await Panier.findOne({ userId });

    if (!panier || panier.items.length === 0) {
      return res.status(400).json({ message: "Panier vide" });
    }

  

    // 2. Calculer le total en récupérant le prix de chaque produit
    let total = 0;
    for (const item of panier.items) {
      const produit = await Product.findById(item.produitId);
      if (!produit) {
        return res.status(400).json({ message: `Produit introuvable: ${item.produitId}` });
      }
      //console.log( produit);
    
      total += produit.price * item.quantité;  
    }

    // 3. Créer la commande avec les items et total calculé
    const nouvelleCommande = await Commande.create({
      userId,
      items: panier.items.map(item => ({
        produitId: item.produitId,
        quantité: item.quantité
      })),
      total,
      statut: "en attente",
      dateCommande: new Date(),

    });

    // 4. Vider le panier
    panier.items = [];
    await panier.save();

    res.status(201).json({ message: "Commande créée à partir du panier", commande: nouvelleCommande });
  } catch (err) {
    //console.error("Erreur validation panier:", err);
    res.status(500).json({ message: "Erreur lors de la validation du panier", error: err.message });
  }
};

//confirmation de la commande
exports.confirmerCommande = async (req, res) => {
  try {
    const commande = await Commande.findById(req.params.id);
    if (!commande) return res.status(404).send("Commande non trouvée");

    commande.isConfirmed = true;
    await commande.save();

    res.send({ message: "Commande confirmée avec succès", commande });
  } catch (error) {
    res.status(500).send("Erreur lors de la confirmation de commande");
  }
};


// Supprimer une commande
exports.supprimerCommande = async (req, res) => {
  try {
    const commande = await Commande.findById(req.params.id);

    if (!commande) {
      return res.status(404).json({ msg: "Commande introuvable" });
    }

    

    await Commande.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: "Commande supprimée avec succès" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Erreur serveur" });
  }
};

