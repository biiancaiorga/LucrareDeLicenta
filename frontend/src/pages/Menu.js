import React, { useEffect, useState } from 'react';
import { getMenuItems } from '../api';
import { Link, useNavigate } from 'react-router-dom';
import "../styles/Menu.css";
import MenuItem from '../components/MenuItem';
import Cookies from 'js-cookie';
import axios from 'axios';

function Menu({ basket, setBasket }) {
  const [menuItems, setMenuItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const items = await getMenuItems();
        console.log('Fetched Menu Items:', items); // Verify the fetched items
        setMenuItems(items);
      } catch (error) {
        console.error('Error fetching menu items', error);
      }
    };

    fetchMenuItems();
  }, []);

  const handleAddToBasket = async (id, name, price) => {
    const existingItemIndex = basket.findIndex(item => item.name === name);
    const updatedBasket = [...basket];
    
    if (existingItemIndex !== -1) {
      updatedBasket[existingItemIndex].quantity += 1;
    } else {
      updatedBasket.push({ name, price, quantity: 1 });
    }

    setBasket(updatedBasket);

    // Make request to add item to order
    try {
      const token = Cookies.get('jwtToken'); // Get JWT token from cookies

      if (!token) {
        throw new Error('JWT token not found in cookies');
      }

      console.log('JWT token:', token);

      const response = await axios.post(`https://localhost:7075/api/OrderItem?menuItemID=${id}`, {}, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('Item added to order:', response.data);
    } catch (error) {
      console.error('Error adding item to order:', error.response || error.message);
    }
  };

  const handlePlaceOrder = async () => {
    const token = Cookies.get('jwtToken'); // Get JWT token from cookies

    if (!token) {
      alert('You need to be logged in to place an order.');
      return;
    }

    try {
      console.log('JWT token:', token);

      const response = await axios.get(
        `https://localhost:7075/api/OrderItem/user`,
        { items: basket },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      console.log('Item added to order:', response.data);
    } catch (error) {
      console.error('Error adding item to order:', error.response || error.message);
    }
  };

  return (
    <div className="menu">
      <h1 className="menuTitle">Our Menu</h1>
      <div className="menuList">
        {menuItems.map((menuItem, key) => (
          <MenuItem
            key={key}
            id={menuItem.id} // Ensure the id is passed to the MenuItem component
            image={`data:image/jpeg;base64,${menuItem.image}`} // Use Base64 image
            name={menuItem.name}
            price={menuItem.price}
            onAddToBasket={() => handleAddToBasket(menuItem.id, menuItem.name, menuItem.price)} // Pass id to the handler
          />
        ))}
      </div>
      <div className="selectedItems">
        <h2>Selected Items</h2>
        {basket.length > 0 ? (
          <ul>
            {basket.map((item, index) => (
              <li key={index}>
                {item.name} - €{item.price.toFixed(2)} (x{item.quantity})
              </li>
            ))}
          </ul>
        ) : (
          <p>No items selected.</p>
        )}
        <Link to="/basket">
          <button className="basketButton"><i className="fas fa-shopping-cart"></i> Your Cart</button>
        </Link>
      </div>
    </div>
  );
}

export default Menu;
