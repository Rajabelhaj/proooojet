import { CLEAR_ERROR, CLEAR_SUCCESS, CURRENT_AUTH, FAIL_AUTH, LOAD_AUTH, LOGOUT_AUTH, SUCCESS_AUTH } from "../actionType/auth.actionType";
import axios from 'axios';


//l'action qui se déclenche une fois une personne veut s'enregistrer
export const register = (newUser, navigate) => async(dispatch) => {
   dispatch({type:LOAD_AUTH});
   
    
   try {
   // console.log(newUser);
       const result = await axios.post('/api/auth/register', newUser); 
       dispatch({type:SUCCESS_AUTH, payload: result.data });
       navigate("/profile");
    } catch (error) {
        dispatch({type:FAIL_AUTH, payload: error.response.data.errors});
    }
};

//l'action qui se déclenche une fois une personne veut se connecter(login)
export const login = (user, navigate) => async(dispatch) => {
    dispatch({type:LOAD_AUTH});
    try {
        const result = await axios.post("/api/auth/login", user);
        dispatch({type:SUCCESS_AUTH, payload: result.data});
        navigate("/profile");
    } catch (error) {
        dispatch({type: FAIL_AUTH, payload: error.response.data.errors});
    }
};

//action current pour vérifier l'utilisateur connecté

export const current = () => async(dispatch) =>{
    dispatch({ type: LOAD_AUTH});
    try {
       let config = {
        headers: {
            authorization: localStorage.getItem("token"),
        },
       } ;
       const result = await axios.get("/api/auth/current", config);
       dispatch({type: CURRENT_AUTH, payload: result.data});
    } catch (error) {
        dispatch({type: FAIL_AUTH, payload: error.response.data.errors});
    }
};

//logout : se déconnecter

export const logout = (navigate) => (dispatch) =>{
    dispatch({type: LOGOUT_AUTH});
    navigate("/");
};


export const clearError = () => {
    return {
       type: CLEAR_ERROR 
    }
};


export const clearSucess = () => {
    return {
       type: CLEAR_SUCCESS
    }
};