//import

import { ADD_PRODUCT, DELETE_PRODUCT, EDIT_PRODUCT, FAIL_PRODUCTS, GET_MYPRODUCT, GET_ONEPRODUCT, GET_PRODUCTS, LOAD_PRODUCT } from "../actionType/product.actionType";






//initialisation
const initialState = {
    isLoadP : false,
    products: [],
    myprod: [],
    prod: {},
    errors: [],
};






//fonction pure
const productReducer = (state = initialState, {type,payload}) => {
    switch (type) {
        case LOAD_PRODUCT: return{...state, isLoadP:true};
            
         case GET_PRODUCTS: return {...state, isLoadP:false, products:payload}; 
         
         case FAIL_PRODUCTS: return {...state, isLoadP:false, errors: payload};
    
         case GET_ONEPRODUCT: return {...state, isLoadP: false, prod: payload};

         case ADD_PRODUCT: return {...state, 
            isLoadP:false, 
            products: [...state.products, payload.newProd],
         
         };

         case GET_MYPRODUCT: return {...state, isLoadP:false, myProd: payload.myProdList };

        case EDIT_PRODUCT: return {...state,
            isLoadP:false,
            products: state.products.map(prod => prod._id === payload.id ? {...prod, ...payload.prodToEdit} : prod

            ),
        };

        case DELETE_PRODUCT:
            return {...state, 
                isLoadP:false, 
                products:state.products.filter(prod => prod._id !== payload.id),
            };
                
        default:
            return state;
    }
};




//export
export default productReducer;

