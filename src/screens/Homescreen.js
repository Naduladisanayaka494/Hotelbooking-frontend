/* eslint-disable react/jsx-no-undef */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Room from '../components/Room';
import Loader from '../components/Loader';
import Error from '../components/Error';

function Homescreen() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/rooms/getallrooms');
        setRooms(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
        console.log(error);
      }
    };

    fetchRooms();
  }, []);

  return (
    <div className="container">
         <div className='row justify-content-center mt-5'>
         {loading ? (<Loader></Loader>):error ? (<Error></Error>):(rooms.map(room=>{
      return <div className='com-md-9 mt-2'>
           <Room room={room}/>
      </div>
     }))}
          

         </div>



    </div>
  );
}

export default Homescreen;
