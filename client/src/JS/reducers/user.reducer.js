//import
import { DELETE_USER, FAIL_USER, GET_ALL_USERS, GET_USER, LOAD_USER } from "../actionType/user.actionType";

//initialisation de state
const initialState = {
    users: [],
    user: {},
    isLoadUser: false,
    errors: [],
    
};

//fonction pure
const userReducer = (state=initialState, {type, payload}) => {
    switch (type) {
        case LOAD_USER : 
        return {...state, isLoadUser: true};
         case GET_ALL_USERS:
        return  {...state, isLoadUser: false, users:payload};
        case GET_USER :
            return {...state, isLoadUser:false, user:payload};
        case DELETE_USER :
            const newListUser = state.users.filter((el) => el._id !== payload);
            return {...state, isLoadUser: false, users:newListUser};
        case FAIL_USER :
            return {...state, isLoadUser:false, errors:payload};

        default:
            return state;
           
}
};
export default userReducer;
