import React from 'react';
import '../styles/Footer.css';
import logo2 from '../assets/cafeLogo.png';

function Footer() {
  return (
    <div className="footer">
      <div className="leftSection">
        <div className="contactInfo">
          <h3>Visit Us!</h3>
          <p>Address: C. Cancha, 19, 04700 El Ejido, Almería, Spania</p>
          <p>Phone: +34642445059</p>
          <p>Email: gustocasero.cafebar@gmail.com</p>
        </div>
      </div>
      
      <div className="centerSection">
        <img src={logo2} alt="Logo" className="footerLogo" />
      </div>
      <div className="rightSection">
        <div className="socialMedia">
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook"></i>
          </a>
        </div>
        <p>&copy; 2024 gustocasero.com</p>
      </div>
    </div>
  );
}

export default Footer;
