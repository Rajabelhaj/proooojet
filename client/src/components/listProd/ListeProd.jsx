import React from 'react';
import ProdCard from '../prodCard/ProdCard';
import './listProd.css';

const ListeProd = ({ products, all }) => {
  return (
    <div className="liste-produits">
      {products?.map((prod) => (
        <ProdCard key={prod._id} prod={prod} all={all} />
      ))}
    </div>
  );
};

export default ListeProd;

