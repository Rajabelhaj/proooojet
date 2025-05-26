import { DELETE_USER, FAIL_USER, GET_ALL_USERS, GET_USER, LOAD_USER } from "../actionType/user.actionType";
import axios from "axios";



//pour avoir la liste des utilisateurs
export const getUsers = () => async(dispatch) => {
    dispatch({type: LOAD_USER});
    try {
        
        let config = {
            headers: {
                authorization : localStorage.getItem("token"),
            },
        };
        const result = await axios.get("/api/users/all", config);
        //console.log(result)
        dispatch({type: GET_ALL_USERS, payload:result.data.listUsers})
    } catch (error) {
        dispatch({ type: FAIL_USER, payload: error.response.errors});
    }
};
//pour avoir un seul utilisateur

export const getOneUser = (id) => async (dispatch) => {
    dispatch({type: LOAD_USER});
    try {
        let config = {
            headers: {
                authorization : localStorage.getItem("token"),
            },
        };
        const result = await axios.get(`/api/users/${id}`, config);
        dispatch({type: GET_USER, payload:result.data.userToGet});
    } catch (error) {
        dispatch({ type: FAIL_USER, payload: error.response.errors});
    }
};

//suppression de l'utilisateur

export const deleteUser = (id) => async (dispatch) => {
    try {
        let config = {
            headers: {
                authorization : localStorage.getItem("token"),
            },
        };
        const result = await axios.delete(`/api/users/${id}`, config);
        dispatch({type: DELETE_USER, payload:result.data.userToDel});
        dispatch(getUsers());
    } catch (error) {
        dispatch({ type: FAIL_USER, payload: error.response.errors});
        
}

};