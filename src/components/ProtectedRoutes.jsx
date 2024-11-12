import React, { useEffect } from 'react'
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../Configs/firebaseconfig';
import { useNavigate } from 'react-router-dom';

const ProtectedRoutes = ({component}) => {
  
    const navigate = useNavigate()

    useEffect (()=>{
        onAuthStateChanged(auth, (user) => {
            if (user) {
            const uid = user.uid;
            // ...
            console.log (user.uid)
          } else {
            navigate ('/login')
        }
        });
    } , [])
    

    return (
        <>
        {component}
        </>
  )
}

export default ProtectedRoutes