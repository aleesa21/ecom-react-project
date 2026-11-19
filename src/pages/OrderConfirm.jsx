import React from "react";
import { useNavigate } from "react-router"; 
import "../css/OrderConfirm.css";

export default function OrderConfirm() {
  const navigate = useNavigate(); 

  const handleContinueShopping = () => {
    navigate("/products"); 
  };

  return (
    <div className="order-confirm-page">
      <div className="order-confirm-container">
        <div className="order-confirm-icon" aria-hidden="true">
          🎉
        </div>

        {/* Main Heading */}
        <h1 className="order-confirm-title">Order Confirmed!</h1>

        {/* Order Number Box */}
        <div className="order-number-box">
          <span className="order-number-label">Order #</span>
          <span className="order-number-value">lol(will come after i learn backend hai ta)</span>
        </div>

        {/* Thank You Message */}
        <p className="order-confirm-message">
          Thank you for shopping with{" "}
          <span className="brand-name">
            M<span className="brand-a">Λ</span>RT
          </span>
          . Your order has been confirmed and will be packed with care.
          You&apos;ll receive updates shortly.
        </p>

        {/* Action Button */}
        <button
          type="button"
          className="continue-shopping-btn"
          onClick={handleContinueShopping}
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}