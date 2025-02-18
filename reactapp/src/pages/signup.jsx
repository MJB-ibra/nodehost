import React from 'react'
import { useState} from 'react'
import axios from 'axios'
import { Link} from 'react-router-dom'
import '../styles/style.css'
const Signup = () => {

const [username,setUsername] = useState('')
const [password,setPassword] = useState('')
const [data,setData] = useState('')

    
const insertApi = async (e)=>{
  e.preventDefault();
  try {
  const response = await axios.post('http://localhost:3210/insert',{username,password})
if (response && response.data) {
  if (response.data.success) {
    setUsername('')
    setPassword('')
   location.replace('/login')
  }
  else{
    setData(response.data.message)
  }
}
else{
   alert('Error ! on server')
}

  } catch (error) {
    console.log('error inserting:',error)
    alert('error!')
  }
}
    return (
<>
<form onSubmit={insertApi}>
<div className='error'>{data}</div>
<h1>Signup</h1> <br></br>
<input type="text" value={username} onChange={(e)=> setUsername(e.target.value)} required placeholder='Username'/>
<br></br>
<input type="password" value={password} onChange={(e)=> setPassword(e.target.value)} required  placeholder='Password'/>
<br></br>
<button>SIgnup</button><br></br>
<Link to="/login">Already Have An Account</Link><br></br><br></br>
</form>
</>
  )
}

export default Signup