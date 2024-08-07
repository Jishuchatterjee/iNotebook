import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
const Signup=(props)=> {
    const host="http://127.0.0.1:5000"
    let navigate=useNavigate();
    const[credentials,setCredentials]=useState({name:"",email:"",password:"",cpassword:""})
    const handleClick=async(e)=> {
        e.preventDefault();
        const response=await fetch(`${host}/api/auth/createuser`,{
            method:'POST',
            headers: {
             
              'Content-Type': 'application/json'
              
              
            
            },
            body:JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password})

    });
    const json=await response.json();
      console.log(json);
      if(json.sucess)
      {
        localStorage.setItem('token',json.authtoken);
        navigate("/");
        props.showAlert("Account Created Successfully","success")
        
      } 
      else
      {
        props.showAlert("Invalid Details","danger")
      }
    }
const onChange=(e)=> {
   setCredentials({...credentials,[e.target.name]:e.target.value})
    
 }


  return (
    <div className="container">
      <h2>Signup to continue to iNotebook</h2>
    <form onSubmit={handleClick}>
      <div className="mb-3">
    <label htmlFor="exampleFormControlInput1" className="form-label">Name</label>
    <input type="text" className="form-control" id="name"name="name" placeholder="name@example.com" value={credentials.name} onChange={onChange}/>
      
    <label htmlFor="exampleFormControlInput1" className="form-label my-2">Email Address</label>
    <input type="email" className="form-control" id="email"name="email" placeholder="name@example.com" value={credentials.email} onChange={onChange}/>
    
    
    <label htmlFor="inputPassword5" className="form-label my-2">Password</label>
    <input type="password" id="password" name="password" className="form-control" aria-describedby="passwordHelpBlock" value={credentials.password} onChange={onChange} minLength={5} required/>
    <div id="passwordHelpBlock" className="form-text">
    </div>
    <label htmlFor="inputPassword5" className="form-label">Confirm Password</label>
    <input type="password" id="cpassword" name="cpassword" className="form-control" aria-describedby="passwordHelpBlock" value={credentials.cpassword} onChange={onChange} minLength={5} required/>
    <div id="passwordHelpBlock" className="form-text">
   </div>
   <button className="btn btn-primary my-2" type="submit">Submit</button>
   </div>
   </form>
    </div>
  )

}

export default Signup
