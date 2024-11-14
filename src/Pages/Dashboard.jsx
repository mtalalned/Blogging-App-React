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
      });
        console.log("Document written with ID: ", docRef.id);
        
        blogArray.unshift ({
          title: title.current.value,
          blog: blog.current.value,
          docid: docRef.id,
          uid: auth.currentUser.uid,
          postingTime: Timestamp.now(),
          postingDay: getDate(),
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



  function getDate (){
    const date = new Date();
    const formattedDate = new Intl.DateTimeFormat('en-GB', {
      weekday: 'long',
      day: 'numeric', 
      year: 'numeric',
    }).format(date);
    return formattedDate
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
    <div className='flex flex-col justify-center items-center'>

      <form onSubmit={addBlog} className='flex flex-col justify-center items-center gap-4'>
        <input type="text" placeholder="Title" className="input input-bordered" minLength={5} maxLength={50} ref={title}/>
        <textarea className="textarea textarea-bordered" placeholder="Post your blog" minLength={100} maxLength={3000} ref={blog}></textarea>
        <button type='submit' className="btn btn-primary">{loader ? <span className="loading loading-spinner loading-md"></span> : 'Publish Blog'}</button>
      </form>

      <div className='flex flex-col justify-center gap-5 w-full'>
        <h1 className='text-2xl text-start font-bold'>My blogs</h1>
        {mainLoader ? <span className="loading loading-spinner loading-md"></span> : blogArray.map ((items , index)=> {
          return <div key={items.docid} className='w-full border'>
            <p>{items.title}</p>
            <p>{userObj.firstName}{' '}{userObj.lastName}</p>
            <p>{items.postingDay}</p>
            <p className='break-words'>{items.blog}</p>
            <button onClick={()=> openDeleteModal(items.docid , index)} className='btn btn-primary'>Delete</button>
            <button onClick={()=> openUpdateModal(items.docid ,index)} className='btn btn-error'>Edit</button>
          </div>})
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
