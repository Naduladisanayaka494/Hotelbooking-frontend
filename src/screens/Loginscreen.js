
import React ,{useState,useEffect}from 'react'

function Loginscreen() {
   
    const[email,setemail]=useState('')
    const[password,setpassword]=useState('')
  
  
    function login(){
      
        
  
         const user ={ 
          email,
          password,
         
          
  
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