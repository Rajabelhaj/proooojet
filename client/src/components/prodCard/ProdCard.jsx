
import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteProd } from '../../JS/actions/product.action';
import { ajouterAuPanier } from '../../JS/actions/panier.action'; 
import EditProd from '../editProd/EditProd';
import './prodCard.css';

const ProdCard = ({ prod, all }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    if (window.confirm("Êtes-vous sûr de supprimer ce produit ?")) {
      dispatch(deleteProd(prod._id));
    }
  };

  const handleAddToCart = () => {
    dispatch(ajouterAuPanier(prod._id, 1));
  };

  return (
    <div className="carte">
      <Card className="prod-card">
        <Card.Img variant="top" src={prod.image} className="prod-image" />
       <Card.Body className="d-flex flex-column justify-content-between">
  <div>
    <Card.Title className="prod-title">{prod.title}</Card.Title>
    <Card.Title className="prod-price">{prod.price} TND</Card.Title>
    <Card.Text className="prod-description">{prod.description}</Card.Text>
  </div>
  <div className="card-buttons-row">
  {all ? (
    <>
      <Link to={`/prod/${prod._id}`}>
        <Button className="btn-details">Détails</Button>
      </Link> 
      <Button className="btn-panier" onClick={handleAddToCart}> Ajouter </Button>
    </>
  ) : (
    <>
      <Button className="btn-supprimer " onClick={handleDelete}>
  Supprimer
</Button>

      <EditProd product={prod} />
    </>
  )}
</div>

</Card.Body>

      </Card>
    </div>
  );
};

export default ProdCard;
