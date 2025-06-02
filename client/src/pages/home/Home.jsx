
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProd } from '../../JS/actions/product.action';
import ListeProd from '../../components/listProd/ListeProd';
import './home.css';
import { useParams } from 'react-router-dom';


const Home = () => {
  const { cat } = useParams();
  const dispatch = useDispatch();
  const products = useSelector(state => state.productReducer.products);
  const produitsRef = useRef(null); // Pour scroll vers produits

  // Récupération des produits au chargement
  useEffect(() => {
    dispatch(getAllProd());
  }, [dispatch]);

  // Filtrage local des produits selon la catégorie
  const filteredProducts = cat
    ? products.filter(prod => prod.categorie.toLowerCase() === cat.toLowerCase())
    : products;

  // Scroll vers la section produits si une catégorie est sélectionnée
  useEffect(() => {
    if (cat && produitsRef.current) {
      produitsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [cat]);

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

      {/* Section Produits */}
      <div id="produits" className="product-section" ref={produitsRef}>
        <h2>{cat ? `Produits de la catégorie "${cat}"` : 'Nos Produits'}</h2>
        <ListeProd products={filteredProducts} all={true} />
      </div>
      
    </div>
  );
};

export default Home;
