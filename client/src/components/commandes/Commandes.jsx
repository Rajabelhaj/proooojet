
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getMyCommande,
  confirmerCommande,
  supprimerCommande,
} from '../../JS/actions/commande.action';
import './commandes.css';

const Commandes = () => {
  const dispatch = useDispatch();

  const isLoad = useSelector((state) => state.commandeReducer.isLoad);
  const commandes = useSelector((state) => state.commandeReducer.commandes);
  const message = useSelector((state) => state.commandeReducer.message);

  useEffect(() => {
    dispatch(getMyCommande());
  }, [dispatch]);

  if (isLoad) return <p>Chargement des commandes...</p>;

  const totalAchats = commandes?.reduce((total, cmd) => total + (cmd.total || 0), 0);

  return (
    <div className="commandes-container">
      <h2>Mes Commandes</h2>

      {message && (
        <div className="commande-message">
          <p>{message}</p>
        </div>
      )}

      {commandes && commandes.length > 0 ? (
        <ul className="commande-liste">
          {commandes.map((cmd) => (
            <li key={cmd._id} className="commande-item">
              <h4>Commande du {new Date(cmd.dateCommande).toLocaleDateString()}</h4>
              <p>
                Statut : <strong>{cmd.isConfirmed ? '✅ Confirmée' : '🕒 En attente'}</strong>
              </p>

              <ul className="commande-items">
                {cmd.items.map((item) => (
                  <li key={item._id} className="commande-produit">
                    <img
                      src={item.produitId?.image}
                      alt={item.produitId?.title}
                      className="commande-image"
                    />
                    <div className="commande-details">
                      <p><strong>{item.produitId?.title}</strong></p>
                      <p>Quantité : {item.quantité}</p>
                      <p>Prix unitaire : {item.produitId?.price} DT</p>
                    </div>
                  </li>
                ))}
              </ul>

              <p><strong>Total commande : {cmd.total} DT</strong></p>

             {!cmd.isConfirmed && (
  <div className="commande-actions">
    <button className="btn-confirmer" onClick={() => dispatch(confirmerCommande(cmd._id))}>
      Confirmer
    </button>
    <button className="btn-supprimer" onClick={() => dispatch(supprimerCommande(cmd._id))}>
      Supprimer
    </button>
  </div>
)}



              <hr />
            </li>
          ))}
        </ul>
      ) : (
        <p>Vous n'avez pas encore de commandes.</p>
      )}

      {commandes.length > 0 && (
        <div className="total-global">
          <h4>Total de toutes les commandes : {totalAchats} DT</h4>
        </div>
      )}
    </div>
  );
};

export default Commandes;
