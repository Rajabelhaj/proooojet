import React, { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getAllProd} from '../../JS/actions/product.action';
import ListeProd from '../../components/listProd/ListeProd';
import './home.css';

const Home = () => {
  const products = useSelector(state => state.productReducer.products)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProd());
  }, [dispatch]);
  return (
     <div>
      {/* Hero section */}
      <div className="hero-container">
        <img
          src="https://s1.1zoom.me/b5050/718/Jewelry_Gray_background_Brown_haired_Hands_Glance_586068_1920x1080.jpg"
          alt="Bijouterie"
          className="hero-image"
        />
        <div className="hero-text">
          <h1>Bienvenue dans notre bijouterie</h1>
          <p>Élégance. Brillance. Éternité.</p>
          <a href="#produits" className="hero-button">Voir nos produits</a>
        </div>
      </div>

      {/* Produits */}
      <div id="produits" className="product-section">
        <h2>Nos Produits</h2>
        <ListeProd products={products} all={true} />
      </div>
    </div>
  );
};

export default Home;










      