
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCommandes } from "../../JS/actions/commande.action";

const Commandes = () => {
  const dispatch = useDispatch();

  // Remplacez cela par la vraie récupération de l'ID utilisateur (ex: depuis le token ou Redux)
  const userId = localStorage.getItem("userId");

  const { commandes, isLoadC, errors } = useSelector((state) => state.commandeReducer);

  useEffect(() => {
    if (userId) {
      dispatch(getCommandes(userId));
    }
  }, [dispatch, userId]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Mes Commandes</h2>

      {isLoadC ? (
        <p>Chargement...</p>
      ) : errors.length ? (
        <p style={{ color: "red" }}>{errors[0]?.msg || "Erreur lors du chargement des commandes"}</p>
      ) : commandes.length === 0 ? (
        <p>Aucune commande trouvée.</p>
      ) : (
        <ul className="space-y-4">
          {commandes.map((cmd) => (
            <li key={cmd._id} className="border p-4 rounded-md shadow-sm">
              <p><strong>Date:</strong> {new Date(cmd.createdAt).toLocaleString()}</p>
              <p><strong>Produits:</strong></p>
              <ul className="list-disc list-inside">
                {cmd.produits.map((item, index) => (
                  <li key={index}>
                    {item.produit?.title} - Quantité: {item.quantité}
                  </li>
                ))}
              </ul>
              <p><strong>Total:</strong> {cmd.total} €</p>
              <p><strong>Statut:</strong> {cmd.statut}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Commandes;
