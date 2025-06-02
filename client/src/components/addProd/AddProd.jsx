
import { useState } from 'react';
import { Form, Button, Modal } from "react-bootstrap";
import { useDispatch } from 'react-redux';
import { addProd } from '../../JS/actions/product.action';
import './addProd.css';

function AddProd() {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [newProd, setNewProd] = useState({
    title: "",
    description: "",
    image: "",
    categorie: "",
    price: "",
    quantity: ""
  });

  const handleChange = (e) => {
    setNewProd({ ...newProd, [e.target.name]: e.target.value });
  };

  const handleAddProd = (e) => {
    e.preventDefault();
    dispatch(addProd(newProd));
    handleClose();
    setNewProd({
      title: "",
      description: "",
      image: "",
      categorie: "",
      price: "",
      quantity: ""
    });
  };

  return (
    <>
      <Button className="btn-ajout-produit" onClick={handleShow}>
        Ajouter un produit
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Détails du nouveau produit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>

            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Titre"
                name="title"
                value={newProd.title}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Description"
                name="description"
                value={newProd.description}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Image URL"
                name="image"
                value={newProd.image}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
  <Form.Label>Catégorie</Form.Label>
  <Form.Select
    name="categorie"
    value={newProd.categorie}
    onChange={handleChange}
    aria-label="Choisir une catégorie"
  >
    <option value="">-- Choisir une catégorie --</option>
    <option value="Bagues">Bagues</option>
    <option value="Bracelets">Bracelets</option>
    <option value="Séries">Séries</option>
    <option value="Boucles d'oreilles">Boucles d'oreilles</option>
    <option value="Pendentifs">Pendentifs</option>
  </Form.Select>
</Form.Group>


            <Form.Group className="mb-3">
              <Form.Control
                type="number"
                placeholder="Prix"
                name="price"
                value={newProd.price}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                type="number"
                placeholder="Quantité"
                name="quantity"
                value={newProd.quantity}
                onChange={handleChange}
              />
            </Form.Group>

          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button className="btn-fermer" onClick={handleClose}>
            Fermer
          </Button>
          <Button className="btn-soumettre" onClick={handleAddProd}>
            Soumettre
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddProd;
