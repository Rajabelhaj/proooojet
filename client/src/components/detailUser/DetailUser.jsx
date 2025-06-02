import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import './detailUser.css';

const DetailUser = ({user}) => {
    //console.log(user);
    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div>
        {" "}
       <Button className="btn-detail" onClick={handleShow}>
  Détails
</Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Détails de l'utilisateur: {user.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{user.email}
            <hr/>
            {user.phone}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default DetailUser

