
const mongoose = require("mongoose");

const commandeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  items: [
    {
      produitId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
        required: true,
      },
      quantité: {
        type: Number,
        required: true,
      },
    },
  ],
  total: {
    type: Number,
    required: true,
  },
  statut: {
    type: String,
    default: "en attente",
  },
  isConfirmed: {
  type: Boolean,
  default: false
},
  dateCommande: {
    type: Date,
    default: Date.now,
  },
  
});

const Commande = mongoose.model("Commande", commandeSchema);
module.exports = Commande;



