import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
const Login=(props)=> {
const host="http://127.0.0.1:5000"
let navigate=useNavigate();
const[credentials,setCredentials]=useState({email:"",password:""})
const handleSubmit=async(e)=> {
    e.preventDefault();
    const response=await fetch(`${host}/api/auth/login`,{
        method:'POST',
        headers: {
         
          'Content-Type': 'application/json'
          
          
        
        },
        body:JSON.stringify({email:credentials.email,password:credentials.password})
        
      }); 
      const json=await response.json();
      console.log(json);
      if(json.success)
      {
        localStorage.setItem('token',json.authtoken);
        navigate("/");
        props.showAlert("Logined successfully","success");
      }
      else
      {
        props.showAlert("Invalid Credentials","danger");
      }
      
      console.log(localStorage.getItem('token'))
     
      }
const onChange=(e)=> {
   setCredentials({...credentials,[e.target.name]:e.target.value})
    
 }
 

  return (
    <div>
      <h2>Login to continue to iNotebook</h2>
      <div className="mb-3 my-3">
        <form onSubmit={handleSubmit}>
        <label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
        <input type="email" className="form-control" id="email" name='email' placeholder="name@example.com" value={credentials.email} onChange={onChange}/>
        <label htmlFor="inputPassword5" className="form-label my-2">Password</label>
        <input type="password" id="password" name="password" className="form-control" aria-describedby="passwordHelpBlock" value={credentials.password} onChange={onChange}/>
        <div id="passwordHelpBlock" className="form-text">
        <button className="btn btn-primary my-2" type="submit">Submit</button>
        
        
       </div>
       </form>
    </div>
    </div>
    
  )
}

export default Login
