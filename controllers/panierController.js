
const Panier = require("../models/Panier");

// Ajouter un produit au panier (ou augmenter quantité si déjà présent)
exports.ajouterAuPanier = async (req, res) => {
  try {
    //const { userId, produitId, quantité } = req.body;
    const userId = req.user._id;
    const produitId = req.params.produitId;
    const {quantité} = req.body;
    //console.log(userId);
    //console.log(produitId);
    //console.log(quantité);
      //const quantitéFinale = quantité || 1;
    let panier = await Panier.findOne({userId});
  


    if (!panier) {
      // Créer un nouveau panier
      panier = new Panier({ userId, items: [{ produitId, quantité }] });
    } else {
      // Vérifier si produit déjà dans le panier
      const itemIndex = panier.items.findIndex(item => item.produitId.toString() === produitId);
     // console.log(itemIndex);
      if (itemIndex > -1) {
        panier.items[itemIndex].quantité += quantité;
      } else {
        panier.items.push({ produitId, quantité });
      }
    }

    await panier.save();
    res.status(200).json({ message: "Produit ajouté au panier", panier });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// Voir le panier d'un utilisateur
exports.getPanier = async (req, res) => {
  try {
    const  userId = req.user._id;
    //console.log(userId);
    const panier = await Panier.findOne({userId}).populate("items.produitId", null, "product");

    if (!panier) return res.status(404).json({ message: "Panier non trouvé" });
    res.status(200).json(panier);
  } catch (err) {
    
      console.error("Erreur dans getPanier:", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// Vider le panier
exports.viderPanier = async (req, res) => {
  try {
    const  userId  = req.user._id;
    const panier = await Panier.findOne({ userId });
    if (!panier) return res.status(404).json({ message: "Panier non trouvé" });
    panier.items = [];
    await panier.save();
    res.status(200).json({ message: "Panier vidé" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};
// Supprimer un produit spécifique du panier
exports.supprimerProduitDuPanier = async (req, res) => {
  try {
    const userId= req.user._id;
    const produitId = req.params;

    const panier = await Panier.findOne({ userId });
    if (!panier) return res.status(404).json({ message: "Panier non trouvé" });

    // Supprimer le produit de la liste
    panier.items = panier.items.filter(
      (item) => item.produitId.toString() !== produitId
    );

    await panier.save();
    res.status(200).json({ message: "Produit supprimé du panier", panier });
  } catch (err) {
    console.error("Erreur lors de la suppression du produit:", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

