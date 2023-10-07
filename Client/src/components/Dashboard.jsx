import React, { useContext } from "react";
import { products } from "./products";
import "../style/Dashboard.css";
import "../style/index.css";
import Navbar from "./navbar";
import { CartContext } from "./CartContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const handleAddToCart = (item) => {
    addToCart(item);
  };
  const handleShopNowClick = () => {
    handleAddToCart(product);
  
  };

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <h4>₹ {product.price}</h4>
      <button className="add-to-cart" onClick={handleShopNowClick}>
        Add to Cart
      </button>
    </div>
  );
};

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Navbar />
      <h1 className="men-section">Men</h1>
      <div className="cards">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
