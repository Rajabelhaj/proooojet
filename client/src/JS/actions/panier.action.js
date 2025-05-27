
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
export const getPanier = () => async (dispatch) => {
  dispatch({ type: LOAD_PANIER });
  try {
    const config = {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    };
    const result = await axios.get(`/api/panier`, config);
    dispatch({ type: GET_PANIER, payload: result.data });
  } catch (error) {
    dispatch({ type: FAIL_PANIER, payload: error.response.data });
  }
};

// ajouter au panier
export const ajouterAuPanier = ( produitId, quantité) => async (dispatch) => {
  dispatch({ type: LOAD_PANIER });
  try {
    const config = {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    };
    //console.log(produitId);
   const result = await axios.post(`/api/panier/ajouter/${produitId}`,{quantité}, config);
   //console.log(result);

    dispatch({ type: AJOUTER_AU_PANIER, payload: result.data });
    dispatch(getPanier());
  } catch (error) {
    dispatch({ type: FAIL_PANIER, payload: error.response.data });
  }
};

// supprimer un produit du panier
export const supprimerDuPanier = (id, produitId) => async (dispatch) => {
  dispatch({ type: LOAD_PANIER });
  try {
    const config = {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    };
   const result =  await axios.delete(`/api/panier/supprimer/${id}/${produitId}`, config);
    dispatch({ type: SUPPRIMER_PRODUIT_PANIER, payload: result.data });
    dispatch(getPanier());
  } catch (error) {
    dispatch({ type: FAIL_PANIER, payload: error.response.data });
  }
};

// vider le panier
export const viderPanier = (id) => async (dispatch) => {
  dispatch({ type: LOAD_PANIER });
  try {
    await axios.delete(`/api/panier/vider/${id}`);
    dispatch({ type: VIDER_PANIER });
    dispatch(getPanier());
  } catch (error) {
    dispatch({ type: FAIL_PANIER, payload: error.response.data });
  }
};
