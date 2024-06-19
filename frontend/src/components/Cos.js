import React from 'react';
import Cookies from 'js-cookie'; // Import js-cookie to handle cookies
import '../styles/Basket.css';

function Cos({ basket = [], setBasket }) {
  const handleDelete = (index) => {
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

  const isLoggedIn = !!Cookies.get('jwtToken'); // Check if the user is logged in

  const handlePlaceOrder = () => {
    if (isLoggedIn) {
      // Placeholder for payment method integration
      alert('Proceed to payment');
    } else {
      alert('You need to be logged in to place an order.');
    }
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
                  onChange={(e) => handleQuantityChange(index, parseInt(e.target.value))}
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
    </div>
  );
}

export default Cos;
