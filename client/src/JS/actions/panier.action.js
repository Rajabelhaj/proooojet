
import axios from "axios";
import {
  LOAD_PANIER,
  GET_PANIER,
  FAIL_PANIER,
  AJOUTER_AU_PANIER,
  SUPPRIMER_PRODUIT_PANIER,
  VIDER_PANIER
} from "../actionType/panier.actionType";

// récupérer panier utilisateur
export const getPanier = (userId) => async (dispatch) => {
  dispatch({ type: LOAD_PANIER });
  try {
    const res = await axios.get(`/api/panier/${userId}`);
    dispatch({ type: GET_PANIER, payload: res.data });
  } catch (error) {
    dispatch({ type: FAIL_PANIER, payload: error.response.data });
  }
};

// ajouter au panier
export const ajouterAuPanier = (userId, produitId, quantité) => async (dispatch) => {
  dispatch({ type: LOAD_PANIER });
  try {
    const config = {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    };
    await axios.post("/api/panier/ajouter", { userId, produitId, quantité }, config);
    dispatch({ type: AJOUTER_AU_PANIER });
    dispatch(getPanier(userId));
  } catch (error) {
    dispatch({ type: FAIL_PANIER, payload: error.response.data });
  }
};

// supprimer un produit du panier
export const supprimerDuPanier = (userId, produitId) => async (dispatch) => {
  dispatch({ type: LOAD_PANIER });
  try {
    const config = {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    };
    await axios.delete(`/api/panier/supprimer/${userId}/${produitId}`, config);
    dispatch({ type: SUPPRIMER_PRODUIT_PANIER });
    dispatch(getPanier(userId));
  } catch (error) {
    dispatch({ type: FAIL_PANIER, payload: error.response.data });
  }
};

// vider le panier
export const viderPanier = (userId) => async (dispatch) => {
  dispatch({ type: LOAD_PANIER });
  try {
    await axios.delete(`/api/panier/vider/${userId}`);
    dispatch({ type: VIDER_PANIER });
    dispatch(getPanier(userId));
  } catch (error) {
    dispatch({ type: FAIL_PANIER, payload: error.response.data });
  }
};
