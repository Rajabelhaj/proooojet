
import React from 'react'
import ProdCard from '../prodCard/ProdCard';
//import { useSelector } from 'react-redux';

const ListeProd = ({products, all}) => {
   // const products = useSelector(state => state.productReducer.products);
    //console.log(products)
    //console.log(all);
  return (
    <div 
    style={{
      display:"flex", 
      justifyContent:"space-around",
      flexWrap:"wrap"}}
       >
      {products?.map((prod) => (
  <ProdCard key={prod._id} prod={prod} all={all} />
))}
     
    </div>
  );
};

export default ListeProd;
