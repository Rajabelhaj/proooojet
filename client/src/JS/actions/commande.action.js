
import axios from "axios";
import {
  LOAD_COMMANDE,
  FAIL_COMMANDE,
  CREER_COMMANDE,
  VALIDER_COMMANDE,
  GET_MYCOMMANDE,
  GET_ALLCOMMANDES,
} from "../actionType/commande.actionType";

// Obtenir toutes les commandes pour l'admin
export const getAllCommandes = () => async (dispatch) => {
  dispatch({ type: LOAD_COMMANDE });
  try {
    const config = {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    };
    const result = await axios.get(`/api/allcomamndes`, config);
    dispatch({ type: GET_ALLCOMMANDES, payload: result.data });
  } catch (error) {
    dispatch({
      type: FAIL_COMMANDE,
      payload: error.response?.data 
    });
  }
};

//get my order 
export const  getMyCommande = () => async (dispatch) => {
    dispatch({type:LOAD_COMMANDE});
    try {
        let config = {
            headers: {
                authorization: localStorage.getItem("token"),
            },
        };
        const result = await axios.get("/api/commande/myorder", config);
        dispatch({type:GET_MYCOMMANDE, payload: result.data})

    } catch (error) {
        dispatch({type: FAIL_COMMANDE, payload: error.response.data});  
    }
};





// Créer une commande à partir d’un panier
export const creerCommande = (newCommande) => async (dispatch) => {
  dispatch({ type: LOAD_COMMANDE });
  try {
    const config = {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    };
    const result = await axios.post(`/api/commande/creer`, newCommande, config);
    dispatch({ type: CREER_COMMANDE, payload: result.data.commande });
    dispatch(getMyCommande());
  } catch (error) {
    dispatch({
      type: FAIL_COMMANDE,
      payload: error.response?.data || error.message,
    });
  }
};

// Valider une commande spécifique
export const validerCommande = (id) => async (dispatch) => {
  dispatch({ type: LOAD_COMMANDE });
  try {
    const config = {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    };
    const result = await axios.post( `/api/commande/valider/${id}`,{}, config );
    dispatch({ type: VALIDER_COMMANDE, payload: result.data });
    dispatch(getMyCommande());
  } catch (error) {
    dispatch({
      type: FAIL_COMMANDE,
      payload: error.response?.data || error.message,
    });
  }
};
