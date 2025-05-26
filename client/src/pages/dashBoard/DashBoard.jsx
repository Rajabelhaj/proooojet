import React, { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getUsers} from "../../JS/actions/user.action";
import ListUsers from '../../components/listUsers/ListUsers';

const DashBoard = () => {
  const dispatch =  useDispatch();
 // const users = useSelector((state) => state.userReducer.users);
  //console.log(users);
 
  useEffect(() => {
dispatch(getUsers());
  }, [dispatch]);

  return (
    <div>
      <h1>La liste de tous les utilisateurs est:</h1>
      <ListUsers/>
    </div>
  );
};

export default DashBoard;