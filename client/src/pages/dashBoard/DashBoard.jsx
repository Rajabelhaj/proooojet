import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getUsers } from "../../JS/actions/user.action";
import ListUsers from '../../components/listUsers/ListUsers';
import './dashboard.css';

const DashBoard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Liste de tous les utilisateurs</h1>
      <ListUsers />
    </div>
  );
};

export default DashBoard;
