import React from 'react';

function MenuItem({ image, name, price, onAddToBasket }) {
  return (
    <div className="menuItem">
       <img src={image} alt="item"></img>
      <h1> {name} </h1>
      <p> €{price.toFixed(2)} </p>
      <button className="orderButton" onClick={() => onAddToBasket(name, price)}>Order</button>
    </div>
  );
}

export default MenuItem;
