import { useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from 'react-redux';
import { editProd } from '../../JS/actions/product.action';
import './editProd.css';


function EditProd({product}) {
    const dispatch = useDispatch();
  const [show, setShow] = useState(false);
   const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [prodToEdit, setProdToEdit]= useState({
   title:product.title, 
   description:product.description, 
   price:product.price, 
   image:product.image, 
   quantity:product.quantity,
  });
  const handleChange = (e) => {
    setProdToEdit({...prodToEdit, [e.target.name]:e.target.value});
  };
 // console.log(prodToEdit);
 const handleEdit = (e) => {
    e.preventDefault();
    if(prodToEdit.title.trim() === "" || prodToEdit.image.trim() === ""){return alert("Titre et images obligatoires")}
    dispatch(editProd(product._id, prodToEdit));
    handleClose()
   
 };
  return (
    <>
      <Button className="btn-edit" onClick={handleShow}>
   Modifier
</Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {" "}
             <Form>
      <Form.Group className="mb-3" >
        
        <Form.Control type="text" placeholder="Titre" name="title" 
        value={prodToEdit.title}
        onChange={handleChange}  />
        </Form.Group>

      <Form.Group  className="mb-3" >
        
        <Form.Control type="text" placeholder="Description" name="description" 
        value={prodToEdit.description}
        onChange={handleChange} />
</Form.Group>
 
 <Form.Group  className="mb-3" >
        
        <Form.Control type="text" placeholder="Image Url" name="image" 
        value={prodToEdit.image}
        onChange={handleChange}/>
</Form.Group>
 <Form.Group  className="mb-3" >
        
        <Form.Control type="text" placeholder="categorie" name="categorie" 
        value={prodToEdit.categorie}
        onChange={handleChange}/>
</Form.Group>
 <Form.Group  className="mb-3" >
        
        <Form.Control type="number" placeholder="Prix" name="price" 
        value={prodToEdit.price}
        onChange={handleChange} />
</Form.Group> 
<Form.Group  className="mb-3" >
        
        <Form.Control type="text" placeholder="Quantité" name="quantity" 
        value={prodToEdit.quantity}
        onChange={handleChange} />
</Form.Group>
       
    </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fermer
          </Button>
          <Button variant="primary" onClick={handleEdit}>
            Enregistrer les modifications
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditProd;


