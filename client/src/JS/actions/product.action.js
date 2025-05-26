import { ADD_PRODUCT, DELETE_PRODUCT, EDIT_PRODUCT, FAIL_PRODUCTS, GET_MYPRODUCT, GET_ONEPRODUCT, GET_PRODUCTS, LOAD_PRODUCT } from "../actionType/product.actionType"
import axios from "axios";



export const  getAllProd = () => async (dispatch) => {
    dispatch({type: LOAD_PRODUCT});
    try {
        const result = await axios.get('/api/products/allProd');
dispatch ({type: GET_PRODUCTS, payload: result.data.listProd});

    } catch (error) {
        dispatch({type: FAIL_PRODUCTS, payload: error.response.data});
        
    }
};

export const getOneProd = (id) => {

return  async (dispatch) => {
    dispatch({type: LOAD_PRODUCT});
    try {
        const result = await axios.get(`/api/products/${id}`);
        dispatch({type: GET_ONEPRODUCT, payload: result.data.prodToGet});

    } catch (error) {
       dispatch({type: FAIL_PRODUCTS, payload: error.response.data}); 
    }
}
};

export const addProd = (newProd) => async (dispatch) => {
    dispatch({ type: LOAD_PRODUCT});
    try {
        let config = {
            headers: {
                authorization: localStorage.getItem("token"),
            },
        };
       const result = await axios.post("/api/products/addProd", newProd, config); 
       dispatch({type: ADD_PRODUCT, payload: result.data});
   dispatch(getMyProd());
   
    } catch (error) {
        dispatch({type: FAIL_PRODUCTS, payload: error.response.data}); 
    }
};

//
export const  getMyProd = () => async (dispatch) => {
    dispatch({type:LOAD_PRODUCT});
    try {
        let config = {
            headers: {
                authorization: localStorage.getItem("token"),
            },
        };
        const result = await axios.get("/api/products/myProd", config);
        dispatch({type:GET_MYPRODUCT, payload: result.data})

    } catch (error) {
        dispatch({type: FAIL_PRODUCTS, payload: error.response.data});  
    }
};

export const editProd=(id, prodToEdit) => async(dispatch) => {
 dispatch({type: LOAD_PRODUCT});
 try {
    let config = {
        headers:{authorization: localStorage.getItem("token")},
    };
    const result = await axios.put(`/api/products/${id}`, prodToEdit, config);
    
dispatch({type:EDIT_PRODUCT, payload:result.data});
 dispatch(getMyProd());
} catch (error) {
    dispatch({type:FAIL_PRODUCTS, payload:error.response.data});
 }
};

export const deleteProd = (id) => async(dispatch) => {
    dispatch({ type:LOAD_PRODUCT});
    try {
        let config = {
            headers:{ authorization:localStorage.getItem("token")},
        };
        const result = await axios.delete(`/api/products/${id}`, config);
        
    dispatch({ type:DELETE_PRODUCT, payload: result.data});
    dispatch(getMyProd());
} catch (error) {
        dispatch({type:FAIL_PRODUCTS, payload:error.response.data});
 
    }

};

