import {
  LOAD_COMMANDE,
  GET_ALLCOMMANDES,
  FAIL_COMMANDE,
  VALIDER_COMMANDE,
  GET_MYCOMMANDE,
  CONFIRMER_COMMANDE,
  SUPPRIMER_COMMANDE,
} from "../actionType/commande.actionType";

const initialState = {
  isLoad: false,
  commandes: [],
  message: "", 
  errors: [],
};

const commandeReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOAD_COMMANDE:
      return { ...state, isLoad: true };

    case GET_ALLCOMMANDES:
      return { ...state, isLoad: false, commandes: payload, errors: [] };

    case GET_MYCOMMANDE:
      return { ...state, isLoad: false, commandes: payload.macommandeList };

    case VALIDER_COMMANDE:
      return {
        ...state,
        isLoad: false,
        commandes: state.commandes.map((cmd) =>
          cmd._id === payload._id ? payload : cmd
        ),
      };

    case CONFIRMER_COMMANDE:
      return {
        ...state,
        isLoad: false,
        message: "✅ Commande confirmée avec succès",
      };

    case SUPPRIMER_COMMANDE:
      return {
        ...state,
        isLoad: false,
        commandes: state.commandes.filter(cmd => cmd._id !== payload.id),
        message: "🗑️ Commande supprimée avec succès",
      };

    case FAIL_COMMANDE:
      return { ...state, isLoad: false, errors: payload };

    default:
      return state;
  }
};

export default commandeReducer;
