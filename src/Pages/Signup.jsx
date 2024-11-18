import React, { useRef, useState } from 'react'
import { createUserWithEmailAndPassword , signOut} from "firebase/auth";
import { auth } from '../Configs/firebaseconfig';
import { db } from '../Configs/firebaseconfig';
import { collection, addDoc } from "firebase/firestore"; 


const Signup = () => {
  
  const firstName = useRef()
  const lastName = useRef()
  const email = useRef()
  const password = useRef()
  const repeatPassword = useRef()
  const [loader , setLoader] = useState(false)
  
  const signUpUser = (event) => {
    
    // prevent Default
    event.preventDefault()

    setLoader(true)
    const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail|hotmail|yahoo)\.com$/;

    // Firebase Signup 
    if (password.current.value === repeatPassword.current.value && emailRegex.test(email.current.value)){
      createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
      .then(async (userCredential) => {
        // Signed up 
        const user = userCredential.user;
        // ...

        // Add a new document with a generated id.
        const docRef = await addDoc(collection(db, "users"), {
          firstName: firstName.current.value,
          lastName: lastName.current.value,
          uid: auth.currentUser.uid,
          email: email.current.value,
        });
        console.log("Document written with ID: ", docRef.id);
        setLoader(false)
        email.current.value = ''
        firstName.current.value = ''
        lastName.current.value = ''
        password.current.value = ''
        repeatPassword.current.value = ''
        alert('Registration Successfull')
        await signOut(auth);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });

    } else if (!emailRegex.test(email.current.value)){
      alert('Wrong email')
    } else {
      alert('Password Mismatch')
    }

    // console.log (firstName.current.value , lastName.current.value , email.current.value , password.current.value , repeatPassword.current.value)
  }
  
  
  return (
    <div>
      <h1 className='text-2xl text-center m-4 text-start ms-[8%] font-bold'>Signup</h1>
      <div className='bg-[#f8f9fa] flex justify-center items-center min-h-[80vh]'>
        <form onSubmit={signUpUser} className='flex flex-col gap-3 py-5 justify-center items-center bg-[#ffffff] w-[40%] min-w-[300px] min-h-[40vh] rounded-lg shadow-lg'>
          <input type="text" placeholder="First Name" className="input input-bordered min-w-[275px] focus:ring-2 focus:ring-[#7749f8] focus:ring-offset-1 focus:ring-offset-[#f8f9fa]" ref={firstName} required minLength={3}/>
          <input type="text" placeholder="Last Name" className="input input-bordered min-w-[275px] focus:ring-2 focus:ring-[#7749f8] focus:ring-offset-1 focus:ring-offset-[#f8f9fa]" ref={lastName} required minLength={1} maxLength={20}/>
          <input type="text" placeholder="Email" className="input input-bordered min-w-[275px] focus:ring-2 focus:ring-[#7749f8] focus:ring-offset-1 focus:ring-offset-[#f8f9fa]" ref={email} required/>
          <input type="password" placeholder="Password" className="input input-bordered min-w-[275px] focus:ring-2 focus:ring-[#7749f8] focus:ring-offset-1 focus:ring-offset-[#f8f9fa]" ref={password} required pattern=".*" minLength={8}/>
          <input type="password" placeholder="Repeat Password" className="input input-bordered min-w-[275px] focus:ring-2 focus:ring-[#7749f8] focus:ring-offset-1 focus:ring-offset-[#f8f9fa]" ref={repeatPassword} required pattern=".*" minLength={8}/>
          <button type='submit' className="bg-[#7749f8] text-white rounded-lg p-3">{loader ? <span className="loading loading-spinner loading-md"></span> : 'Signup'}</button>
        </form>
      </div>
  </div>
  )
}

export default Signup
