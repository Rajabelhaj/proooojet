
import {
  LOAD_COMMANDE,
  GET_ALLCOMMANDES,
  FAIL_COMMANDE,
  CREER_COMMANDE,
  VALIDER_COMMANDE,
  GET_MYCOMMANDE,
} from "../actionType/commande.actionType";

const initialState = {
  isLoad: false,
  commandes: [],
  errors: [],
};

const commandeReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOAD_COMMANDE:
      return { ...state, isLoad: true };

    case GET_ALLCOMMANDES:
      return { ...state, isLoad: false, commandes: payload, errors:[] };

    case GET_MYCOMMANDE:
      return {...state, isLoad: false, commandes:payload.macommandeList}
      

    case CREER_COMMANDE:
      return {
        ...state,
        isLoad: false,
        commandes: [...state.commandes, payload],
      };

    case VALIDER_COMMANDE:
      return {
        ...state,
        isLoad: false,
        commandes: state.commandes.map((cmd) =>
          cmd._id === payload._id ? payload : cmd
        ),
      };

    case FAIL_COMMANDE:
      return { ...state, isLoad: false, errors: payload };

    default:
      return state;
  }
};

export default commandeReducer;
