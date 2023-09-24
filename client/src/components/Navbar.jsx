import React from 'react'
import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <>
      <div className="navbar">
         <Link to = "/" className='navlinks'>Home</Link>
         <Link to = "/signup" className='navlinks'>Signup</Link>
         <Link to = "/login" className='navlinks'>Login</Link>
      </div> 
    </>
  )
}

export default Navbar
