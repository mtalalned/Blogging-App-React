import React, { useRef, useState , useEffect} from 'react'
import { auth } from '../Configs/firebaseconfig'
import { collection, addDoc , Timestamp} from "firebase/firestore";
import { db } from '../Configs/firebaseconfig'; 
import { query, where, getDocs , orderBy} from "firebase/firestore";
import { doc, deleteDoc } from "firebase/firestore";
import DeleteModal from '../components/deleteModal';
import UpdateBlog from '../components/UpdateBlog';
import { updateDoc } from "firebase/firestore";


const Dashboard = () => {
  

  const title = useRef()
  const blog = useRef()

  const [loader , setLoader] = useState (false)
  const [mainLoader , setMainLoader] = useState(true)
  const [blogArray , setBlogArray] = useState ([])
  const [userObj , setUserObj] = useState({})
  const [delModal , setDelModal] = useState(false)
  const [dbdocid , setDBdocid] = useState (null)
  const [deleteIndex , setDeletIndex] = useState(null)
  const [updateModal , setUpdateModal] = useState (false)
  const [updateIndex , setUpdateIndex] = useState(null)


  useEffect(()=>{

    const getDatafromFirestore = async () => {
      
      try {
        const q = query(collection(db, "allblogs"), where("uid", "==", auth.currentUser.uid) , orderBy('postingTime','desc'));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => { 
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
  
  useEffect(()=>{

    const getUserDatafromFirestore = async () => {
      
      try {
        const q = query(collection(db, "users"), where("uid", "==", auth.currentUser.uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => { 
          
          console.log (doc.data())
          setUserObj({...doc.data(),
            docid: doc.id,
          })
        }); 
      }
      catch (error ){
        console.log (error + 'unable to get user data from firestore')
      }
    }
    
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        getUserDatafromFirestore();
      } else {
        console.log("User is not logged in.");
      }
    });
  }, [])


  const addBlog = async (event) => {
      
    event.preventDefault()
    setLoader(true)

    // Add a new document with a generated id.
    try {
      const docRef = await addDoc(collection(db, "allblogs"), {
        title: title.current.value,
        blog: blog.current.value,
        uid: auth.currentUser.uid,
        postingTime: Timestamp.now(),
        postingDay: getDate(),
        firstName: userObj.firstName,
        lastName: userObj.lastName,
      });
        console.log("Document written with ID: ", docRef.id);
        
        blogArray.unshift ({
          title: title.current.value,
          blog: blog.current.value,
          docid: docRef.id,
          uid: auth.currentUser.uid,
          postingTime: Timestamp.now(),
          postingDay: getDate(),
          firstName: userObj.firstName,
          lastName: userObj.lastName,
        })
        setBlogArray([...blogArray])
        title.current.value = ''
        blog.current.value = ''
    } catch {
      console.log ('unable to add data')
    } finally{
    setLoader(false)
  }
  }



  function getDate() {
    const date = new Date();
    const day = new Intl.DateTimeFormat('en-GB', { day: 'numeric' }).format(date);
    const month = new Intl.DateTimeFormat('en-GB', { month: 'long' }).format(date);
    const year = new Intl.DateTimeFormat('en-GB', { year: 'numeric' }).format(date);
  
    // Combine all parts with a comma after the day
    const formattedDate = `${month} ${day}, ${year}`;
    return formattedDate;
  }
  


  const openDeleteModal = (docid , index) => {
    setDelModal (true)
    setDBdocid(docid)
    setDeletIndex(index)
  }


  const deleteBlog = async (docid , index) => {
    try {
      await deleteDoc(doc(db, "allblogs", docid));
      blogArray.splice(index , 1)
      setBlogArray ([...blogArray])
      setDelModal(false)
      }catch {
      console.log ('unable to delete')
    }
  }

  const cancelDelete = () => {
    setDelModal (false)
  }


  const openUpdateModal = (docid , index) => {
    setUpdateModal (true)
    setUpdateIndex (index)
    setDBdocid(docid)
    setDeletIndex (index)
  }

  const updateValues = async (itemid , index , titleUpdated , blogUpdated , event) => {
    
    event.preventDefault()

    try {
      const washingtonRef = doc(db, "allblogs", itemid);
      // Set the "capital" field of the city 'DC'
      await updateDoc(washingtonRef, {
        title: titleUpdated,
        blog: blogUpdated,
      });
      blogArray[index].title = titleUpdated
      blogArray[index].blog = blogUpdated
      setBlogArray([...blogArray])
      setUpdateModal(false)
    } catch {
      console.log ('unable to update data')
    }
  }

  const cancelUpdate = () => {
    setUpdateModal (false)
  }

  return (
    <>
    <h1 className='text-2xl text-center m-4 text-start ms-[8%] font-bold'>Dashboard</h1>
    <div className='flex flex-col justify-center items-start bg-[#f8f9fa] py-[35px] ps-[15px] min-[400px]:ps-[50px] min-[600px]:ps-[112px]'>

      <div className='flex flex-col gap-5 justify-center items-start px-5 min-[450px]:px-[65px] py-7 bg-[#ffffff] w-[95%] min-[400px]:w-[85%] min-[900px]:w-[70%] min-w-[300px] min-h-[40vh] rounded-lg shadow-lg'>
          <form onSubmit={addBlog} className='flex w-full flex-col justify-center items-start gap-4'>
            <input type="text" placeholder="Title" className="w-full input input-bordered focus:ring-2 focus:ring-[#7749f8] focus:ring-offset-1 focus:ring-offset-[#f8f9fa]" minLength={5} maxLength={50} required ref={title}/>
            <textarea className="textarea textarea-bordered w-full focus:ring-2 focus:ring-[#7749f8] focus:ring-offset-1 focus:ring-offset-[#f8f9fa]" placeholder="What is in your mind" minLength={100} maxLength={3000} ref={blog} required></textarea>
            <button type='submit' className="bg-[#7749f8] text-white rounded-lg py-2 px-6">{loader ? <span className="loading loading-spinner loading-md"></span> : 'Publish Blog'}</button>
          </form>
      </div>

        <h1 className='text-2xl text-start font-bold mt-10 mb-6'>My blogs</h1>

      <div className='flex flex-col gap-5 justify-start items-start w-[80%] min-[400px]:w-[85%] min-[900px]:w-[70%]'>
        {mainLoader ? <div className='text-center w-full mt-5'><span className="loading loading-spinner loading-lg text-[#7749f8]"></span></div>: blogArray.length > 0 ? blogArray.map ((items , index)=> {
          return <div key={items.docid} className='flex w-[100%] px-7 py-5 flex-col bg-[#ffffff] justify-center items-start gap-4 rounded-lg shadow-lg  min-h-[40vh] min-w-[300px]'>
            <div className='flex justify-start items-start gap-4 w-full pe-5'>
              <div className='text-white bg-[#7749f8] rounded-lg p-5 flex justify-center items-center'>
                img
              </div>
              <div className='flex flex-col justify-start items-start w-[80%]'>
                <p className='font-bold text-2xl w-full border break-words'>{items.title}</p>
                <p className='text-sm text-[#747779] font-bold'>{userObj.firstName}{' '}{userObj.lastName} - {items.postingDay}</p>
              </div>
            </div>
            <div className='break-words w-full'>
              <p className='break-words text-[#7f868d]'>{items.blog}</p>
            </div>
            <div className='flex justify-start gap-1'>
              <button onClick={()=> openDeleteModal(items.docid , index)} className='hover:bg-[#dadcde] text-[#7749f8] rounded-lg px-3 py-1'>Delete</button>
              <button onClick={()=> openUpdateModal(items.docid ,index)} className='hover:bg-[#dadcde] text-[#7749f8] rounded-lg px-3 py-1'>Edit</button>
            </div>
          </div>}) : <div>No data post something</div>
          }
      </div>
    </div>
    {delModal ? <DeleteModal 
      onConfirm = {deleteBlog} 
      onCancel = {cancelDelete}
      itemid = {dbdocid} 
      index = {deleteIndex}
    /> : null}
    {updateModal ? <UpdateBlog 
      onUpdate = {updateValues}
      upDateCancel = {cancelUpdate}
      itemid = {dbdocid}
      index = {deleteIndex}

    /> : null}
    </>
    
  )
}

export default Dashboard
