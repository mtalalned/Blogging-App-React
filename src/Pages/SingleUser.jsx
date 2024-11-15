import React, { useState , useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { query, where, getDocs , orderBy} from "firebase/firestore";
import { auth , db } from '../Configs/firebaseconfig';
import { collection } from 'firebase/firestore';





const SingleUser = () => {
  
  const [mainLoader , setMainLoader] = useState(true)
  const {id} = useParams()
  const [blogArray , setBlogArray] = useState([])
  const [userObj , setUserObj] = useState({})
  const navigate = useNavigate()
  
  
  useEffect(()=>{
    
    const getDatafromFirestore = async () => {
      
      try {
        const q = query(collection(db, "allblogs"), where("uid", "==", id) , orderBy('postingTime','desc'));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => { 
          console.log (doc.data())
          blogArray.push ({
            ...doc.data(),
            docid: doc.id,
          })
          setBlogArray([...blogArray])
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
    
    const getUserDatafromFirestore = async () => {
      
      try {
        const q = query(collection(db, "users"), where("uid", "==", id));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => { 
          console.log (doc.data())
          setUserObj({...doc.data()})
        }); 
      }
      catch (error ){
        console.log (error + 'unable to get data from firestore')
      }
    }
  
  return (
    <div>
      <a className='text-3xl' onClick={()=> navigate('/')}>Back to All Blogs</a>
      <h2 className='text-2xl'>{blogArray.length > 0 ? 'All from '+ blogArray[0].firstName + ' ' +blogArray[0].lastName : null}</h2>
      <div className='flex flex-col justify-center gap-5 w-full'>
        {mainLoader ? <span className="loading loading-spinner loading-md"></span> : blogArray.length > 0 ? blogArray.map ((items , index)=> {
          return <div key={items.docid} className='w-full border'>
            <p>{items.title}</p>
            <p>{items.firstName}{' '}{items.lastName}</p>
            <p>{items.postingDay}</p>
            <p className='break-words'>{items.blog}</p>
          </div>}): <div>No data found please post something using dashboard</div>}
      </div>
    </div>
  )
}

export default SingleUser
