import React from 'react';
import { Link } from 'react-router-dom';
import BannerImage from '../assets/home.jpg';
import "../styles/Home.css";

function Home() {
  return (
    <div className='home' style={{ backgroundImage: `url(${BannerImage})`  }} >
        <div className='headerContainer' >
            <h1>Gusto Casero</h1>
            <p>Cafe & Bar</p>
            <Link to="/menu">
                <button>ORDER NOW</button>
            </Link>
        </div>        
    </div>
  );
}

export default Home;
