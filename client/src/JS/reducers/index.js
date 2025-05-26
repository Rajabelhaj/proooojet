import {combineReducers} from 'redux';
import authReducer from './auth.reducer';
import userReducer from './user.reducer';
import productReducer from './product.reducer';
import commandeReducer from './commandeReducer';
import panierReducer from './panierReducer';


const rootReducer= combineReducers({
    authReducer, userReducer, productReducer, commandeReducer, panierReducer
});

export default rootReducer;