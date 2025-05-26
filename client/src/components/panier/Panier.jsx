import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPanier, supprimerDuPanier, viderPanier } from '../../JS/actions/panier.action';

const Panier = () => {
  const dispatch = useDispatch();
  const userId = localStorage.getItem("userId"); // ou via Redux si connecté
  const { panier, isLoad } = useSelector(state => state.panierReducer);

  useEffect(() => {
    if (userId) {
      dispatch(getPanier(userId));
    }
  }, [dispatch, userId]);

  if (isLoad) return <p>Chargement...</p>;

  return (
    <div>
      <h2>Mon Panier</h2>
      {panier && panier.produits && panier.produits.length > 0 ? (
        <div>
          <ul>
            {panier.produits.map((item) => (
              <li key={item._id}>
                {item.produitId?.title} - {item.quantité}
                <button onClick={() => dispatch(supprimerDuPanier(userId, item.produitId._id))}>
                  Supprimer
                </button>
              </li>
            ))}
          </ul>
          <button onClick={() => dispatch(viderPanier(userId))}>Vider le panier</button>
        </div>
      ) : (
        <p>Votre panier est vide.</p>
      )}
    </div>
  );
};

export default Panier;
