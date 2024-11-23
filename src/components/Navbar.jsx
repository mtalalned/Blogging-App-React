import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signOut } from "firebase/auth";
import { auth } from '../Configs/firebaseconfig';
import { onAuthStateChanged } from 'firebase/auth';
import { query, where, getDocs , orderBy} from "firebase/firestore";
import { db } from '../Configs/firebaseconfig';
import { collection } from 'firebase/firestore';

const Navbar = () => {
  
  const [userCheck , setUserCheck] = useState(false)
  const navigate = useNavigate()
  const [userObj , setUserObj] = useState({})
  const [mainLoader , setMainLoader] = useState(true)


    
    const getDatafromFirestore = async () => {
      
      setMainLoader(true)

      try {
        const q = query(collection(db, "users"), where("uid", "==", auth.currentUser.uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => { 
          setUserObj({...doc.data()})
        }); 
      }
      catch (error ){
        console.log (error + 'unable to get data from firestore')
      }
      finally {
        setMainLoader(false)
      }
    }
  
  
  useEffect(()=>{
    
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        getDatafromFirestore();
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
      <div className="navbar bg-[#7749f8]">
  <div className="flex-1">
    <Link to={'/'} className=" text-[1rem] text-white font-bold rounded min-[480px]:ms-[7.2%] hover:bg-[#ffffff] hover:text-[#7749f8] px-5 py-1">Personal Blogging App</Link>
  </div>
  <div className="flex-none">
    <div className="dropdown dropdown-end">
      {userCheck ? <button onClick={()=>navigate ('login')} className="text-white mx-5 font-bold">Login</button> :<>
        <div tabIndex={0} role="button">
        <div>
          <p className='text-white hover:bg-[#ffffff] hover:text-[#7749f8] rounded px-5 py-1 font-bold rounded min-[480px]:mx-5'>{mainLoader ? <span className="loading loading-spinner loading-md"></span> : userObj.firstName + ' ' + userObj.lastName}</p>
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow-lg border border-[#7749f8]">
        <li className='hover:bg-[#7749f8] rounded-lg hover:text-white'>
          <Link to={'profile'} className="justify-between">
            Profile
        </Link>
        </li>
        <li className='hover:bg-[#7749f8] rounded-lg hover:text-white'><Link to={'dashboard'} className="justify-between">
            Dashboard
        </Link></li>
        <li className='hover:bg-[#7749f8] rounded-lg hover:text-white'><a onClick={SignOutUser} className="justify-between">
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
