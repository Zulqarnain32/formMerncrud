import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
const Signup = () => {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post("http://localhost:5000/register", { name, email, password })
      .then(res => {
        alert("User Account created Successfully")
        navigate('/login')
      }).catch(err => {
        alert("Registration failed")
        console.log(err);
      })
  }



  return (
    <>
      <div className="signup-container">
        <div className="signup-box">
          <form onSubmit={handleSubmit}>
            <h2>Register</h2>
            <h4>Name</h4>
            <input 
              type="text"
              placeholder='Enter Name'
              onChange={(e) => setName(e.target.value)}
            />
            <h4>Email</h4>
            <input
              type="text"
              placeholder='Enter Email'
              onChange={(e) => setEmail(e.target.value)}
            />
            <h4>Password</h4>
            <input type="password" placeholder='Enter Password' onChange={(e) => setPassword(e.target.value)} />
            <button className="register" type='submit'>Register</button>
          </form>
          <Link to="/login" className='account'>Already have an account?</Link>
        </div>
      </div>
    </>
  )
}

export default Signup
