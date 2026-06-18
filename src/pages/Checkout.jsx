import { Link, useNavigate } from "react-router";
import "../css/checkout.css";
import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
export default function Checkout() {
  const { cart } = useContext(CartContext);
  const [popup, setPopup] = useState({ show: false, msg: "" });
  const navigate = useNavigate();

  const [shipping_info, setShipping_info] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zip: "",
  });
  const [payment_details, setPayment_details] = useState({
    cardno: "",
    expiry: "",
    ccv: "",
    cardname: "",
  });

  let subtotal = 0;
  cart.map((item) => {
    subtotal += item.quantity * item.price;
  });
  let taxrate = 8;
  let taxamt = (subtotal * taxrate) / 100;

  function handleshipping(e) {
    const { name, value } = e.target;
    setShipping_info((prev) => ({ ...prev, [name]: value }));
  }
  function handlepayment(e) {
    const { name } = e.target;
    let { value } = e.target;

    if (name === "cardno") {
      value = value.replace(/[^0-9]/g, "");
      value = value.replace(/(.{4})/g, "$1 ").trim();
      e.target.value = value;
    } else if (name === "expiry") {
      value = value.replace(/[^0-9]/g, "");
      value = value.replace(/(.{2})/, "$1/");
      e.target.value = value;
    } else if (name === "ccv") {
      value = value.replace(/[^0-9]/g, "");
      e.target.value = value;
    }

    setPayment_details((prev) => ({ ...prev, [name]: value }));
  }

  function handlepopup(msg) {
    setPopup({ show: true, msg });
    setTimeout(() => setPopup({ show: false, msg: "" }), 3500);
  }

  function validate(e) {
    e.preventDefault();

    const emptyshipping = Object.values(shipping_info).some((v) => !v.trim());
    const emptypayment = Object.values(payment_details).some((v) => !v.trim());

    if (emptypayment || emptyshipping) {
      handlepopup("please fill the required values");
    } else {
      console.log(shipping_info);
      console.log(payment_details);
    }
  }

  return (
    <section className="checkout ">
      <div className="padding checkout_page">
        <div className="top-checkout">
          <Link to="/cart">
            <div>← Back to Cart</div>
          </Link>
          <h1>Checkout</h1>
        </div>
        <form onSubmit={validate}>
          <div className="down-checkout">
            <div className="checkout_details">
              <div className="shipping_info">
                <div className="si_heading">
                  <div>Shipping Information</div>
                  <span></span>
                </div>
                <div className="si_name">
                  <div className="si_group">
                    <label htmlFor="checkout_first_name">First Name</label>
                    <input
                      className="si_input"
                      name="firstname"
                      id="checkout_first_name"
                      type="text"
                      placeholder="Ram"
                      onChange={handleshipping}
                    ></input>
                  </div>
                  <div className="si_group">
                    <label>Last Name</label>
                    <input
                      className="si_input"
                      name="lastname"
                      type="text"
                      placeholder="Kafle"
                      onChange={handleshipping}
                    ></input>
                  </div>
                </div>
                <div className="si_email si_group">
                  <label htmlFor="checkout_email">Email</label>
                  <input
                    type="email"
                    className="si_input"
                    name="email"
                    id="checout_email"
                    placeholder="Ram@gmail.com"
                    onChange={handleshipping}
                  ></input>
                </div>
                <div className="si_phone si_group">
                  <label htmlFor="checkout_phone">Phone</label>
                  <input
                    className="si_input"
                    name="phone"
                    id="checkout_phone"
                    type="phone"
                    placeholder="+977-970-2632440"
                    onChange={handleshipping}
                  ></input>
                </div>
                <div className="si_address si_group">
                  <label htmlFor="checkout_address">Address</label>
                  <input
                    type="text"
                    className="si_input"
                    name="address"
                    id="checkout_address"
                    placeholder="Bargachhi-1"
                    onChange={handleshipping}
                  ></input>
                </div>
                <div className="city_zip">
                  <div className="si_group">
                    <label htmlFor="checkout_city">city</label>
                    <input
                      className="si_input"
                      name="city"
                      id="checkout_city"
                      type="text"
                      placeholder="Biratnagar"
                      onChange={handleshipping}
                    ></input>
                  </div>
                  <div className="si_group">
                    <label htmlFor="checkout_zip">Zip</label>
                    <input
                      className="si_input"
                      type="text"
                      name="zip"
                      id="checkout_zip"
                      placeholder="10001"
                      onChange={handleshipping}
                    />
                  </div>
                </div>
              </div>

              <div className="hr"></div>

              <div className="payment_details">
                <div className="si_heading">
                  <div>Payment Details</div>
                  <span></span>
                </div>
                <div className="si_card_number si_group">
                  <label htmlFor="checkout_card">Card Number</label>
                  <input
                    className="si_input"
                    type="text"
                    placeholder="1234 5678 0123 4567"
                    name="cardno"
                    id="checkout_card"
                    inputMode="numeric"
                    maxLength={19}
                    onChange={handlepayment}
                  ></input>
                </div>
                <div className="si_expiry-ccv">
                  <div className="si_group">
                    <label htmlFor="checkout_expiry">Expiry</label>
                    <input
                      name="expiry"
                      id="checkout_expiry"
                      className="si_input"
                      type="text"
                      placeholder="MM/YY"
                      maxLength={5}
                      onChange={handlepayment}
                    ></input>
                  </div>
                  <div className="si_group">
                    <label htmlFor="checkout_ccv">ccv</label>
                    <input
                      className="si_input"
                      type="text"
                      placeholder="..."
                      name="ccv"
                      id="checkout_ccv"
                      maxLength={3}
                      onChange={handlepayment}
                    ></input>
                  </div>
                </div>
                <div className="si_group">
                  <label htmlFor="checkout_card_name">Name on card</label>
                  <input
                    className="si_input"
                    id="checkout_card_name"
                    name="cardname"
                    placeholder="Ram Kafle"
                    onChange={handlepayment}
                  ></input>
                </div>
              </div>
            </div>

            <div className="order_summary2">
              <div className="os2_card">
                <div className="os2_card_title">Order Summary</div>
                <div className="checkout_os_list">
                  {cart.map((item) => {
                    return (
                      <div key={item.id} className="checkout_item">
                        <div>
                          <img
                            className="chechout_item_img"
                            src={item.image}
                            alt={item.title}
                          ></img>
                        </div>
                        <div className="ck_os_item">
                          {" "}
                          {item.title}...x{item.quantity}
                        </div>
                        <div className="os2_price">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="os2_prices">
                  <div className="os2_prices_item">
                    <div>subtotal</div>
                    <div>${subtotal.toFixed(2)}</div>
                  </div>
                  <div className="os2_prices_item">
                    <div>Shipping</div>
                    <span className="green-free-text">Free</span>
                  </div>
                  <div className="os2_prices_item">
                    <div>Tax({taxrate}%)</div>
                    <div>${taxamt.toFixed(2)}</div>
                  </div>
                </div>
                <div className="os2_prices_total">
                  <div>Total</div>
                  <div>${(subtotal + taxamt).toFixed(2)}</div>
                </div>
                <button type="submit" className="place_order_btn">
                  Place Order 🎉
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
      {popup.show && (
        <div className="validation_popup">
          <span>⚠</span> {popup.msg}
        </div>
      )}
    </section>
  );
}
