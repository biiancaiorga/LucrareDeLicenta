import React, { useState } from 'react';
import Cookies from 'js-cookie';
import '../styles/Basket.css';

function Cos({ basket = [], setBasket }) {
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleDelete = index => {
    const updatedBasket = basket.filter((_, i) => i !== index);
    setBasket(updatedBasket);
  };

  const handleQuantityChange = (index, quantity) => {
    const updatedBasket = [...basket];
    if (quantity > 0) {
      updatedBasket[index].quantity = quantity;
    } else {
      updatedBasket.splice(index, 1);
    }
    setBasket(updatedBasket);
  };

  const total = basket.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const isLoggedIn = !!Cookies.get('jwtToken');

  const handlePlaceOrder = () => {
    if (isLoggedIn) {
      setShowOrderForm(true);
    } else {
      alert('You need to be logged in to place an order.');
    }
  };

  const handleSubmitOrder = () => {
    if (!street.trim() || !number.trim() || !city.trim() || !postalCode.trim() || !phoneNumber.trim()) {
      alert('Please fill in all required fields.');
      return;
    }
    alert('Order placed successfully!');
    setShowOrderForm(false);
  };

  return (
    <div className="basketPage">
      <h2>Your Basket</h2>
      {basket.length > 0 ? (
        <ul>
          {basket.map((item, index) => (
            <li key={index}>
              <span>{item.name} - €{item.price.toFixed(2)}</span>
              <div className="quantityContainer">
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={e => handleQuantityChange(index, parseInt(e.target.value))}
                />
                <button onClick={() => handleDelete(index)}>
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No items in your basket.</p>
      )}
      <div className="total">
        <h3>Total: €{total.toFixed(2)}</h3>
        <button className="orderButton" onClick={handlePlaceOrder}>
          Place Order
        </button>
      </div>
      {showOrderForm && (
        <div className="orderForm">
          <input type="text" placeholder="City" value={city} onChange={e => setCity(e.target.value)} required />
          <input type="text" placeholder="Street" value={street} onChange={e => setStreet(e.target.value)} required />
          <input type="text" placeholder="Number" value={number} onChange={e => setNumber(e.target.value)} required />
          <input type="text" placeholder="Postal Code" value={postalCode} onChange={e => setPostalCode(e.target.value)} required />
          <input
            type="tel"
            pattern="[0-9]*"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={e => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
            required
          />
          <button onClick={handleSubmitOrder}>Confirm Order</button>
          <button onClick={() => setShowOrderForm(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
}

export default Cos;
