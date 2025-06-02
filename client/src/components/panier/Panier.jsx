

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getPanier,
  supprimerDuPanier,
  viderPanier,
} from '../../JS/actions/panier.action';
import { creerCommande } from '../../JS/actions/commande.action';
import { Button } from 'react-bootstrap';
import { FaTrash, FaCheck } from 'react-icons/fa';
import './panier.css'; 

const Panier = () => {
  const dispatch = useDispatch();

  const isLoad = useSelector((state) => state.panierReducer.isLoad);
  const panier = useSelector((state) => state.panierReducer.panier);
  const panierId = useSelector((state) => state.panierReducer.panierId);
  const user = useSelector((state) => state.userReducer.user);
  const userId = user?._id;

  useEffect(() => {
    dispatch(getPanier());
  }, [dispatch]);

  const handleValiderCommande = () => {
    if (window.confirm("Voulez-vous valider la commande ?")) {
      dispatch(creerCommande());
    }
  };

  const handlevide = () => {
    if (window.confirm("Êtes-vous sûr de vider le panier ?")) {
      dispatch(viderPanier(userId));
    }
  };

  const handleSupprimerProduit = (produitId) => {
    if (window.confirm("Êtes-vous sûr de supprimer ce produit ?")) {
      dispatch(supprimerDuPanier(panierId, produitId));
    }
  };

  if (isLoad) return <p>Chargement...</p>;

  return (
    <div className="panier-container">
      <h2>Mon Panier</h2>
      {panier && panier.length > 0 ? (
        <div>
          <ul className="panier-list">
            {panier.map((item) => (
              <li key={item._id} className="panier-item">
                <img
                  src={item.produitId?.image}
                  alt={item.produitId?.title}
                  className="panier-img"
                />
                <div className="panier-info">
                  <h5>{item.produitId?.title}</h5>
                  <p>Quantité : {item.quantité}</p>
                  
                </div>
                <Button
                  variant="outline-danger"
                  className="btn-supprimer"
                  title="Supprimer"
                  onClick={() => handleSupprimerProduit(item.produitId._id)}
                >
                  <FaTrash />
                </Button>
              </li>
            ))}
          </ul>

          <div className="panier-actions">
            <Button
              variant="outline-danger"
              onClick={handlevide}
              title="Vider le panier"
              className="btn-panier"
            >
              <FaTrash />
            </Button>

            <Button
              variant="outline-success"
              onClick={handleValiderCommande}
              title="Valider la commande"
              className="btn-panier"
            >
              <FaCheck />
            </Button>
          </div>
        </div>
      ) : (
        <p>Votre panier est vide</p>
      )}
    </div>
  );
};

export default Panier;
