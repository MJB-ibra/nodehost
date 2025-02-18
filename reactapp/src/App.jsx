import React from 'react'
import { BrowserRouter as Router,Routes,Route,BrowserRouter } from 'react-router-dom'
import Signup from './pages/signup'
import Login from './pages/login'
import Home from './pages/home'

const App = () => {
return(
  <>
  <BrowserRouter>
  <Routes>
    <Route index path='/' element={<Signup/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/home' element={<Home/>}/>
  </Routes>
  </BrowserRouter>
  </>

) 
}

export default App