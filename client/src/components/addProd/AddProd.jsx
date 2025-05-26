
import { useState } from 'react';

import {Form, Button, Modal} from "react-bootstrap";
import { useDispatch } from 'react-redux';
import { addProd } from '../../JS/actions/product.action';

function AddProd() {
    const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [newProd, setNewProd] = useState({
    title:"", description:"", image:"", price:"", quantity:""
  });
  //pour mettre a jour le newProd avec la saisie de l'user
  const handleChange = (e) => {
    setNewProd({...newProd, [e.target.name]:e.target.value})
  };
//console.log(newProd);
const handleAddProd = (e) => {
    e.preventDefault(); //pour empecher le chargement
    dispatch(addProd(newProd));
    handleClose();
    setNewProd({ title:"", description:"", image:"", price:"", quantity:""

    });
};
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Ajouter un produit
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Détails du nouveau produit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         <Form>
      <Form.Group className="mb-3" >
        
        <Form.Control type="text" placeholder="Titre" name="title" 
        value={newProd.title}
        onChange={handleChange}  />
        </Form.Group>

      <Form.Group  className="mb-3" >
        
        <Form.Control type="text" placeholder="Description" name="description" 
        value={newProd.description}
        onChange={handleChange} />
</Form.Group>
 
 <Form.Group  className="mb-3" >
        
        <Form.Control type="text" placeholder="Image Url" name="image" 
        value={newProd.image}
        onChange={handleChange}/>
</Form.Group>
 <Form.Group  className="mb-3" >
        
        <Form.Control type="number" placeholder="Prix" name="price" 
        value={newProd.price}
        onChange={handleChange} />
</Form.Group> 
<Form.Group  className="mb-3" >
        
        <Form.Control type="text" placeholder="Quantité" name="quantity" 
        value={newProd.quantity}
        onChange={handleChange} />
</Form.Group>
       
    </Form>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fermer
          </Button>
          <Button variant="primary" onClick={handleAddProd}>
            Soumettre
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddProd;