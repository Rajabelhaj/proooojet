
import axios from "axios";
import {
  LOAD_COMMANDE,
  GET_COMMANDES,
  FAIL_COMMANDE,
  CREER_COMMANDE,
  VALIDER_COMMANDE,
} from "../actionType/commande.actionType";

// Obtenir toutes les commandes pour un utilisateur
export const getCommandes = (userId) => async (dispatch) => {
  dispatch({ type: LOAD_COMMANDE });
  try {
    const config = {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    };
    const res = await axios.get(`/api/commande/${userId}`, config);
    dispatch({ type: GET_COMMANDES, payload: res.data });
  } catch (error) {
    dispatch({
      type: FAIL_COMMANDE,
      payload: error.response?.data || error.message,
    });
  }
};

// Créer une commande à partir d’un panier
export const creerCommande = (userId) => async (dispatch) => {
  dispatch({ type: LOAD_COMMANDE });
  try {
    const config = {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    };
    const res = await axios.post(`/api/commande/creer/${userId}`, {}, config);
    dispatch({ type: CREER_COMMANDE, payload: res.data });
    dispatch(getCommandes(userId));
  } catch (error) {
    dispatch({
      type: FAIL_COMMANDE,
      payload: error.response?.data || error.message,
    });
  }
};

// Valider une commande spécifique
export const validerCommande = (commandeId, userId) => async (dispatch) => {
  dispatch({ type: LOAD_COMMANDE });
  try {
    const config = {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    };
    const res = await axios.put(
      `/api/commande/valider/${commandeId}`,
      {},
      config
    );
    dispatch({ type: VALIDER_COMMANDE, payload: res.data });
    dispatch(getCommandes(userId));
  } catch (error) {
    dispatch({
      type: FAIL_COMMANDE,
      payload: error.response?.data || error.message,
    });
  }
};
