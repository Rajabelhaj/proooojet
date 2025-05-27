import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getPanier,
  supprimerDuPanier,
  viderPanier,
} from '../../JS/actions/panier.action';
import { creerCommande } from '../../JS/actions/commande.action';
import { Button } from 'react-bootstrap';

const Panier = () => {
  const dispatch = useDispatch();
  
  const  isLoad  = useSelector((state) => state.panierReducer.isLoad);
  //console.log(isLoad);
  const  panier  = useSelector((state) => state.panierReducer.panier);
  const panierId = useSelector((state) =>  state.panierReducer.panierId);
 // console.log(panierId);
  const user = useSelector((state) => state.userReducer.user);
  const userId = user?._id;
console.log(panier);
  useEffect(() => {
    
      dispatch(getPanier());
   }
  , [dispatch]);

  const handleValiderCommande = () => {
    if (window.confirm("Voulez-vous valider la commande ?")) {
      dispatch(creerCommande(userId));
    }
  };

  const handlevide = () => {
      if(window.confirm("Etes vous sure de vider le panier")) {
        dispatch(viderPanier(userId));
      }
      
    };


  const handleDelete = () => {
    
    };

                    

  if (isLoad) return <p>Chargement...</p>;
console.log(panier)
  return (
    <div>
      <h2>Mon Panier</h2>
      {panier && panier.length > 0 ? (
        <div>
          <ul>
            {panier.map((item) => (
              <li key={item._id}>
                {item.produitId?.title} - Quantité : {item.quantité}

                 <Button variant = "danger" onClick={() => {  if(window.confirm("Etes vous sure de supprimer ce produit?")) {
        dispatch(supprimerDuPanier(panierId, item.produitId._id));
      }
      }}> 
            supprimer l'article
            </Button>
                
              </li>
            ))}
          </ul>
         
          <Button variant = "danger" onClick={handlevide}> 
            vider le panier
            </Button>

            <Button variant = "danger" onClick={handleValiderCommande}> 
            valider la commande
            </Button>
          
        </div>
      ) : (
        <p>Votre panier est vide</p>
      )}
    </div>
  );
};

export default Panier;
