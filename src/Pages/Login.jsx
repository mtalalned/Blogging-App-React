import React, {useRef , useState} from 'react'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../Configs/firebaseconfig';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  
  const email = useRef()
  const password = useRef()
  const [loader , setLoader] = useState(false)
  const navigate = useNavigate()

  const SignInUser = (event)=> {
    
    // prevent default
    event.preventDefault()
    setLoader(true)
    
    signInWithEmailAndPassword(auth, email.current.value, password.current.value)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // ...
        console.log ('user logged in')
        setLoader (false)
        navigate('/dashboard')
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setLoader (false)
      });

      email.current.value = ''
      password.current.value = ''
  }
  
  
  return (
    <div>
      <h1 className='text-2xl text-center m-4 text-start ms-[8%] font-bold'>Login</h1>
      <div className='bg-[#f8f9fa] flex justify-center items-center min-h-[80vh]'>
      <form onSubmit={SignInUser} className='flex flex-col gap-5 justify-center items-center bg-[#ffffff] w-[40%] min-w-[300px] min-h-[40vh] rounded-lg shadow-lg'>
        <input type="text" placeholder="Email" className="input input-bordered min-w-[275px] focus:ring-2 focus:ring-[#7749f8] focus:ring-offset-1 focus:ring-offset-[#f8f9fa]" ref={email} required/>
        <input type="password" placeholder="Password" className="input input-bordered min-w-[275px] focus:ring-2 focus:ring-[#7749f8] focus:ring-offset-1 focus:ring-offset-[#f8f9fa]" ref={password} required/>
        <div className='flex gap-3 justify-center items-center'>
        <button type='submit' className="bg-[#7749f8] text-white rounded-lg p-3">{loader ? <span className="loading loading-spinner loading-md"></span> : 'Login'}</button>
        <p className='text-[#7749f8]'>OR</p>
        <button onClick={()=>{navigate('/signup')}} className="bg-[#7749f8] text-white rounded-lg p-3">Signup</button>
        </div>
      </form>
      </div>
    </div>
  )
}

export default Login
