import React from 'react';
import '../style/cartItem.css';
const CartItem = ({ item }) => {

  return (
    <div className="cart-item">
      <img src={item.image} alt={item.name}/>
      <div>
        <h3>{item.name}</h3>
        <p>₹ {item.price}</p>
      </div>
    </div>
  );
};

export default CartItem;
