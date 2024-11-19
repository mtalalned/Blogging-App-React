import React, { useEffect, useState } from 'react'
import { collection, getDocs , orderBy } from "firebase/firestore";
import { auth, db } from '../Configs/firebaseconfig';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';

const Home = () => {
  
  const [loader , setLoader] = useState(false)
  const [allblogArray , setAllBlogArray] = useState([])
  const navigate = useNavigate()
  // const [userObj , setUserObj] = useState()
  
  
  useEffect(() => {
    
    setLoader(true)

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
// useEffect(() => {
    
//   const getUserDatafromFirestore = async () => {
//     try {
//       const querySnapshot = await getDocs(collection(db, "users") , orderBy('postingTime','desc'));
//       querySnapshot.forEach((doc) => {
//         console.log(doc.id, " => ", doc.data());
//         allblogArray.push ({
//           ...doc.data(),
//           docid: doc.id,
//         })
//         setAllBlogArray ([...allblogArray])
//       });
//     } catch (error) {
//       console.log("Error getting documents:", error);
//     } finally {
//       setLoader (false)
//     }
//   };

//   getUserDatafromFirestore ()

// }, []); 
  



  
  return (
    <>
      <h1 className='text-2xl text-center m-4 text-start ms-[8%] font-bold'>Good Morning Readers</h1>
      <div className='flex flex-col justify-start items-start bg-[#f8f9fa] py-[35px] ps-[15px] min-[400px]:ps-[50px] min-[600px]:ps-[112px] min-h-[80vh]'>
          <h2 className='text-2xl text-start font-bold mb-6'>All blogs</h2>
          <div className='flex flex-col gap-5 justify-start items-start w-[80%] min-[400px]:w-[85%] min-[900px]:w-[70%]'>
          {loader ? <div className='text-center flex justify-center items-center w-full mt-5 min-h-[40vh]'><span className="loading loading-spinner loading-lg text-[#7749f8]"></span></div> : allblogArray.length > 0 ? allblogArray.map ((items , index)=> {
            return <div key={items.docid} className='flex w-[100%] px-7 py-5 flex-col bg-[#ffffff] justify-center items-start gap-4 rounded-lg shadow-lg  min-h-[35vh] min-w-[300px]'>
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
            <div className='flex justify-start gap-1'>
              <button onClick={()=> swithToUserPage(items.uid)} className='hover:text-[#dadcde] text-[#7749f8] rounded-lg py-1'>See all from this user</button>
              
            </div>
          </div>
      }) : <div>No one has posted yet</div>}
            
          </div>
      
    </div>
    
    </>
  )
}

export default Home
