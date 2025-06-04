

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  getPanier,
  supprimerDuPanier,
  viderPanier,
} from '../../JS/actions/panier.action';
import { validerCommande} from '../../JS/actions/commande.action';
import { Button } from 'react-bootstrap';
import { FaTrash, FaCheck } from 'react-icons/fa';
import './panier.css'; 

const Panier = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoad = useSelector((state) => state.panierReducer.isLoad);
  const panier = useSelector((state) => state.panierReducer.panier);
  const panierId = useSelector((state) => state.panierReducer.panierId);
  const user = useSelector((state) => state.userReducer.user);
  const userId = user?._id;

  useEffect(() => {
    dispatch(getPanier());
  }, [dispatch]);

  const handleValiderCommande = async () => {
    await dispatch(validerCommande());
    navigate('/commande');
    
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
    variant="danger"
    onClick={handlevide}
    className="btn-panier-custom"
  >
    <FaTrash style={{ marginRight: '8px' }} />
    Vider le panier
  </Button>

  <Button
    variant="success"
    onClick={handleValiderCommande}
    className="btn-panier-custom"
  >
    <FaCheck style={{ marginRight: '8px' }} />
    Valider la commande
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
