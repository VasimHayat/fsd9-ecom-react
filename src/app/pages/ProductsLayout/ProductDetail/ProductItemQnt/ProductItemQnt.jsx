import React, { useState } from 'react';
import './ProductItemQnt.css';

const ProductItemQnt = ({ initialQuantity, onQuantityChange }) => {
  const [quantity, setQuantity] = useState(initialQuantity || 1);

  const handleIncrement = () => {
    setQuantity(quantity + 1);
    onQuantityChange(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      onQuantityChange(quantity - 1);
    }
  };

  return (
    <div className="item-quantity">
    <button className="quantity-button" onClick={handleDecrement}>-</button>
    <span className="quantity-value">{quantity}</span>
    <button className="quantity-button" onClick={handleIncrement}>+</button>
  </div>
  );
};

export default ProductItemQnt;
