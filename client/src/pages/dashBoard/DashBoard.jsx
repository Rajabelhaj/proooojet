
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getUsers } from "../../JS/actions/user.action";
import { getAllCommandes } from "../../JS/actions/commande.action";
import ListUsers from '../../components/listUsers/ListUsers';
import './dashboard.css';
import ListCommandes from '../../components/ListCommandes/ListCommandes';

const DashBoard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getAllCommandes());
  }, [dispatch]);

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Dashboard Admin</h1>

      <section>
        <h2>Liste de tous les utilisateurs</h2>
        <ListUsers />
      </section>

      <section>
        <h2>Liste de toutes les commandes</h2>
        <ListCommandes />
      </section>
    </div>
  );
};

export default DashBoard;
