//import
import {CLEAR_ERROR, CLEAR_SUCCESS, CURRENT_AUTH, FAIL_AUTH, LOAD_AUTH,LOGOUT_AUTH,SUCCESS_AUTH} from "../actionType/auth.actionType";




//l'état initial
const initialState = {
    isLoad: false,
    user: {},
    errors: [],
    success: [],
    isAuth: false,
};


// la fonction pure
const authReducer = (state = initialState, { type, payload }) => {
switch (type) {
    case LOAD_AUTH: return { ...state, isLoad: true};

    case SUCCESS_AUTH: 
    localStorage.setItem("token", payload.token)
    return { ...state, isLoad: false, user: payload.user,
         success: payload.success, isAuth: true};

    case CURRENT_AUTH: return {...state, isLoad: false, user: payload, isAuth: true};

    case FAIL_AUTH: return {...state, isLoad: false, errors: payload};

    case LOGOUT_AUTH: 
    localStorage.removeItem("token")
    return {
        isLoad:false,
        user: {},
        errors: {},
        isAuth: false,
    };

    case CLEAR_ERROR: return {...state, errors: [] };
    case CLEAR_SUCCESS: return {...state, success: []};
   
        
    default:
        return state;
    }

};
export default authReducer;



