import { React, useContext } from "react";
import { CartContext } from "./CartContext";
import Navbar from "./navbar";
import "../style/index.css";
import CartItem from "./CartItem";
import { loadStripe } from "@stripe/stripe-js";
import { useNavigate } from "react-router-dom";
import alert from "sweetalert";

const CartPage = () => {
  const navigate = useNavigate();
  const { cart } = useContext(CartContext);

  const total = (cart || []).reduce((sum, item) => sum + item.price, 0);

  const handleShopMoreClick = () => {
    navigate("/dashboard");
  };

  const makePayment = async () => {
    const stripe = await loadStripe(
      "pk_test_51NxvxMSJ3X2UH5oAoa23m9cFKCFd2nP5JpcKU5Iew523RUx2dL0C9fvazSmMmrOeNl3LSEJoyvTZrXnuZBWRxHbR00jrJm9fTG"
    );
    const body = {
      products: cart,
    };
    console.log(body);
    const headers = {
      "Content-Type": "application/json",
    };
    const response = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    });
    const session = await response.json();
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });
    if (result.error) {
      console.log(result.error.message);
      alert("Opps !", "Payment Failed", "error");
    }
  };

  return (
    <div className="cart-page">
      <Navbar />
      <h1>Shopping Cart</h1>

      <div>
        {(cart || []).map((item) => (
          <CartItem item={item} />
        ))}
      </div>

      <div className="cart-total">
        <p>Total: ₹ {total}</p>

        <button
          onClick={handleShopMoreClick}
          style={{
            borderRadius: "0",
            borderStyle: "none",
          }}
        >
          Shop More
        </button>

        <button
          className="checkout"
          style={{
            borderRadius: "0",
            borderStyle: "none",
            marginLeft: "20px",
          }}
          onClick={makePayment}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};
export default CartPage;
