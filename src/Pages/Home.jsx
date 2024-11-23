import React, { useEffect, useState } from 'react'
import { collection, getDocs , orderBy } from "firebase/firestore";
import { auth, db } from '../Configs/firebaseconfig';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import ErrorFetchingData from '../components/ErrorFetchingData';
import userimage from '../assets/user.png'


const Home = () => {
  
  const [loader , setLoader] = useState(false)
  const [allblogArray , setAllBlogArray] = useState([])
  const navigate = useNavigate()
  const [errorModal , setErrorModal] = useState(false)
  const [greeting , setGreeting] = useState(null)
  
  
  useEffect(() => {
    
    setLoader(true)
    const date = new Date()
    if (date.getHours() < 12 && date.getHours()>5) {
      setGreeting('Good Morning')
    } else if (date.getHours() >= 12 && date.getHours()<7) {
      setGreeting('Good Afternoon')
    } else if (date.getHours() >= 7 && date.getHours()<=23){
      setGreeting('Good Evening')
    } else {
      setGreeting('Happy Midnight')
    }

    const getDatafromFirestore = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "allblogs") , orderBy('postingTime','desc'));
        querySnapshot.forEach((doc) => {
          allblogArray.push ({
            ...doc.data(),
            docid: doc.id,
          })
          setAllBlogArray ([...allblogArray])
        });
      } catch (error) {
        console.log("Error getting documents:", error);
        setErrorModal(true)
      } finally {
        setLoader (false)
      }
    };
  
    getDatafromFirestore ()

}, []); 


const swithToUserPage = (uidforSingleUser) => {

  onAuthStateChanged(auth, (user) => {
    if (user) {
    const uid = user.uid;
    navigate (`/user/${uidforSingleUser}`)
    console.log (user.uid)
  } else {
    navigate ('/login')
}
})
}
  



  
  return (
    <>
      <h1 className='text-2xl text-center m-4 text-start ms-[8%] font-bold'>{greeting} Readers</h1>
      <div className='flex flex-col justify-start items-start bg-[#f8f9fa] py-[35px] ps-[15px] min-[400px]:ps-[50px] min-[600px]:ps-[112px] min-h-[80vh]'>
          <h2 className='text-2xl text-start font-bold mb-6'>All blogs</h2>
          <div className='flex flex-col gap-5 justify-start items-start w-[80%] min-[400px]:w-[85%] min-[900px]:w-[70%]'>
          {loader ? <div className='text-center flex justify-center items-center w-full mt-5 min-h-[40vh]'><span className="loading loading-spinner loading-lg text-[#7749f8]"></span></div> : allblogArray.map ((items , index)=> {
            return <div key={items.docid} className='flex w-[100%] px-7 py-5 flex-col bg-[#ffffff] justify-center items-start gap-4 rounded-lg shadow-lg  min-h-[35vh] min-w-[300px]'>
            <div className='flex justify-start items-start gap-4 w-full pe-5'>
              <div className='text-white bg-[#7749f8] w-[70px] rounded-lg flex justify-center items-center'>
                <img src={userimage} alt="logo" className='w-100'/>
              </div>
              <div className='flex flex-col justify-start items-start w-[80%]'>
                <p className='font-bold text-2xl w-full break-words'>{items.title}</p>
                <p className='text-sm text-[#747779] font-bold'>{items.firstName}{' '}{items.lastName} - {items.postingDay}</p>
              </div>
            </div>
            <div className='break-words w-full'>
              <p className='break-words text-[#7f868d]'>{items.blog}</p>
            </div>
            <div className='flex justify-start gap-1'>
              <button onClick={()=> swithToUserPage(items.uid)} className='hover:text-[#dadcde] text-[#7749f8] rounded-lg py-1'>See all from this user</button>
              
            </div>
          </div>
      })}
            
          </div>
    </div>
    
    {errorModal && <div role="alert" className="alert alert-error w-[300px] fixed bottom-3 left-[37vw]">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 shrink-0 stroke-current text-white"
    fill="none"
    viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
  <span className='text-white'>Login failed !!! Try Again.</span>
  <button
            // onClick={closeAlert}
            className="text-white hover:bg-transparent hover:text-gray-800"
            aria-label="Close"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
</div>}
    </>
  )
}

export default Home
