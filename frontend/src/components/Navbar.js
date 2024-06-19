import React, { useState, useEffect } from "react";
import { Link, useLocation } from 'react-router-dom';
import Logo from "../assets/barLogo.jpg";
import '../styles/Navbar.css';
import ReorderIcon from '@mui/icons-material/Reorder';

function Navbar() {
  const [openLinks, setOpenLinks] = useState(false);
  const location = useLocation();

  const toggleNavbar = () => {
    setOpenLinks(!openLinks);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 500) {
        setOpenLinks(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Close the navbar when the route changes
  useEffect(() => {
    setOpenLinks(false);
  }, [location]);

  return (
    <div className="navbar">
      <div className="leftSide">
        <Link to="/">
          <img src={Logo} alt="Logo" />
        </Link>
      </div>
      <div className="centerSide">
        <Link to="/"> Home </Link>
        <Link to="/menu"> Menu </Link>
        <Link to="/about"> About </Link>
        <Link to="/contact"> Contact </Link>

      </div>
      <div className="rightSide">
        <Link to="/login"> Login/Register </Link>
        <Link to="/reservation">Reservation</Link>
        <Link to="/basket"><i className="fas fa-shopping-cart"></i></Link>        
        <button onClick={toggleNavbar}>
          <ReorderIcon />
        </button>
      </div>
      <div className={openLinks ? "hiddenLinks open" : "hiddenLinks"}>
        <Link to="/"> Home </Link>
        <Link to="/menu"> Menu </Link>
        <Link to="/about"> About </Link>
        <Link to="/login"> Login/Register </Link>
        <Link to="/contact"> Contact </Link>
        <Link to="/reservation">Reservation</Link>
        <Link to="/basket"><i className="fas fa-shopping-cart"></i></Link>        
      </div>
    </div>
  );
}

export default Navbar;
