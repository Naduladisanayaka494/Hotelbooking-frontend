import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Homescreen() {
    const[rooms,setrooms]=useState([]);

  useEffect(() => {
    axios
      .get('/api/rooms/getallrooms')
      .then(response => {
        const data = response.data;
        setrooms(data)
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div className='App'>
      <navbar />
      <h1>Homescreen</h1>
      <h1>there are{rooms.length-1} rooms</h1>
      
    </div>
  );
}

export default Homescreen;
