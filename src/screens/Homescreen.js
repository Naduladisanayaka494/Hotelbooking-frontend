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

  // function filterByDate(dates) {
  //   const fromDateFormatted = dates[0].format('DD-MM-YYYY');
  //   const toDateFormatted = dates[1].format('DD-MM-YYYY');
  
  //   setfromdate(fromDateFormatted);
  //   settodate(toDateFormatted);
  
  //   const tempRooms = [];
  
  //   for (const room of duplicaterooms) {
  //     let availability = true;
  
  //     if (room.currentbookings.length > 0) {
  //       for (const booking of room.currentbookings) {
  //         console.log(room.currentbookings)
  //         const bookingFromDate = moment(booking.fromdate, 'DD-MM-YYYY');
  //         const bookingToDate = moment(booking.todate, 'DD-MM-YYYY');
          
  //         console.log("booktodate", bookingToDate)
  
  //         if (
  //           (bookingFromDate.isSameOrBefore(dates[1], 'day') && bookingToDate.isSameOrAfter(dates[0], 'day')) ||
  //           (bookingFromDate.isSameOrBefore(dates[0], 'day') && bookingToDate.isSameOrAfter(dates[1], 'day'))
  //         ) {
  //           availability = false;
  //           break;
  //         }
  //       }
  //     }
  
  //     if (availability || room.currentbookings.length === 0) {
  //       tempRooms.push(room);
  //     }
  //   }
  
  //   setRooms(tempRooms);
  // }

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
  
  
  
  

  return (
    <div className='container'>
      <div className='row mt-5'>
        <div className='col-md-3'>
          <RangePicker format='DD-MM-YYYY' onChange={filterByDate} />
        </div>
      </div>

      <div className='container'>
        <div className='row justify-content-center mt-5'>
          {loading ? (
            <Loader />
          ) : error ? (
            <Error />
          ) : (
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
