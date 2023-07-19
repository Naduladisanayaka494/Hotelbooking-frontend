import React from 'react';
import { Link } from 'react-router-dom';

const Landingscreen = () => {
  return (
    <div className='landing-container'>
      <div className='landing-content'>
        <h1 className='landing-title'>Nadula Rooms</h1>
        <h2 className='landing-title'>"We provide quality service to you"</h2>
        <Link to="/home" className='get-started-btn'>
          Get Started
        </Link>
      </div>
    </div>
  );
}

export default Landingscreen;
