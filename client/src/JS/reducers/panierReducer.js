
import {
  LOAD_PANIER,
  GET_PANIER,
  FAIL_PANIER,
  VIDER_PANIER,
  SUPPRIMER_PRODUIT_PANIER,
  AJOUTER_AU_PANIER,
} from "../actionType/panier.actionType";

const initialState = {
  isLoad: false,
  panier: { items: [] }, // toujours un objet avec une clé items
  errors: [],
  panierId:null
};

const panierReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOAD_PANIER:
      return { ...state, isLoad: true };

    case GET_PANIER:
     // console.log(payload);
      return { ...state, isLoad: false, panier: payload.items, panierId:payload._id};
      

    case AJOUTER_AU_PANIER:
      //console.log(initialState.panier);
      // on suppose que l’action `ajouterAuPanier` fait un getPanier après ajout
      return { ...state, isLoad: false, panier: payload.panier.items };


    case VIDER_PANIER:
      return { ...state, isLoad: false, panier: { items: [] } };

    case SUPPRIMER_PRODUIT_PANIER:
     // console.log(payload);
      //console.log(payload.panier.items[0].produitId);
      return {
        ...state,
        isLoad: false,
        panier: 
           state.panier.filter(
            (item) => 
              item.produitId._id !== payload.panier.items[0].produitId
            //console.log(item.produitId._id)
          ),
       
      };

    case FAIL_PANIER:
      return { ...state, isLoad: false, errors: payload };

    default:
      return state;
  }
};

export default panierReducer;
