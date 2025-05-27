
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/home/Home';
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import Profile from './pages/Profile/Profile';
import Error from './pages/Error/Error';
import BarreNav from './components/barreNav/BarreNav';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { current } from './JS/actions/auth.action';
import Loading from './components/loading/Loading';
import ErrorToast from './components/Error/ErrorToast';
import DashBoard from './pages/dashBoard/DashBoard';
import DetailProduct from './pages/DetailProd/DetailProduct';
import PrivateRoute from './routes/PrivateRoute';

import Panier from './components/panier/Panier';

import Commandes from './components/commandes/Commandes';









function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector(state=> state.authReducer.isAuth);
  const isLoad = useSelector((state) => state.authReducer.isLoad);
//console.log(isLoad);
const errors = useSelector((state) => state.authReducer.errors);
const user = useSelector(state => state.authReducer.user);
//console.log(user);
 //console.log("errerurs récupérées:", errors);
  //on dispatch le current pour connaitre la personne authentifiée
  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(current());
    }
  }, [dispatch]);
  return (
    <div className="App">
   
      {/*navbar*/}
      <BarreNav/>
      {isLoad && <Loading/>}
      {Array.isArray(errors) && errors.length !== 0 && <ErrorToast errors={errors}/>}
      {/*routes*/}
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/prod/:id' element={<DetailProduct/>}/>

    {/*route securisée pour admin */}
        {user.isAdmin && (
        <Route path='/admin' element={<PrivateRoute isAdmin={user.isAdmin}/>}>
        <Route path="/admin" element={<DashBoard/>}/> 
        </Route>
        )}
        {isAuth ? (
          <>
         <Route path='/profile' element={<Profile/>}/>
         {/*  Routes panier et commandes  */}
            <Route path="/panier" element={<Panier userId={user._id} />} />
            <Route path="/commande" element={<Commandes userId={user._id} />} /> 
         </>
        ) : (
         <>
         <Route path="/profile" element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/></> )}
       
        <Route path='/*' element={<Error/>}/>
      </Routes>
      {/*footer*/}
    </div>
  );
}

export default App;
