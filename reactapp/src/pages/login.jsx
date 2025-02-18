import React from 'react'
import { useState} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import '../styles/style.css'
const Login = () => {

const [username,setUsername] = useState('')
const [password,setPassword] = useState('')
const [data,setData] = useState('')
 
const selectApi = async (e)=>{
  e.preventDefault();
  try {
  const response = await axios.post('http://localhost:3210/log',{username,password},{withCredentials:true})
  if (response) {
    if (response.data.success) {
      location.replace('/home')
    }
    else{
      setData(response.data.message)
    }
  }
  else{
    setData(response.data.message)
  }

  } catch (error) {
    console.log('error inserting:',error)
    alert('error!')
  }
}
    return (
<>
<form onSubmit={selectApi}>
<div className='error'>{data}</div>
<h1>Login</h1> <br></br>
<input type="text" value={username} onChange={(e)=> setUsername(e.target.value)} required placeholder='Username'/>
<br></br>
<input type="password" value={password} onChange={(e)=> setPassword(e.target.value)} required  placeholder='Password'/>
<br></br>
<button>Login</button><br></br>
<Link to='/'>Create An Account</Link><br></br><br></br>
</form>
</>
  )
}

export default Login