import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Tabs } from 'antd';
import Loader from '../components/Loader';

const onChange = (key: string) => {
  console.log(key);
};

function Adminscreen() {
  const user = JSON.parse(localStorage.getItem('currentUser'));

  useEffect(() => {
    if (!JSON.parse(localStorage.getItem('currentUser')).data.isAdmin) {
      window.location.href = '/home';
    }
  }, [])



  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Bookings',
      children: <Bookings/>,
      
      
    },
    {
      key: '2',
      label: 'Rooms',
      children: <Rooms/>,
    },
    {
      key: '3',
      label: 'Add Room',
      children: <h1>Add Rooms</h1>,
    },
    {
      key: '4',
      label: 'Users',
      children:<Users/>,
    },
  ];

  return (
    <div>
      <h2 className='text-center'>Admin Panel</h2>
      <div className='mt-3 ml-3 mr-3 bs'>
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
      </div>
    </div>
  );
}

export default Adminscreen;

export function Bookings() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get('/api/bookings/getallbookings');
          setBookings(response.data);
          setLoading(false);
        } catch (error) {
          setLoading(false);
          setError(true);
        }
      };
  
      fetchData();
    }, []);
  
    return (
      <div className='row'>
        <div className='col-md-10'>
          <h1>Bookings</h1>
          {loading && <Loader />}
          <table className='table table-bordered table-dark' style={{ backgroundColor: 'black' }}>
            <thead className='bs'>
              <tr>
                <th>Booking Id</th>
                <th>User Id</th>
                <th>Room</th>
                <th>From</th>
                <th>To</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.length > 0 && bookings.map(booking => (
                <tr key={booking._id}>
                  <td>{booking._id}</td>
                  <td>{booking.userid}</td>
                  <td>{booking.room}</td>
                  <td>{booking.fromdate}</td>
                  <td>{booking.todate}</td>
                  <td>{booking.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {error && <p>An error occurred while fetching bookings.</p>}
        </div>
      </div>
    );
    
  }

  export function Rooms() {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get('/api/rooms/getallrooms');
          setRooms(response.data);
          setLoading(false);
        } catch (error) {
          setLoading(false);
          setError(true);
        }
      };
  
      fetchData();
    }, []);
  
    return (
      <div className='row'>
        <div className='col-md-10'>
          <h1>Rooms</h1>
          {loading && <Loader />}
          <table className='table table-bordered table-dark' style={{ backgroundColor: 'black' }}>
            <thead className='bs'>
              <tr>
                <th>Room Id</th>
                <th>Name</th>
                <th>Type</th>
                <th>Rent Per Day</th>
                <th>Max Count</th>
                <th>Phonenumber</th>
              </tr>
            </thead>
            <tbody>
              {rooms.length > 0 && rooms.map(booking => (
                <tr key={booking._id}>
                  <td>{booking._id}</td>
                  <td>{booking.name}</td>
                  <td>{booking.type}</td>
                  <td>{booking.rentperday}</td>
                  <td>{booking.maxcount}</td>
                  <td>{booking.phonenumber}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {error && <p>An error occurred while fetching bookings.</p>}
        </div>
      </div>
    );
    
  }


  export function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get('/api/users/getallusers');
          setUsers(response.data);
          setLoading(false);
        } catch (error) {
          setLoading(false);
          setError(true);
        }
      };
  
      fetchData();
    }, []);
  
    return (
      <div className='row'>
        <div className='col-md-10'>
          <h1>Users</h1>
          {loading && <Loader />}
          <table className='table table-bordered table-dark' style={{ backgroundColor: 'black' }}>
            <thead className='bs'>
              <tr>
                <th>User Id</th>
                <th>Name</th>
                <th>Email</th>
                <th>Is Admin</th>
            
              </tr>
            </thead>
            <tbody>
              {users.length > 0 && users.map(booking => (
                <tr key={booking._id}>
                  <td>{booking._id}</td>
                  <td>{booking.name}</td>
                  <td>{booking.email}</td>
                  <td>{booking.isAdmin  ? 'YES':'NO'}</td>
                 
                </tr>
              ))}
            </tbody>
          </table>
          {error && <p>An error occurred while fetching bookings.</p>}
        </div>
      </div>
    );
    
  }

  
  
