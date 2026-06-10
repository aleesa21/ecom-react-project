import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import "../css/mainCart.css";
export default function MainCart() {
  let { cart, reduceQnty, increaseQnty, removeItem,clearCart,count } = useContext(CartContext);
  
  let ttl_price = 0;
  cart.forEach((item) => {
    ttl_price = ttl_price + item.quantity * item.price;
  });
  let taxrate = 8;
  let taxamt = ttl_price * (taxrate / 100);
  return (
    <div className="full_cart_page">
      <div className="top_fcp">
        <h1>Shopping cart</h1>
        <p>{count} Items in ur cart</p>
      </div>
      <div className="down_fcp">
        <div className="cart_item_list">
          {cart.map((item) => {
            return (
              <div key={item.id} className="c-item">
                <div className="c-img">
                  <img src={item.image} alt={item.title}></img>
                </div>

                <div className="c-info">
                  <div className="c-info-category">{item.category}</div>
                  <div className="c-info-title">{item.title}</div>
                  <div className="c-info-price">${item.price} each</div>
                </div>

                <div className="c-counts">
                  <button
                    className="item_count_btn"
                    onClick={() => {
                      reduceQnty(item);
                    }}
                  >
                    −
                  </button>
                  <div className="c-quantity">{item.quantity}</div>
                  <button
                    className="item_count_btn"
                    onClick={() => {
                      increaseQnty(item);
                    }}
                  >
                    +
                  </button>
                </div>
                <div className="c-total-price">
                  ${(item.quantity * item.price).toFixed(2)}
                </div>
                <button
                  className="c-clear-item"
                  onClick={() => {
                    removeItem(item);
                  }}
                >
                  ✕
                </button>
              </div>
            );
          })}
        </div>
        <div className="cart_order_summary">
          <div className="order_card">
            <div className="order_smry">Order Summary</div>
            <div className="oc_row">
              <div>{count} items</div>
              <div> ${ttl_price.toFixed(2)}</div>
            </div>
            <div className="oc_row shipping">
              <div>shipping</div>
              <span>Free</span>
            </div>
            <div className="oc_row">
              <div>Tax ({taxrate}%)</div>
              <div>${taxamt.toFixed(2)}</div>
            </div>
            <div className="">
              <hr></hr>
            </div>
            <div className="oc_row total">
              <div>Total</div>
              <div>${(ttl_price + taxamt).toFixed(2)}</div>
            </div>
            <div className="promo-row">
              <input
                type="text"
                className="promo-input"
                placeholder="Promo code"
              ></input>
              <button className="apply_btn">Apply</button>
            </div>
            <div>
              <button className="checkout_btn">Proceed to checkout</button>
            </div>
            <div className="clear_cart_btn" onClick={clearCart}>clear cart</div>
            <div className="">
              <hr></hr>
            </div>
            <div className="bottom_oc">
              <span>🔒 Secure </span>
              <span>↩ 30-day returns</span>
              <span>🚚 Free shipping</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
