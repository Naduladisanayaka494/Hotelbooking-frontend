import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import Loader from '../components/Loader';
import Error from '../components/Error';
import swal from 'sweetalert';
import { Divider, Space, Tag } from 'antd';


const onChange = (key: string) => {
  console.log(key);
};

function Profilescreen() {
  const user = JSON.parse(localStorage.getItem('currentUser'));

  useEffect(() => {
    if (!user) {
      window.location.href = '/login';
    }
  }, []);

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Profile',
      children: (
        <div>
          <h1>My profile</h1>
          <br />
          <h1>Name: {user?.data?.name}</h1>
          <h1>Email: {user?.data?.email}</h1>
          <h1>IsAdmin: {user?.data?.isAdmin ? 'Yes' : 'No'}</h1>
        </div>
      ),
    },
    {
      key: '2',
      label: 'Bookings',
      children: <Mybookings />,
    },
  ];

  return <Tabs defaultActiveKey="1" items={items} onChange={onChange} />;
}

export default Profilescreen;

export function Mybookings() {
  const user = JSON.parse(localStorage.getItem('currentUser'));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const[bookings,setbookings]=useState([])
  useEffect(() => {
    async function fetchBookings() {
      try {
        setLoading(true);
        const rooms = await (await axios.post('/api/bookings/getbookingsbyuserid', { userid: user?.data?.id })).data;

        setbookings(rooms)
        setLoading(false);
        console.log(rooms);
      } catch (error) {
        console.log(error);
        setLoading(false);
        setError(true)
      }
    }

    fetchBookings();
  }, []);

  async function cancelBooking(bookingid,roomid){

    try {
      setLoading(true)
      const result = await (await axios.post('/api/bookings/cancelbooking', { bookingid,roomid})).data;
      console.log(result);
      setLoading(false)
      swal('Congragulations','Your room Cancelled successfully','success').then(result=>{
        window.location.reload()
      })
    } catch (error) {
      console.log(error);

      setLoading(false)
      swal('Oops','something went wrong','error')
    }

  }

  return(
    <div>
        <div className='row'>
            <div className='col-md-6'>
                {loading && (<Loader/>)}
                {bookings && bookings.map((booking) => (
                         <div className='bs'>
                    <h1>{booking.room}</h1>
                    <p>'Booking id:{booking._id}</p>
                    <p>'CheckIn:{booking.fromdate}</p>
                    <p>'CheckOut:{booking.todate}</p>
                    <p>'Total amount:{booking.totalamount}</p>
                    <p>'status:{booking.status=='booked' ? (   <Tag color="green">Confirmed</Tag>):( <Tag color="red">Cancelled</Tag>)}</p>
                    {booking.status !='cancelled' &&(    <div style={{ float: 'right' }}>
                <button className='btn btn-primary' onClick={()=>{cancelBooking(booking._id,booking.roomid)}} >Cancel booking</button>
              </div>)}
                

                    </div>

))}

            </div>
        </div>
    </div>
  );
}
