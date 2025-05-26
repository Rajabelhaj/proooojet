import React, { useEffect } from 'react';
import {useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {getOneProd} from '../../JS/actions/product.action';

const DetailProduct = () => {
 const params = useParams();
 const dispatch = useDispatch()
const prod = useSelector(state => state.productReducer.prod);

 useEffect(() => {
dispatch(getOneProd(params.id));
 }, [params, dispatch])

  return (
    <div>
    {prod.title}
    <img src={prod.image} alt={prod.description} />
    </div>
  )
};

export default DetailProduct;


