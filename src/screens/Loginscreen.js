
import React ,{useState,useEffect}from 'react'
import axios from "axios";
import Loader from '../components/Loader';
import Error from '../components/Error';
import Success from '../components/Success';
import { Link } from 'react-router-dom';

function Loginscreen() {
   
    const[email,setemail]=useState('')
    const[password,setpassword]=useState('')
    const [loading, setloading] = useState(false);
    const [error, seterror] = useState();
  
  
    async function login(){
      
        
  
         const user ={ 
          email,
          password,
         
          
  
        }
       
        try {
          setloading(true);
          const result = await axios.post('/api/users/login', user);
          setloading(false);
          localStorage.setItem('currentUser',JSON.stringify(result))
          window.location.href='/home'
        } catch (error) {
          console.log(error);
          setloading(false);
          seterror(true)
          
        }
        console.log(user)
      
     
        
       
     
      
    }
  
    return (
      <div>
          {loading && <Loader />}
      <div className='row justify-content-center mt-5'>
        <div className='col-md-5'>
        {error && <Error message='Invalid credetials'/>}
          <div className='bs'>
            <h1>login</h1>

            <input type="text" className="form-control mt-2" placeholder="email" value={email} onChange={(e)=>{setemail(e.target.value)}}/>
            <input type="text" className="form-control mt-2" placeholder="password" value={password} onChange={(e)=>{setpassword(e.target.value)}} />

            <button className='btn btn-primary mt-3' onClick={login}>login</button>
  
          </div>
  
        </div>
  
  
      </div>
      </div>
    )
}

export default Loginscreen