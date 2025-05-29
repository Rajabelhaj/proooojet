import React, { useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import AddProd from '../../components/addProd/AddProd';
import { getMyProd } from '../../JS/actions/product.action';
import ListeProd from '../../components/listProd/ListeProd';
import './profile.css'; 


const Profile = () => {
  const user = useSelector((state) => state.authReducer.user);
  const myProd = useSelector((state) => state.productReducer.myProd);
  //console.log(myProd);
  const dispatch = useDispatch()
  //console.log(user);
  useEffect(() => {
    dispatch(getMyProd());
  }, [dispatch]);

  return (
    <div>
        <div className="profile-header">
          <h1>Hello {user.name}</h1>
        <img src="https://images.unsplash.com/photo-1695931854534-f22c02611ba1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
      
        />
        </div>
        <hr/>
        <AddProd/>
        <ListeProd products={myProd} all={false}/> 
    </div>
  );
};

export default Profile;