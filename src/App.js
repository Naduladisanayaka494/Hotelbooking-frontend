import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import Room from './components/Room';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Homescreen from './screens/Homescreen';
import Bookingsscreen from './screens/Bookingsscreen';
import Registerscreen from './screens/Registerscreen';
import Loginscreen from './screens/Loginscreen';

function App() {
  return (
    <div className="App">
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Homescreen />} />
          <Route path="/rooms" element={<Room />} />
          <Route path="/book/:roomid" element={<Bookingsscreen />} />
          <Route path="/register" element={<Registerscreen/>} />
          <Route path="/login" element={<Loginscreen/>} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
