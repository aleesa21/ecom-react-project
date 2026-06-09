import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import "../css/mainCart.css";
export default function MainCart() {
  let { cart } = useContext(CartContext);
  let count = 0;
  cart.forEach((item) => {
    count = count + item.quantity;
  });

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
                  <button className="item_count_btn">-</button>
                  <div className="c-quantity">{item.quantity}</div>
                  <button className="item_count_btn">+</button>
                </div>
                <div className="c-total-price">
                  ${item.quantity * item.price}
                </div>
                <div className="c-clear-item">x</div>
              </div>
            );
          })}
        </div>
        {/* <div className="cart_order_summary">
          <div className="order_card"></div>
        </div> */}
      </div>
    </div>
  );
}
