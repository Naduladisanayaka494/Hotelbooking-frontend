import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function Bookingsscreen() {
  const { roomid } = useParams();
  const [room, setRoom] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setLoading(true);
        const data = (await axios.post('/api/rooms/getroombyid', { roomid })).data;
        setRoom(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
        console.log(error);
      }
    };

    fetchRooms();
  }, [roomid]);

  return (
    <div  className='m-5'>
       {loading ? (<h1>Loading .....</h1>):error ? (<h1>Error</h1>):(<div>
             <div className="row justify-content-center mt-5 bs">

              <div className='col-md-5'>
                <h1>{room.name}</h1>
                <img
          className="d-block w-100 bigimg"
          src={room.imageUrls[0] }
        />

              </div>
              
              <div className='col-md-5'>
              
              <div style={{ textAlign:'right' }}>
              <h1>Booking details</h1>
                <hr></hr>
                <b>
                <p>Name:</p>
                <p>From Date:</p>
                <p>To Date:</p>
                <p>Max count:</p>
                </b>

                <h1>Amount</h1>
                <hr></hr>
                <b>
                <p>Total days:</p>
                <p>Rent Per day:{room.rentperday}</p>
                <p>Total Amount:</p>
                </b>

              </div>
              
            

                <div style={{ float:'right' }}>
                  <button className='btn btn-primary'>Pay Now</button>
                </div>


                <div>
                  

                </div>
              </div>


             </div>


       </div>)}
    </div>
  );
}

export default Bookingsscreen;
