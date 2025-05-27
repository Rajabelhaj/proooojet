import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCommandes } from '../../JS/actions/commande.action';

const Commandes = () => {
  const dispatch = useDispatch();

  // Accès aux données Redux
  const { commandes, isLoad } = useSelector((state) => state.commandeReducer);
  const user = useSelector((state) => state.userReducer.user); 
  const userId = user?._id;

  // Chargement des commandes à l'affichage
  useEffect(() => {
    if (userId) {
      dispatch(getCommandes(userId));
    }
  }, [dispatch, userId]);

  if (isLoad) return <p>Chargement des commandes...</p>;

  return (
    <div>
      <h2>Mes Commandes</h2>
      {commandes && commandes.length > 0 ? (
        <ul>
          {commandes.map((cmd) => (
            <li key={cmd._id}>
              <h4>Commande du {new Date(cmd.createdAt).toLocaleDateString()}</h4>
              <p>Status : <strong>{cmd.statut}</strong></p>
              <ul>
                {cmd.produits.map((item) => (
                  <li key={item._id}>
                    {item.produitId?.title} - Quantité : {item.quantité}
                  </li>
                ))}
              </ul>
              <hr />
            </li>
          ))}
        </ul>
      ) : (
        <p>Vous n'avez pas encore de commandes.</p>
      )}
    </div>
  );
};

export default Commandes;
