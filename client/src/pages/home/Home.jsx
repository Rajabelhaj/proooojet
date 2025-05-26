import React, { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getAllProd} from '../../JS/actions/product.action';
import ListeProd from '../../components/listProd/ListeProd';

const Home = () => {
  const products = useSelector(state => state.productReducer.products)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProd());
  }, [dispatch]);
  return (
    <div>
       {/* <h1>Home page</h1>
        <img src="https://images.unsplash.com/photo-1502945015378-0e284ca1a5be?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="home" />*/}

        <h2>Nos Produits</h2>
      <ListeProd products={products} all={true} />
    </div>
  );
};

export default Home;