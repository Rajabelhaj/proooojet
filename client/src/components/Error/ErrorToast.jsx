import React, { useEffect } from 'react';
import {toast, ToastContainer} from 'react-toastify';
import {useDispatch} from 'react-redux';
import {clearError} from "../../JS/actions/auth.action";


const ErrorToast = ({errors}) => {
  const dispatch = useDispatch()
    //console.log(errors);
    useEffect(() => {
      if(Array.isArray(errors)) {
        errors.map((error, i) =>
                   toast(error.msg, {
                   position: "top-right",
                   autoClose: 3000,
                   hideProgressBar: false,
                   closeOnClick: true,
                    theme: "light",
                    toastId: `${error.msg}-${Date.now()}`, //Id unique
            })
        );
        const timer = setTimeout(() => {
          dispatch(clearError());
        }, 3000);
        return () => clearTimeout(timer);
        }
    }, [errors, dispatch]);
    
  return (
    <div>
     <ToastContainer limit={3}/> 
    </div>
  );
};

export default ErrorToast;