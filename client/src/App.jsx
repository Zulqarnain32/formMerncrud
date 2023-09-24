import React from 'react'
import Signup from './components/Signup'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Login from './components/Login'

import { BrowserRouter,Routes,Route } from 'react-router-dom'
import "./App.css"
import Dashboard from './components/Dashboard'
const App = () => {
  return (
    <>
     <BrowserRouter>
       <Navbar/>
       <Routes>
         <Route path = "/" element = {<Home/>}/>
         <Route path = "/signup" element = {<Signup/>}/>
         <Route path = "/login" element = {<Login/>}/>
         <Route path = "/dashboard" element = {<Dashboard/>}/>
       </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
