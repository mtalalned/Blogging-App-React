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
    
    // const getUserDatafromFirestore = async () => {
      
    //   try {
    //     const q = query(collection(db, "users"), where("uid", "==", id));
    //     const querySnapshot = await getDocs(q);
    //     querySnapshot.forEach((doc) => { 
    //       console.log (doc.data())
    //       setUserObj({...doc.data()})
    //     }); 
    //   }
    //   catch (error ){
    //     console.log (error + 'unable to get data from firestore')
    //   }
    // }
  
  return (
      <>
      <div className='flex justify-start items-center '>
        <h1 className='text-2xl m-4 text-start ms-[8%] font-bold text-[#7749f8] cursor-pointer' onClick={()=> navigate('/')}>{'<'} Back to All Blogs</h1>
      </div>
    <div className='flex flex-col justify-start items-start bg-[#f8f9fa] py-[35px] ps-[15px] min-[400px]:ps-[50px] min-[600px]:ps-[112px] min-h-[80vh]'>
      <h2 className='text-2xl text-start font-bold mb-6'>{blogArray.length > 0 ? 'All from '+ blogArray[0].firstName + ' ' +blogArray[0].lastName : null}</h2>
      <div className='flex flex-col gap-5 justify-start items-start w-[80%] min-[400px]:w-[85%] min-[900px]:w-[70%]'>
        {mainLoader ? <div className='text-center flex justify-center items-center w-full mt-5 min-h-[30vh]'><span className="loading loading-spinner loading-lg text-[#7749f8]"></span></div> : blogArray.length > 0 ? blogArray.map ((items , index)=> {
          return <div key={items.docid} className='flex w-[100%] px-7 py-5 flex-col bg-[#ffffff] justify-center items-start gap-4 rounded-lg shadow-lg  min-h-[30vh] min-w-[300px]'>
          <div className='flex justify-start items-start gap-4 w-full pe-5'>
            <div className='text-white bg-[#7749f8] rounded-lg p-5 flex justify-center items-center'>
              img
            </div>
            <div className='flex flex-col justify-start items-start w-[80%]'>
              <p className='font-bold text-2xl w-full border break-words'>{items.title}</p>
              <p className='text-sm text-[#747779] font-bold'>{items.firstName}{' '}{items.lastName} - {items.postingDay}</p>
            </div>
          </div>
          <div className='break-words w-full'>
            <p className='break-words text-[#7f868d]'>{items.blog}</p>
          </div>
        </div>}): <div>No data found please post something using dashboard</div>}
      </div>
    </div>
      
      </>
  )
}

export default SingleUser
