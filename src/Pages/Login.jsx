import React, {useRef , useState} from 'react'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../Configs/firebaseconfig';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  
  const email = useRef()
  const password = useRef()
  const [loader , setLoader] = useState(false)
  const navigate = useNavigate()
  const [invalidEmail , setInvalidEmail] = useState(false)
  const [loginFailed , setLoginFailed] = useState(false)


  const SignInUser = (event)=> {
    
    // prevent default
    event.preventDefault()
    setLoader(true)
    setInvalidEmail(false)
    setLoginFailed(false)
    
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
        console.log (error.message)
        if (errorMessage === 'Firebase: Error (auth/invalid-credential).' || errorMessage === 'Firebase: Error (auth/invalid-email).') {
          setInvalidEmail (true)
        }else {
          setLoginFailed(true)
        }
        setLoader (false)
        
      });

      email.current.value = ''
      password.current.value = ''
  }
  
  const closeAlert = ()=> {
    setInvalidEmail(false)
    setLoginFailed(false)
  }
  
  return (
    <div>
      <h1 className='text-2xl text-center m-4 text-start ms-[8%] font-bold'>Login</h1>
      <div className='bg-[#f8f9fa] flex justify-center items-center min-h-[80vh]'>
      <form onSubmit={(event)=>SignInUser(event)} className='flex flex-col gap-5 justify-center items-center bg-[#ffffff] w-[40%] min-w-[300px] min-h-[40vh] rounded-lg shadow-lg'>
        <input type="text" placeholder="Email" className="input input-bordered min-w-[275px] focus:ring-2 focus:ring-[#7749f8] focus:ring-offset-1 focus:ring-offset-[#f8f9fa]" ref={email} required/>
        <input type="password" placeholder="Password" className="input input-bordered min-w-[275px] focus:ring-2 focus:ring-[#7749f8] focus:ring-offset-1 focus:ring-offset-[#f8f9fa]" ref={password} required/>
        <div className='flex gap-3 justify-center items-center'>
        <button type='submit' className="bg-[#7749f8] text-white rounded-lg p-3">{loader ? <span className="loading loading-spinner loading-md"></span> : 'Login'}</button>
        <p className='text-[#7749f8]'>OR</p>
        <button onClick={()=>{navigate('/signup')}} className="bg-[#7749f8] text-white rounded-lg p-3">Signup</button>
        </div>
      </form>
      </div>
    



      {invalidEmail && <div role="alert" className="alert alert-error w-[300px] fixed bottom-3 left-[37vw]">
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
  <span className='text-white'>Invalid Email / Password !!!</span>
  <button
            onClick={closeAlert}
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




{loginFailed && <div role="alert" className="alert alert-error w-[300px] fixed bottom-3 left-[37vw]">
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
            onClick={closeAlert}
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







    </div>
  )
}

export default Login
