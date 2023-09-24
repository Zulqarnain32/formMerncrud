import React, { useEffect, useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
const [ success,setSuccess ] = useState("")
const navigate = useNavigate()
axios.defaults.withCredentials = true;
useEffect(() => {
axios.get('http://localhost:5000/dashboard')
.then(res => {
    if(res.data === "Success"){
      setSuccess("Successful OK ")
    } else {
        navigate('/')
    }
}) .catch(err => console.log(err))
}, [])
  return (
    <>
       <h1>Dashborad page</h1> 
       <p>{success}</p>
    </>
  )
}

export default Dashboard
