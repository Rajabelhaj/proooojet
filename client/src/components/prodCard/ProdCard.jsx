

import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {useDispatch} from 'react-redux';
import { deleteProd } from '../../JS/actions/product.action';
import EditProd from '../editProd/EditProd';


const ProdCard = ({prod, all}) => {
  const dispatch = useDispatch();
  const handleDelete = () => {
    if(window.confirm("Etes vous sure de supprimer ce produit?")) {
      dispatch(deleteProd(prod._id));
    }
    
  };
  return (
    <div className="carte">
         <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={prod.image} className="article"/>
      <Card.Body>
        <Card.Title>{prod.title}</Card.Title>
        
        <Card.Title style={{color:"gray", fontSize:"medium"}}>{prod.price}</Card.Title>
        <Card.Text >
          {prod.description}
        </Card.Text>
        
        {all ? (
        <Link to={`/prod/${prod._id}`}>
        <Button variant="primary">Détails</Button>
        </Link> ):(
          <>
           
          <Button variant = "danger" onClick={handleDelete}>supprimer

          </Button>
          <EditProd product={prod} />
         </>
        )}
      </Card.Body>
    </Card>
    </div>
  );
};

export default ProdCard;