import React, { useEffect, useState } from 'react'
import { collection, getDocs , orderBy } from "firebase/firestore";

const Home = () => {
  
  const [laoder , setLoader] = useState(false)
  const [allblogArray , setAllBlogArray] = useState([])
  
  
  useEffect(() => {
    
    const getDatafromFirestore = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "allblogs") , orderBy('postingTime','desc'));
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
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

}, []);  // Empty dependency array ensures t
  



  
  return (
    <div>
      {laoder ? <span className="loading loading-spinner loading-md"></span> : allblogArray.map ((items , index)=> {
        return <div className='w-full border'>
        <p>Blog No.1 </p>
        <p></p>
        <p></p>
        <p className='break-words'></p>
        <button className='btn btn-primary'>See all from this user </button>
      </div>
      })}
      
    </div>
  )
}

export default Home
