
import React ,{useState,useEffect}from 'react'
import axios from "axios";

function Loginscreen() {
   
    const[email,setemail]=useState('')
    const[password,setpassword]=useState('')
  
  
    async function login(){
      
        
  
         const user ={ 
          email,
          password,
         
          
  
        }
       
        try {
          const result = await axios.post('/api/users/login', user);
          console.log(result.data);
        } catch (error) {
          console.log(error);
        }
        console.log(user)
      
     
        
       
     
      
    }
  
    return (
      <div className='row justify-content-center mt-5'>
        <div className='col-md-5'>
          <div className='bs'>
            <h1>login</h1>

            <input type="text" className="form-control mt-2" placeholder="email" value={email} onChange={(e)=>{setemail(e.target.value)}}/>
            <input type="text" className="form-control mt-2" placeholder="password" value={password} onChange={(e)=>{setpassword(e.target.value)}} />

            <button className='btn btn-primary mt-3' onClick={login}>login</button>
  
          </div>
  
        </div>
  
  
      </div>
    )
}

export default Loginscreen