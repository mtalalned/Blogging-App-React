import React, { useRef, useState , useEffect} from 'react'
import { auth , db } from '../Configs/firebaseconfig'
import { query, where, getDocs , orderBy} from "firebase/firestore";
import { collection } from 'firebase/firestore';
import { updatePassword } from 'firebase/auth';
import userimage from '../assets/user.png'



const Profile = () => {
  
  const newpassword = useRef()
  const repeatnewpassword = useRef()
  const [userObj , setUserObj] = useState({})
  const [mainLoader , setMainLoader] = useState(false)
  const [loader , setLoader] = useState(false)

  
  useEffect(()=>{
    
    setMainLoader(true)
    
    const getDatafromFirestore = async () => {
      

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
    
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        getDatafromFirestore();
      } else {
        console.log("User is not logged in.");
      }
    });
  }, [])


  const updateUserPassword = (event) => {

    event.preventDefault()

    setLoader(true)

    if (newpassword.current.value === repeatnewpassword.current.value) {
      const user = auth.currentUser;

      const newPassword = repeatnewpassword.current.value;

      updatePassword(user, newPassword).then(() => {
        // Update successful.
        console.log('Password update')
        newpassword.current.value = ''
        repeatnewpassword.current.value = ''
        setLoader(false)
      }).catch((error) => {
        // An error ocurred
        // ...
        console.log ('Password update failed')
        setLoader(false)
      });
    } else {
      console.log ('password mismatch')
      setLoader(false)
    }
  }
  
  
  
  return (
    <>
    <h1 className='text-2xl text-center m-4 text-start ms-[8%] font-bold'>Profile</h1>
    <div className='flex flex-col justify-center items-start bg-[#f8f9fa] py-[35px] ps-[15px] min-[400px]:ps-[50px] min-[600px]:ps-[112px]'>

      <div className='flex w-[750px] ps-[50px] py-5 flex-col bg-[#ffffff] justify-start items-start gap-4 rounded-lg shadow-lg  min-h-[80vh] min-w-[300px]'>
        <img src={userimage} alt="logo" className='w-[250px] bg-[#7749f8] rounded-lg'/>
        <h1 className='text-3xl font-bold text-[black]'>{mainLoader ? <span className="loading loading-spinner loading-md text-[#7749f8]"></span> : userObj.firstName+' '+userObj.lastName}</h1>
        <h2 className='text-xl font-bold text-[#7749f8]'>Password</h2>
        <div >
        <form onSubmit={()=>updateUserPassword(event)} className='flex flex-col justify-center items-start gap-5'>
          <input type="password" placeholder="New Password" className="w-full input input-bordered focus:ring-2 focus:ring-[#7749f8] focus:ring-offset-1 focus:ring-offset-[#f8f9fa] min-w-[300px]" ref={newpassword} required/>
          <input type="password" placeholder="Repeat Password" className="w-full input input-bordered focus:ring-2 focus:ring-[#7749f8] focus:ring-offset-1 focus:ring-offset-[#f8f9fa] min-w-[300px]" ref={repeatnewpassword} required/>
          <button type='submit' className="bg-[#7749f8] text-white rounded-lg p-3">{loader ? <span className="loading loading-spinner loading-md"></span> : 'Update Password'}</button>
        </form>
        </div>
      </div>
    </div>
    </>
  )
}

export default Profile
