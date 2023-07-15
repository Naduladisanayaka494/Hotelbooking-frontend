/* eslint-disable react/jsx-no-undef */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Room from '../components/Room';
import Loader from '../components/Loader';
import Error from '../components/Error';
import { DatePicker } from 'antd';
import moment from 'moment';


const { RangePicker } = DatePicker;

function Homescreen() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fromdate, setfromdate] = useState();
  const [todate, settodate] = useState();
  const [duplicaterooms, setduplicaterooms] = useState([]);
  const [searchkey, setsearchkey]= useState('');
  const [type, settype]= useState('all')



  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/rooms/getallrooms');
        setRooms(response.data);
        setduplicaterooms(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
        console.log(error);
      }
    };

    fetchRooms();
  }, []);

  useEffect(() => {
    console.log('fromdate:', fromdate);
    console.log('todate:', todate);
  }, [fromdate, todate]);



  function filterByDate(dates) {
     const fromDateFormatted = dates[0].format('DD-MM-YYYY');
    const toDateFormatted = dates[1].format('DD-MM-YYYY');
  
    setfromdate(fromDateFormatted);
    settodate(toDateFormatted);
  
    //tempRooms
    var tempRooms = [];
  
    for (const room of duplicaterooms) {
      var availability = false;
  
      if (room.currentbookings.length > 0) {
        for ( const booking of room.currentbookings) {
          //check between or equal to dates
          if (
            !moment(moment(dates[0]).format("DD-MM-YYYY")).isBetween(
              booking.fromdate,
              booking.todate
            ) &&
            !moment(moment(dates[1]).format("DD-MM-YYYY")).isBetween(
              booking.fromdate,
              booking.todate
            )
          ) {
            
            if (
              dates[0].format("DD-MM-YYYY") !== booking.fromdate &&
              dates[0].format("DD-MM-YYYY") !== booking.todate &&
              dates[1].format("DD-MM-YYYY") !== booking.fromdate &&
              dates[1].format("DD-MM-YYYY") !== booking.todate
            ) {
              availability = true;
            }
          }
        }
      } else {
        availability = true;
      }
  
      if (availability === true) {
        tempRooms.push(room);
      }
    }
  
    setRooms(tempRooms);
  }
  
  function filterBysearch(){
    const temprooms = duplicaterooms.filter(room=>room.name.toLowerCase().includes(searchkey.toLowerCase()))
    setRooms(temprooms)
    
  }
  function filterByType(e) {
    settype(e)
    if (e !== 'All') {
      const temprooms = duplicaterooms.filter(room => room.type.toLowerCase() === e.toLowerCase());
      setRooms(temprooms);
    } else {
      setRooms(duplicaterooms);
    }
  }
  
  
  
  

  return (
    <div className='container'>
      <div className='row mt-5 bs'>
        <div className='col-md-3'>
          <RangePicker format='DD-MM-YYYY' onChange={filterByDate} />
        </div>
        <div className='col-md-3'>
          <input type='text' className='form-control' placeholder='search rooms' value={searchkey} onChange={(e)=>{setsearchkey(e.target.value)}} onKeyUp={filterBysearch} />
        </div>
       
        <div className='col-md-3'>
        <select className='form-control' value={type} onChange={(e)=>{filterByType(e.target.value)}}>
          <option value="All">All</option>
          <option value="Deluxe">Deluxe</option>
          <option value="Standard">Standard</option>
          <option value="Suite">Suite</option>
          <option value="Executive">Executive</option>
          <option value="single">single</option>
        </select>
        </div>
      </div>

      <div className='container'>
        <div className='row justify-content-center mt-5'>
          {loading ? (
            <Loader />
          )
            
           : (
            rooms.map((room) => (
              <div className='com-md-9 mt-2'>
                <Room room={room} fromdate={fromdate} todate={todate} />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Homescreen;
