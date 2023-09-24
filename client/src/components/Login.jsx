import React, { useState } from 'react'
import { Link,useNavigate } from "react-router-dom"
import axios from "axios"

const Login = () => {
  
  const [ email,setEmail ] = useState("")
  const [ password,setPassword ] = useState("")
  const navigate = useNavigate()

  axios.defaults.withCredentials = true; 
  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post("http://localhost:5000/login",{ email,password })
    .then(res => {
      if(res.data.Status === "Success"){
        if(res.data.role === "admin"){
          navigate('/dashboard')
        } else {
          navigate('/')
        }
      }
      alert("login Successfully")
      console.log(res.data);
    }).catch(err => {
      alert("Logined failed")
      console.log(err);
    }) 
  }

  return (
    <>
       <div className="signup-container">
         <div className="signup-box">
            <form onSubmit={handleSubmit}>
                <h2>Login</h2>
                
                <h4>Email</h4>
                <input type="text" placeholder='Enter Email' onChange={(e) => setEmail(e.target.value) }/>
                <h4>Password</h4>
                <input type="password" placeholder='Enter Password' onChange={(e) => setPassword(e.target.value) }/>
                
                <button className="register" type='submit'>Login</button>
            </form>
                <Link to = "/signup" className='account'>Don't have an account?</Link>
         </div>
      </div>
    </>
  )
}

export default Login
