import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div>
      <div className="navbar bg-base-100">
  <div className="flex-1">
    <Link to={'/'} className="btn btn-ghost text-xl">Blogging App</Link>
  </div>
  <div className="flex-none">
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button">
        <div>
          <p>Muhammad Talal</p>
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        <li>
          <Link to={'profile'} className="justify-between">
            Profile
        </Link>
        </li>
        <li><Link to={'dashboard'} className="justify-between">
            Dashboard
        </Link></li>
        <li><Link to={'login'} className="justify-between">
            Login
        </Link></li>
        <li><Link to={'signup'} className="justify-between">
            Signup
        </Link></li>
      </ul>
    </div>
  </div>
</div>
    </div>
  )
}

export default Navbar
