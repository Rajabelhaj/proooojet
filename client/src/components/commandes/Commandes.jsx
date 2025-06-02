
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCommandes  } from '../../JS/actions/commande.action';
import './commandes.css'; 

const Commandes = () => {
  const dispatch = useDispatch();

  // Récupérer les commandes et le user
  const isLoad = useSelector((state) => state.commandeReducer.isLoad);
  const commandes = useSelector((state) => state.commandeReducer.commandes);
  const user = useSelector((state) => state.userReducer.user);
  const userId = user?._id;

  // Charger les commandes à l'affichage
  useEffect(() => {
    
      dispatch(getAllCommandes());
  
  }, [dispatch, ]);

  if (isLoad) return <p>Chargement des commandes...</p>;
//console.log("commandes", commandes);
  return (
    <div className="commandes-container">
      <h2>Mes Commandes</h2>
      {commandes && commandes.length > 0 ? (
        <ul className="commande-liste">
          {commandes.map((cmd) => (
            <li key={cmd._id} className="commande-item">
              <h4>
                Commande du {new Date(cmd.dateCommande).toLocaleDateString()}
              </h4>
              <p>
                Status : <strong>{cmd.statut}</strong>
              </p>
              <ul>
                {cmd.items.map((item) => (
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
