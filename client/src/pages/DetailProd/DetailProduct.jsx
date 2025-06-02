import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getOneProd } from '../../JS/actions/product.action';
import './detailProd.css';  

const DetailProduct = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const prod = useSelector(state => state.productReducer.prod);

  useEffect(() => {
    dispatch(getOneProd(params.id));
  }, [params, dispatch]);

  if (!prod) return <p>Chargement...</p>;

  return (
    <div className="container-detail">
      <h2>{prod.title}</h2>
      <img src={prod.image} alt={prod.description} />
      <p>{prod.description}</p>
      <p>{prod.price}</p>
    </div>
  );
};

export default DetailProduct;


