import React, { useState } from 'react';
import '../styles/Reservation.css';

function Reservation() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [guests, setGuests] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    alert('Reservation submitted successfully!');
  };

  return (
    <div className="reservationPage">
      <h1>Make a Reservation</h1>
      <form className="reservationForm" onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label>
          Phone:
          <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />
        </label>
        <label>
          Date:
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        </label>
        <label>
          Time:
          <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
        </label>
        <label>
          Number of Guests:
          <input type="number" value={guests} onChange={(e) => setGuests(e.target.value)} min="1" required />
        </label>
        <button type="submit">Submit Reservation</button>
      </form>
    </div>
  );
}

export default Reservation;
