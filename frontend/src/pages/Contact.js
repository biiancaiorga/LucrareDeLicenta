import React from 'react';
import '../styles/Contact.css';

function Contact() {
  return (
    <div className="contactPage">
      <h1>Contact Us</h1>
      <div className="contactContent">
        <div className="contactInfo">
          <h2>Gusto Caser Cafe & Bar</h2>
          <p>Address: C. Cancha, 19, 04700 El Ejido, Almería, Spania</p>
          <p>Phone: +34642445059</p>
          <p>Email: gustocasero.cafebar@gmail.com</p>
          <h3>Opening Hours</h3>
          <p>Monday: 8:00 AM - 5:00 PM</p>
          <p>Tuesday - Sunday: 8:00 AM - 12:00 AM</p>
        </div>
        <div className="mapContainer">
          <iframe 
            title="Location of Gusto Casero Cafe & Bar"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3196.447443415168!2d-2.8058283!3d36.7598321!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd704300194b0cdd%3A0x555d4b73eadf5cc7!2sGusto%20Casero%20Cafe%26Bar!5e0!3m2!1sro!2sro!4v1718190356143!5m2!1sro!2sro"
            width="600"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default Contact;
