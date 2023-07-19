import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Tabs } from 'antd';
import Loader from '../components/Loader';
import swal from 'sweetalert';

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
      children:<AddRoom/>,
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



 
  
  export function AddRoom() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const[name,setname]=useState('')
    const[rentperday,setrentperday]=useState('')
    const[maxcount,setmaxcount]=useState('')
    const[description,setdescription]=useState('')
    const[phonenumber,setdphonenumber]=useState('')
    const[type,settype]=useState('')
    const[imageurl1,setimageurl1]=useState('')
    const[imageurl2,setimageurl2]=useState('')
    const[imageurl3,setimageurl3]=useState('')

   async function addRoom(){
      const newRoom={
        name,
        rentperday,
        maxcount,
        description,
        phonenumber,
        type,
        imageUrls:[imageurl1,imageurl2,imageurl3]
      }
      console.log(newRoom)
      try {
        setLoading(true)
        const result = await (await axios.post('/api/rooms/addroom',newRoom)).data
        console.log(result)
        setLoading(false)
        swal('Congragulations',' Room Added successfully','success').then(result=>{
          window.location.href='/home'
        })
        
      } catch (error) {
        console.log(error)
        setLoading(false)
        swal('Oops','something went wrong','error')
        
      }
    
    }

    return (
   
      <div className='row'>
           {loading && <Loader />}
      <div className='col-md-5'>
        <input type='text' className='form-control' placeholder='room name' value={name} onChange={ (e)=>{setname(e.target.value)} }/>
        <input type='text' className='form-control' placeholder='rent per day' value={rentperday} onChange={ (e)=>{setrentperday(e.target.value)} }/>
        <input type='text' className='form-control' placeholder='max count' value={maxcount} onChange={ (e)=>{setmaxcount(e.target.value)} } />
        <input type='text' className='form-control' placeholder='description' value={description} onChange={ (e)=>{setdescription(e.target.value)} } />
        <input type='text' className='form-control' placeholder='phone number'value={phonenumber} onChange={ (e)=>{setdphonenumber(e.target.value)} } />

      </div>

      <div className='col-md-5'>
      <input type='text' className='form-control' placeholder='type'value={type} onChange={ (e)=>{settype(e.target.value)} } />
        <input type='text' className='form-control' placeholder='image url1' value={imageurl1} onChange={ (e)=>{setimageurl1(e.target.value)} } />
        <input type='text' className='form-control' placeholder='image url2'value={imageurl2} onChange={ (e)=>{setimageurl2(e.target.value)} } />
        <input type='text' className='form-control' placeholder='image url3' value={imageurl3} onChange={ (e)=>{setimageurl3(e.target.value)} }/>

      </div>
      
      <div style={{ float: 'right' }}>
                <button className='btn btn-primary' onClick={addRoom}>Add room</button>
              </div>


      </div>
    )
  }
  


  
  
