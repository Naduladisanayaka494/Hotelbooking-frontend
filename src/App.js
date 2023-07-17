import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import Room from './components/Room';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Homescreen from './screens/Homescreen';
import Bookingsscreen from './screens/Bookingsscreen';
import Registerscreen from './screens/Registerscreen';
import Loginscreen from './screens/Loginscreen';
import Profilescreen from './screens/Profilescreen';
import Adminscreen from './screens/Adminscreen';

function App() {
  return (
    <div className="App">
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Homescreen />} />
          <Route path="/rooms" element={<Room />} />
          <Route path="/book/:roomid/:fromdate/:todate" element={<Bookingsscreen />} />
          <Route path="/register" element={<Registerscreen/>} />
          <Route path="/login" element={<Loginscreen/>} />
          <Route path="/profile" element={<Profilescreen/>} />
          <Route path="/admin" element={<Adminscreen/>} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
