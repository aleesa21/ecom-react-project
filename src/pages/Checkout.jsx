import { Link, useNavigate } from "react-router";
import "../css/checkout.css";
export default function Checkout() {
  const navigate = useNavigate();
  return (
    <section className="checkout ">
      <div className="padding checkout_page">
        <div className="top-checkout">
          <Link to="/cart">
            <div>← Back to Cart</div>
          </Link>
          <h1>Checkout</h1>
        </div>
        <div className="down-checkout">
          <div className="checkout_details">


            <div className="shipping_info">

              <div className="si_heading">
                <div>Shipping Information</div>
                <span></span>
              </div>
              <div className="si_name">
                <div className="si_group">
                  <label for="checkout_first_name">First Name</label>
                  <input
                    className="si_input"
                    name="checkoout_first_name"
                    id="checkout_first_name"
                    type="text"
                    placeholder="Ram"
                  ></input>
                </div>
                <div className="si_group">
                  <label>Last Name</label>
                  <input
                    className="si_input"
                    name="checkout_last_name"
                    type="text"
                    placeholder="Kafle"
                  ></input>
                </div>
              </div>
              <div className="si_email si_group">
                <label for="checkout_email">Email</label>
                <input
                  type="email"
                  className="si_input"
                  name="checkout_email"
                  id="checout_email"
                  placeholder="Ram@gmail.com"
                ></input>
              </div>
              <div className="si_phone si_group">
                <label for="checkout_phone">Phone</label>
                <input
                  className="si_input"
                  name="checkout_phone"
                  id="checkout_phone"
                  type="phone"
                  placeholder="+977-970-2632440"
                ></input>
              </div>
              <div className="si_address si_group">
                <label for="checkout_address">Address</label>
                <input
                  type="text"
                  className="si_input"
                  name="checkout_address"
                  id="checkout_address"
                  placeholder="Bargachhi-1"
                ></input>
              </div>
              <div className="city_zip">
                <div className="si_group">
                  <label for="checkout_city">city</label>
                  <input
                    className="si_input"
                    name="checkout_city"
                    id="checkout_city"
                    type="text"
                    placeholder="Biratnagar"
                  ></input>
                </div>
                <div className="si_group">
                  <label for="checkout_zip">Zip</label>
                  <input
                    className="si_input"
                    type="text"
                    name="checkout_zip"
                    id="checkout_zip"
                    placeholder="10001"
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
                  name="chechout_card"
                  id="checkout_card"
                  inputMode="numeric"
                  maxLength={19}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9]/g, "");
                    const formatted = value.replace(/(.{4})/g, "$1 ").trim();
                    e.target.value = formatted;
                  }}
                ></input>
              </div>
               <div className="si_expiry-ccv">
                <div className="si_group">
                  <label htmlFor="checkout_expiry">Expiry</label>
                  <input name="checkout_expiry" id="checkout_expiry" className="si_input" type="text" placeholder="MM/YY"></input>
                </div>
               </div>

            </div>





          </div>




          <div className="order_summary2">
            <div className="os2_card"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
