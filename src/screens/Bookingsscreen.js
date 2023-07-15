import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import Error from '../components/Error';
import moment from 'moment';
import swal from 'sweetalert';
import { useHistory } from 'react-router-dom';
function Bookingsscreen() {
  const { roomid, fromdate, todate } = useParams();
  const [room, setRoom] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fromDateObj = moment(fromdate, 'DD-MM-YYYY');
  const toDateObj = moment(todate, 'DD-MM-YYYY');
  const totaldays = toDateObj.diff(fromDateObj, 'days') + 1;
  // const totalamount=totaldays * room.rentperday
  const [totalamount, settotalamount] = useState();
  

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setLoading(true);
        const data = (await axios.post('/api/rooms/getroombyid', { roomid })).data;
        settotalamount(data.rentperday*totaldays)
        setRoom(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
        console.log(error);
        console.log(JSON.parse(localStorage.getItem('currentUser')).data._id);

      }
    };

    fetchRooms();
  }, [roomid]);

  async function bookRoom(){
    const bookingDetails= {
      room,
      userid:JSON.parse(localStorage.getItem('currentUser')).data.id,
      fromdate,
      todate,
      totalamount,
      totaldays,
      

    }
    
    try {
      setLoading(true)
      const result = await axios.post('/api/bookings/bookroom',bookingDetails)
      setLoading(false)
      swal('Congragulations','Your room booked successfully','success').then(result=>{
        window.location.href='/bookings'
      })
    } catch (error) {
      setLoading(false)
      swal('Oops','something went wrong','error').then(result=>{
        window.location.href='/bookings'
      })
    }
  }

  return (
    <div className='m-5'>
      {loading ? (
        <Loader />
      ) : error ? (
        <Error />
      ) : (
        <div>
          <div className="row justify-content-center mt-5 bs">
            <div className='col-md-5'>
              <h1>{room.name}</h1>
              <img className="d-block w-100 bigimg" src={room.imageUrls[0]} />
            </div>
            <div className='col-md-5'>
              <div style={{ textAlign: 'right' }}>
                <h1>Booking details</h1>
                <hr></hr>
                <b>
                  <p>Name:{JSON.parse(localStorage.getItem('currentUser')).data.name}</p>
                  <p>From Date: {fromdate}</p>
                  <p>To Date: {todate}</p>
                  <p>Max count:</p>
                </b>
                <h1>Amount</h1>
                <hr></hr>
                <b>
                  <p>Total days: {totaldays}</p>
                  <p>Rent Per day: {room.rentperday}</p>
                  <p>Total Amount:{totalamount}</p>
                </b>
              </div>
              <div style={{ float: 'right' }}>
                <button className='btn btn-primary' onClick={bookRoom}>Pay Now</button>
              </div>
              <div></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Bookingsscreen;
