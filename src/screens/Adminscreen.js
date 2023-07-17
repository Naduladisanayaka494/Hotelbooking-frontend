import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Tabs } from 'antd';
import Loader from '../components/Loader';

const onChange = (key: string) => {
  console.log(key);
};

function Adminscreen() {
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Bookings',
      children: <Bookings/>,
      
      
    },
    {
      key: '2',
      label: 'Rooms',
      children: <h1>Rooms</h1>,
    },
    {
      key: '3',
      label: 'Add Room',
      children: <h1>Add Rooms</h1>,
    },
    {
      key: '4',
      label: 'Users',
      children: <h1>Add Users</h1>,
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
          {bookings.length > 0 && <h1>There are a total of {bookings.length} bookings</h1>}
          {error && <p>An error occurred while fetching bookings.</p>}
        </div>
      </div>
    );
  }
  
  
