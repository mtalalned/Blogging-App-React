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
    <div>
      <h1 className='text-3xl'>Good Morning Readers</h1>
      <h2 className='text-2xl'>All blogs</h2>
      {loader ? <span className="loading loading-spinner loading-md"></span> : allblogArray.length > 0 ? allblogArray.map ((items , index)=> {
        return <div key={items.docid} className='w-full border'>
        <p>{items.title} </p>
        <p>{items.firstName}{' '}{items.lastName}</p>
        <p>{items.postingDay}</p>
        <p className='break-words'>{items.blog}</p>
        <button className='btn btn-primary' onClick={() => swithToUserPage(items.uid)}>See all from this user </button>
      </div>
      }) : <div>No one has posted yet</div>}
      
    </div>
  )
}

export default Home
