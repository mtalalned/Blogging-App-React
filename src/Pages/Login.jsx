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
      <h1 className='text-2xl text-center m-5'>Login</h1>
      <form onSubmit={SignInUser} className='flex flex-col gap-5 justify-center items-center'>
        <input type="text" placeholder="Email" className="input input-bordered w-full max-w-xs" ref={email} required/>
        <input type="password" placeholder="Password" className="input input-bordered w-full max-w-xs" ref={password} required/>
        <button type='submit' className="btn btn-primary">{loader ? <span className="loading loading-spinner loading-md"></span> : 'Login'}</button>
      </form>
      <button onClick={()=>{navigate('/signup')}} className="btn btn-primary">Signup</button>
    </div>
  )
}

export default Login
