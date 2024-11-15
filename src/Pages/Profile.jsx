import React, { useRef } from 'react'

const Profile = () => {
  
  const oldpassword = useRef()
  const newpassword = useRef()
  const repeatnewpassword = useRef()


  
  
  
  return (
    <div className='flex flex-col '>
      <h1>Muhammad Talal</h1>
      <h2>Password</h2>
      <form className='flex flex-col justify-center items-start gap-5'>
        <input type="password" placeholder="Old Password" className="input input-bordered w-full max-w-xs" ref={oldpassword} required/>
        <input type="password" placeholder="New Password" className="input input-bordered w-full max-w-xs" ref={newpassword} required/>
        <input type="password" placeholder="Repeat Password" className="input input-bordered w-full max-w-xs" ref={repeatnewpassword} required/>
        <button className="btn btn-primary">Update Password</button>
      </form>
    </div>
  )
}

export default Profile
