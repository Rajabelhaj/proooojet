
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { supprimerCommande } from '../../JS/actions/commande.action';
import './listCommande.css';

const ListCommandes = () => {
  const commandes = useSelector((state) => state.commandeReducer.commandes || []);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer cette commande ?")) {
      dispatch(supprimerCommande(id));
    }
  };

  return (
    <div className="commandes-list">
      <h2>Commandes</h2>
      {commandes.length === 0 ? (
        <p>Aucune commande trouvée.</p>
      ) : (
        <ul>
          {commandes.map((cmd) => (
            <li key={cmd._id} className="commande-item">
              <p><strong>Utilisateur :</strong> {cmd.userId?.name || "Utilisateur inconnu"}</p>
              <p><strong>Date :</strong> {cmd.dateCommande ? new Date(cmd.dateCommande).toLocaleDateString() : "Date inconnue"}</p>
              <p><strong>Total :</strong> {cmd.total ?? "0"} dt</p>

              {Array.isArray(cmd.items) && cmd.items.length > 0 ? (
                <div className="produits-commandes">
                  <p><strong>Produits commandés :</strong></p>
                  <ul>
                    {cmd.items.map((item, index) => (
                      <li key={index} className="produit-item">
                        {item.produitId?.image && (
                          <img
                            src={item.produitId.image}
                            alt={item.produitId.title}
                            style={{
                              width: '60px',
                              height: '60px',
                              objectFit: 'cover',
                              marginRight: '10px',
                              borderRadius: '5px'
                            }}
                          />
                        )}
                        <span>
                          {item.produitId?.title || "Produit inconnu"} - {item.produitId?.price ?? "?"} dt (Quantité : {item.quantité})
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p><em>Aucun produit dans cette commande.</em></p>
              )}

              <button className="btn-supprimer" onClick={() => handleDelete(cmd._id)}>
                Supprimer
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ListCommandes;
