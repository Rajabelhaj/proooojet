
import {
  LOAD_PANIER,
  GET_PANIER,
  FAIL_PANIER,
  VIDER_PANIER,
  SUPPRIMER_PRODUIT_PANIER,
} from "../actionType/panier.actionType";

const initialState = {
  isLoad: false,
  panier: null,
  errors: [],
};

const panierReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOAD_PANIER:
      return { ...state, isLoad: true };

    case GET_PANIER:
      return { ...state, isLoad: false, panier: payload };

    case VIDER_PANIER:
      return { ...state, isLoad: false, panier: { items: [] } };

    case SUPPRIMER_PRODUIT_PANIER:
      return {
        ...state,
        isLoad: false,
        panier: {
          ...state.panier,
          items: state.panier.items.filter(
            (item) => item.produitId._id !== payload
          ),
        },
      };

    case FAIL_PANIER:
      return { ...state, isLoad: false, errors: payload };

    default:
      return state;
  }
};

export default panierReducer;
