import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signOut } from "firebase/auth";
import { auth } from '../Configs/firebaseconfig';
import { onAuthStateChanged } from 'firebase/auth';

const Navbar = () => {
  
  const [userCheck , setUserCheck] = useState(false)
  const navigate = useNavigate()


  useEffect(()=>{
    
    onAuthStateChanged(auth, (user) => {
      if (user) {
      const uid = user.uid;
      // ...
      setUserCheck (false)
    } else {
      setUserCheck (true)
  }
  });

  } , [])

  const SignOutUser = ()=> {

    signOut(auth).then(() => {
     // Sign-out successful.
     navigate ('/')
    }).catch((error) => {
      // An error happened.
    });
  }
  
  return (
    <div>
      <div className="navbar bg-base-100">
  <div className="flex-1">
    <Link to={'/'} className="btn btn-ghost text-xl">Blogging App</Link>
  </div>
  <div className="flex-none">
    <div className="dropdown dropdown-end">
      {userCheck ? <button onClick={()=>navigate ('login')} className="btn btn-primary">Login</button> :<>
        <div tabIndex={0} role="button">
        <div>
          <p>Muhammad Talal</p>
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        <li>
          <Link to={'profile'} className="justify-between">
            Profile
        </Link>
        </li>
        <li><Link to={'dashboard'} className="justify-between">
            Dashboard
        </Link></li>
        <li><a onClick={SignOutUser} className="justify-between">
            Signout
        </a></li>
      </ul>
      </>}
    </div>
  </div>
</div>
    </div>
  )
}

export default Navbar
