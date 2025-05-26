import React, { useState } from 'react';
import {Button, Card} from "react-bootstrap";
import './userCard.css'
import DetailUser from '../detailUser/DetailUser';
import ToSupp from '../toSuupp/ToSupp';


const UserCard = ({user}) => {
  const [supp, setSupp]= useState(false)
 
  return (
    <div className='user'>
      {" "}
      <Card style={{ width: '18rem' }}>
    
      <Card.Body>
        <Card.Title>{user.name}</Card.Title>
        <Card.Text>{user.email}</Card.Text>
        <div className="btndiv">
        <DetailUser user={user}/>
      <Button variant="danger" className="btn" onClick={() => setSupp(true)}>Supprimer</Button>
      </div>
      </Card.Body>
      <ToSupp show={supp} handleClose={() => setSupp(false)} user={user} />
    </Card>
    </div>
  );
};

export default UserCard;