
const mongoose = require("mongoose");

const panierSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [
    {
      produitId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",  // Référence au modèle product existant
        required: true,
      },
      quantité: {
        type: Number,
        required: true,
        default: 1,
      },
    },
  ],
});

const Panier = mongoose.model("Panier", panierSchema);
module.exports = Panier;
