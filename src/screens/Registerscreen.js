import React, { useState } from 'react';
import axios from "axios";
import Loader from '../components/Loader';
import Error from '../components/Error';
import Success from '../components/Success';

function Registerscreen() {
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [cpassword, setcpassword] = useState('');
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState();
  const [success, setsuccess] = useState();


  async function register() {
    if (password === cpassword) {
      const user = { name, email, password, cpassword };
      try {
        setloading(true)
        const result = await axios.post('/api/users/register', user);
        setloading(false);
        setsuccess(true);
        setname('');
        setemail('');
        setpassword('')
        setcpassword('')
        console.log(result.data);
      } catch (error) {
        setloading(false);
        seterror(true)
        console.log(error);
      }
    } else {
      alert('Passwords do not match');
    }
  }

  return (
    <>
      {loading && <Loader />}
      {error && <Error />}
   
      <div className="row justify-content-center mt-5">
        <div className="col-md-5">
        {success && <Success message="Registration success" />}
          <div className="bs">
            <h1>Register</h1>
            <input
              type="text"
              className="form-control"
              placeholder="name"
              value={name}
              onChange={(e) => {
                setname(e.target.value);
              }}
            />
            <input
              type="text"
              className="form-control mt-2"
              placeholder="email"
              value={email}
              onChange={(e) => {
                setemail(e.target.value);
              }}
            />
            <input
              type="password" // Changed the input type to "password"
              className="form-control mt-2"
              placeholder="password"
              value={password}
              onChange={(e) => {
                setpassword(e.target.value);
              }}
            />
            <input
              type="password" // Changed the input type to "password"
              className="form-control mt-2"
              placeholder="confirm password"
              value={cpassword}
              onChange={(e) => {
                setcpassword(e.target.value);
              }}
            />
            <button className="btn btn-primary mt-3" onClick={register}>
              Register
            </button>
          </div>
        </div>
      </div>
    </>
  );
  
}

export default Registerscreen;
